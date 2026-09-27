import { apiClientConfig } from '@/shared/api'
import { useGetContacts } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'

export const useContacts = () => {
  const { credentials, isEmpty } = useCredentials()
  return useGetContacts(
    {
      path: credentials,
    },
    {
      client: apiClientConfig,
      query: { enabled: !isEmpty },
    },
  )
}
