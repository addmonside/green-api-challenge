import { useQuery } from '@tanstack/react-query'
import { useCredentials } from '@/shared/model'
import { type ChatMessage, mergeMessages, toMessagesFromHistory } from './chat-message'
import { getChatHistory } from './get-chat-history'
import { messagesQueryKey } from './messages-cache'

const historyCount = 100

export const useMessages = (chatId: string) => {
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
