import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { isUnauthorizedError } from '@/shared/api'
import { appConfig, useCredentials } from '@/shared/model'

const createQueryClient = (onUnauthorized: () => void) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: appConfig.query.staleTime,
        refetchOnWindowFocus: appConfig.query.refetchOnWindowFocus,
        retry: false,
      },
    },
    queryCache: new QueryCache({ onError: handleError(onUnauthorized) }),
    mutationCache: new MutationCache({ onError: handleError(onUnauthorized) }),
  })

function handleError(onUnauthorized: () => void) {
  return (error: unknown) => {
    if (isUnauthorizedError(error)) onUnauthorized()
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { signOut } = useCredentials()
  const handleUnauthorized = useCallback(() => signOut(), [signOut])
  const [queryClient] = useState(() => createQueryClient(handleUnauthorized))

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
