/** GREEN-API принимает `receiveTimeout` только в диапазоне 5..60 секунд. */
export const receiveTimeoutRange = { min: 5, max: 60 } as const

const readApiUrl = () => {
  const url = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

  if (!url)
    throw new Error(
      'Не задан VITE_API_URL. Скопируйте .env.example в .env и укажите адрес своего инстанса GREEN-API.',
    )

  return url
}

const readReceiveTimeout = () => {
  const raw = Number(import.meta.env.VITE_RECEIVE_TIMEOUT)
  if (!Number.isFinite(raw) || raw <= 0) return receiveTimeoutRange.min

  return Math.min(Math.max(Math.round(raw), receiveTimeoutRange.min), receiveTimeoutRange.max)
}

export const appConfig = {
  apiUrl: readApiUrl(),
  receiveTimeout: readReceiveTimeout(),
  devtoolsEnabled: import.meta.env.VITE_DEVTOOLS_ENABLED === 'true',
  query: {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  },
  messagePullingRetryDelay: 3000,
  credentialsStorageKey: 'green-api-credentials',
} as const
