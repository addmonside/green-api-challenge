export const appConfig = {
  apiUrl: import.meta.env.VITE_API_URL.replace(/\/+$/, ''),
  mode: import.meta.env.VITE_ENV || 'development',
  receiveTimeout: Number(import.meta.env.VITE_RECEIVE_TIMEOUT),
  devtoolsEnabled: import.meta.env.VITE_DEVTOOLS_ENABLED === 'true',
  query: {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  },
} as const
