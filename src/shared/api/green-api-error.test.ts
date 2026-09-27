import { describe, expect, it } from 'vitest'
import { getErrorMessage, isUnauthorizedError } from './green-api-error'

const httpError = (status: number, data?: unknown) => ({ status, data })

describe('getErrorMessage', () => {
  it('возвращает сообщение сервера, если оно есть', () => {
    expect(getErrorMessage(httpError(400, { message: 'Instance is not authorized' }))).toBe(
      'Instance is not authorized',
    )
    expect(getErrorMessage(httpError(401, { message: 'Неверный токен' }))).toBe('Неверный токен')
  })

  it('предпочитает reason полю message (формат ошибок GREEN-API)', () => {
    expect(
      getErrorMessage(
        httpError(469, { status: false, reason: 'User get contact info limit reached' }),
      ),
    ).toBe('User get contact info limit reached')
    expect(getErrorMessage(httpError(400, { reason: 'Wrong token', message: 'ignored' }))).toBe(
      'Wrong token',
    )
  })

  it('подставляет текст для известных статусов без сообщения сервера', () => {
    expect(getErrorMessage(httpError(401))).toBe('Требуется авторизация')
    expect(getErrorMessage(httpError(403))).toBe('Доступ запрещён')
    expect(getErrorMessage(httpError(404))).toBe('Не найдено')
    expect(getErrorMessage(httpError(429))).toBe('Слишком много запросов, попробуйте позже')
  })

  it('человечизирует ошибки сервера', () => {
    expect(getErrorMessage(httpError(500))).toBe('Ошибка на стороне сервера, попробуйте позже')
    expect(getErrorMessage(httpError(503))).toBe('Ошибка на стороне сервера, попробуйте позже')
    expect(getErrorMessage(httpError(418))).toBe('Не удалось выполнить запрос')
  })

  it('человечизирует сетевую ошибку', () => {
    expect(getErrorMessage(new TypeError('Failed to fetch'))).toBe(
      'Сервер недоступен. Проверьте подключение к интернету',
    )
  })

  it('человечизирует прерывание запроса', () => {
    const abortError = new Error('The operation was aborted')
    abortError.name = 'AbortError'
    expect(getErrorMessage(abortError)).toBe('Превышено время ожидания ответа сервера')
  })

  it('возвращает общий текст для неизвестной ошибки', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('Что-то пошло не так')
    expect(getErrorMessage(undefined)).toBe('Что-то пошло не так')
    expect(getErrorMessage(null)).toBe('Что-то пошло не так')
  })

  it('не путает ошибку валидации тела ответа с HTTP-ошибкой', () => {
    // ParseError из @kubb приходит без status: у него есть только имя и issues.
    const parseError = Object.assign(new Error('Validation failed'), {
      name: 'ParseError',
      issues: [{ message: 'Invalid input' }],
    })

    expect(getErrorMessage(parseError)).toBe('Что-то пошло не так')
    expect(isUnauthorizedError(parseError)).toBe(false)
  })
})

describe('isUnauthorizedError', () => {
  it('распознаёт 401', () => {
    expect(isUnauthorizedError(httpError(401))).toBe(true)
    expect(isUnauthorizedError(httpError(403))).toBe(false)
    expect(isUnauthorizedError(new TypeError('Failed to fetch'))).toBe(false)
  })

  it('распознаёт 401 с телом формата GREEN-API', () => {
    expect(isUnauthorizedError(httpError(401, { status: false, reason: 'Unauthorized' }))).toBe(
      true,
    )
  })
})
