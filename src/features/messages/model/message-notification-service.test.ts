import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReceiveNotificationResponse } from '@/shared/api/generated/types/ReceiveNotification'
import type { Credentials } from '@/shared/model'

const receiveNotification = vi.hoisted(() => vi.fn())
const deleteNotification = vi.hoisted(() => vi.fn())

vi.mock('@/shared/api/generated/clients/receiveNotification', () => ({
  receiveNotification,
}))
vi.mock('@/shared/api/generated/clients/deleteNotification', () => ({
  deleteNotification,
}))

const { MessageNotificationService } = await import('./message-notification-service')

const credentials: Credentials = {
  idInstance: '410011747511',
  apiTokenInstance: 'd75b3a66374942c5b3c019c698abc2067e151558acbd412345',
}

const notification = (receiptId: number): ReceiveNotificationResponse =>
  ({
    receiptId,
    body: { typeWebhook: 'incomingMessageReceived' },
  }) as ReceiveNotificationResponse

/** Следующий вызов receiveNotification отдаёт `value`. */
const receiveResolves = (value: ReceiveNotificationResponse | undefined) =>
  receiveNotification.mockReturnValueOnce({ unwrap: () => Promise.resolve(value) })

const receiveRejects = (error: unknown) =>
  receiveNotification.mockReturnValueOnce({ unwrap: () => Promise.reject(error) })

const deleteResolves = () =>
  deleteNotification.mockReturnValue({ unwrap: () => Promise.resolve({ result: true }) })

describe('MessageNotificationService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    deleteResolves()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('не опрашивает инстанс, если уже прерван', async () => {
    const service = new MessageNotificationService(credentials)
    service.abort()

    await service.poll(
      vi.fn(),
      vi.fn(() => true),
    )

    expect(receiveNotification).not.toHaveBeenCalled()
  })

  it('передаёт уведомление подписчику и удаляет его из очереди', async () => {
    const service = new MessageNotificationService(credentials)
    const onNotification = vi.fn(() => service.abort())
    receiveResolves(notification(42))

    await service.poll(
      onNotification,
      vi.fn(() => true),
    )

    expect(onNotification).toHaveBeenCalledExactlyOnceWith(notification(42))
    expect(deleteNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        path: { ...credentials, receiptId: '42' },
      }),
    )
  })

  it('продолжает опрос после пустого ответа long-poll', async () => {
    const service = new MessageNotificationService(credentials)
    const onNotification = vi.fn(() => service.abort())
    // Пустое тело на таймауте превращается в undefined — уведомления нет.
    receiveResolves(undefined)
    receiveResolves(notification(7))

    await service.poll(
      onNotification,
      vi.fn(() => true),
    )

    expect(receiveNotification).toHaveBeenCalledTimes(2)
    expect(onNotification).toHaveBeenCalledExactlyOnceWith(notification(7))
  })

  it('останавливает опрос, если обработчик ошибки вернул true', async () => {
    const service = new MessageNotificationService(credentials)
    const onError = vi.fn(() => true)
    const error = new Error('401')
    receiveRejects(error)

    await service.poll(vi.fn(), onError)

    expect(onError).toHaveBeenCalledExactlyOnceWith(error)
    expect(receiveNotification).toHaveBeenCalledTimes(1)
  })

  it('не повторяет запрос, если опрос прерван во время ошибки', async () => {
    const service = new MessageNotificationService(credentials)
    receiveRejects(new Error('aborted'))

    const polling = service.poll(
      vi.fn(),
      vi.fn(() => false),
    )
    service.abort()
    await polling

    expect(receiveNotification).toHaveBeenCalledTimes(1)
  })

  it('повторяет запрос после ошибки через messagePullingRetryDelay', async () => {
    vi.useFakeTimers()
    const service = new MessageNotificationService(credentials)
    const onNotification = vi.fn(() => service.abort())
    receiveRejects(new Error('network'))
    receiveResolves(notification(1))

    const polling = service.poll(
      onNotification,
      vi.fn(() => false),
    )
    await vi.advanceTimersByTimeAsync(3000)
    await polling

    expect(receiveNotification).toHaveBeenCalledTimes(2)
    expect(onNotification).toHaveBeenCalledExactlyOnceWith(notification(1))
  })

  describe('onValidationError', () => {
    const callValidationError = async (value: unknown) => {
      const service = new MessageNotificationService(credentials)
      receiveResolves(notification(1))
      const polling = service.poll(
        vi.fn(() => service.abort()),
        vi.fn(() => true),
      )
      await polling

      const { onValidationError } = receiveNotification.mock.calls[0][0]
      return onValidationError(new Error('validation failed'), { value })
    }

    it('считает пустое тело таймаута отсутствием уведомления', async () => {
      await expect(callValidationError(undefined)).resolves.toEqual({ value: undefined })
    })

    it('пробрасывает ошибку валидации, если тело неожиданное', async () => {
      await expect(callValidationError({ unexpected: true })).rejects.toThrow('validation failed')
    })
  })

  describe('параметры запроса', () => {
    it('берёт таймаут long-poll из конфигурации и общий клиент', async () => {
      const service = new MessageNotificationService(credentials)
      receiveResolves(notification(1))

      await service.poll(
        vi.fn(() => service.abort()),
        vi.fn(() => true),
      )

      expect(receiveNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          path: credentials,
          query: { receiveTimeout: expect.any(Number) },
        }),
      )
      expect(receiveNotification.mock.calls[0][0].query.receiveTimeout).toBeGreaterThanOrEqual(5)
      expect(receiveNotification.mock.calls[0][0].query.receiveTimeout).toBeLessThanOrEqual(60)
    })
  })
})
