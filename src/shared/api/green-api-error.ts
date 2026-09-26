type HttpError = { status: number; data?: unknown }

const asHttpError = (error: unknown): HttpError | null => {
  if (typeof error !== 'object' || error === null) return null
  const { status } = error as { status?: unknown }
  return typeof status === 'number' ? (error as HttpError) : null
}

export const isUnauthorizedError = (error: unknown) => asHttpError(error)?.status === 401

export const getErrorMessage = (error: unknown) => {
  const { data } = asHttpError(error) ?? {}
  if (typeof data === 'object' && data !== null) {
    const { message } = data as { message?: unknown }
    if (typeof message === 'string' && message !== '') return message
  }
  if (error instanceof Error && error.message !== '') return error.message
  return 'Неизвестная ошибка'
}
