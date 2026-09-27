import { apiClientConfig } from '@/shared/api'
import { useGetContactInfo } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'

export const useContactInfo = (chatId: string) => {
  const { credentials } = useCredentials()
  return useGetContactInfo(
    {
      path: {
        idInstance: credentials?.idInstance ?? '',
        apiTokenInstance: credentials?.apiTokenInstance ?? '',
      },
      body: { chatId },
    },
    {
      client: apiClientConfig,
      query: { enabled: Boolean(credentials) },
    },
  )
}
