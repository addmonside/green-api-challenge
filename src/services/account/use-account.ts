import { apiClientConfig } from '@/shared/api'
import { useGetAccountSettings } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'

export const useAccount = () => {
  const { credentials, isEmpty } = useCredentials()

  return useGetAccountSettings(
    {
      path: credentials,
    },
    { client: apiClientConfig, query: { staleTime: Infinity, enabled: !isEmpty } },
  )
}
