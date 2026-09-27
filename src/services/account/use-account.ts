import { apiClientConfig } from '@/shared/api'
import { useGetAccountSettings } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'

export const useAccount = () => {
  const { credentials } = useCredentials()

  return useGetAccountSettings(
    {
      path: {
        idInstance: credentials?.idInstance || '',
        apiTokenInstance: credentials?.apiTokenInstance || '',
      },
    },
    { client: apiClientConfig, query: { staleTime: Infinity, enabled: !!credentials } },
  )
}
