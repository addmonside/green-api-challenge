import type { QueryClient } from '@tanstack/react-query'
import type { ChatMessage } from './message-converter'
import { mergeMessages } from './message-converter'

export const messagesQueryKey = (chatId: string) => ['messages', chatId] as const

export const appendMessage = (queryClient: QueryClient, chatId: string, message: ChatMessage) => {
  queryClient.setQueryData<ChatMessage[]>(messagesQueryKey(chatId), (current) =>
    mergeMessages(current ?? [], [message]),
  )
}
