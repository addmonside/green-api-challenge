import { apiClientConfig } from '@/shared/api'
import { useGetContacts } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'

export const useContacts = () => {
  const { credentials } = useCredentials()
  return useGetContacts(
    {
      path: {
        idInstance: credentials?.idInstance ?? '',
        apiTokenInstance: credentials?.apiTokenInstance ?? '',
      },
    },
    {
      client: apiClientConfig,
      query: { enabled: Boolean(credentials) },
    },
  )
}
