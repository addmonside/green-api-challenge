import { useQuery } from '@tanstack/react-query'
import { useCredentials } from '@/shared/model'
import { getChatHistory } from './get-chat-history'
import { type ChatMessage, mergeMessages, toMessagesFromHistory } from './message-converter'
import { messagesQueryKey } from './message-list-cache'

const historyCount = 100

export const useMessageList = (chatId: string) => {
  const { credentials } = useCredentials()
  return useQuery({
    queryKey: messagesQueryKey(chatId),
    queryFn: async ({ signal }) => {
      if (!credentials) throw new Error('No credentials')
      const history = await getChatHistory(credentials, { chatId, count: historyCount }, signal)
      return toMessagesFromHistory(history)
    },
    enabled: Boolean(credentials),
    staleTime: Infinity,
    structuralSharing: (current, next) =>
      mergeMessages((current as ChatMessage[] | undefined) ?? [], next as ChatMessage[]),
  })
}
