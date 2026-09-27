import { apiClientConfig } from '@/shared/api'
import { deleteNotification as deleteNotificationRequest } from '@/shared/api/generated/clients/deleteNotification'
import { receiveNotification as receiveNotificationRequest } from '@/shared/api/generated/clients/receiveNotification'
import type { DeleteNotificationResponse } from '@/shared/api/generated/types/DeleteNotification'
import type { ReceiveNotificationResponse } from '@/shared/api/generated/types/ReceiveNotification'
import { appConfig, type Credentials } from '@/shared/model'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * сервис long-poll уведомлений.
 */
export class MessageNotificationService {
  private readonly credentials: Credentials
  private readonly controller: AbortController = new AbortController()

  constructor(credentials: Credentials) {
    this.credentials = credentials
  }

  public abort(): void {
    this.controller.abort()
  }

  public async poll(
    onNotification: (notification: ReceiveNotificationResponse) => void | Promise<void>,
    onError: (error: unknown) => boolean,
  ): Promise<void> {
    while (!this.controller.signal.aborted) {
      try {
        const notification = await this.receive()
        if (!notification) continue
        await onNotification(notification)
        await this.delete(notification.receiptId)
      } catch (error) {
        if (this.controller.signal.aborted) return
        if (onError(error)) return
        await wait(appConfig.messagePullingRetryDelay)
      }
    }
  }

  private async receive(): Promise<ReceiveNotificationResponse | undefined> {
    return receiveNotificationRequest({
      ...apiClientConfig,
      path: this.credentials,
      query: { receiveTimeout: appConfig.receiveTimeout },
      signal: this.controller.signal,
      // ReceiveNotification отдаёт пустое тело по таймауту long-poll (200 без body).
      // Транспорт превращает это в undefined и валидация объекта падает — считаем это отсутствием уведомления.
      onValidationError: (error, { value }) => {
        if (value === undefined) return { value: undefined }
        throw error
      },
    }).unwrap()
  }

  private async delete(receiptId: number): Promise<DeleteNotificationResponse> {
    return deleteNotificationRequest({
      ...apiClientConfig,
      path: { ...this.credentials, receiptId: String(receiptId) },
      signal: this.controller.signal,
    }).unwrap()
  }
}
