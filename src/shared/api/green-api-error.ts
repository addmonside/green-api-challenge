type HttpError = { status: number; data?: unknown }

const asHttpError = (error: unknown): HttpError | null => {
  if (typeof error !== 'object' || error === null) return null
  const { status } = error as { status?: unknown }
  return typeof status === 'number' ? (error as HttpError) : null
}

const getServerMessage = (error: unknown) => {
  const { data } = asHttpError(error) ?? {}
  if (typeof data === 'object' && data !== null) {
    const { message } = data as { message?: unknown }
    if (typeof message === 'string' && message !== '') return message
  }
  return undefined
}

const statusMessages: Record<number, string> = {
  401: 'Требуется авторизация',
  403: 'Доступ запрещён',
  404: 'Не найдено',
  429: 'Слишком много запросов, попробуйте позже',
}

const getStatusMessage = (status: number) => {
  if (statusMessages[status]) return statusMessages[status]
  if (status >= 500) return 'Ошибка на стороне сервера, попробуйте позже'
  return 'Не удалось выполнить запрос'
}

const isAbortError = (error: unknown) =>
  typeof error === 'object' && error !== null && (error as { name?: unknown }).name === 'AbortError'

export const isUnauthorizedError = (error: unknown) => asHttpError(error)?.status === 401

export const getErrorMessage = (error: unknown) => {
  const serverMessage = getServerMessage(error)
  if (serverMessage) return serverMessage

  const httpError = asHttpError(error)
  if (httpError) return getStatusMessage(httpError.status)

  if (isAbortError(error)) return 'Превышено время ожидания ответа сервера'
  if (error instanceof TypeError) return 'Сервер недоступен. Проверьте подключение к интернету'

  return 'Что-то пошло не так'
}
