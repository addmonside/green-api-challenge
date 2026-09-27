import { apiClientConfig } from '@/shared/api'
import { useGetContactInfo } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'

export const useContactInfo = (chatId: string) => {
  const { credentials, isEmpty } = useCredentials()
  return useGetContactInfo(
    {
      path: credentials,
      body: { chatId },
    },
    {
      client: apiClientConfig,
      query: { enabled: !isEmpty },
    },
  )
}
