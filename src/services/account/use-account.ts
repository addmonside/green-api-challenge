import { apiClientConfig } from '@/shared/api'
import { useGetAccountSettings } from '@/shared/api/generated/hooks'
import type { Credentials } from '@/shared/model'

export const useAccount = (credentials: Credentials) =>
  useGetAccountSettings(
    {
      path: {
        idInstance: credentials.idInstance,
        apiTokenInstance: credentials.apiTokenInstance,
      },
    },
    { client: apiClientConfig, query: { staleTime: Infinity } },
  )
