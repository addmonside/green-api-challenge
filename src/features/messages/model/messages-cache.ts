import type { QueryClient } from '@tanstack/react-query'
import type { ChatMessage } from './chat-message'
import { mergeMessages } from './chat-message'

export const messagesQueryKey = (chatId: string) => ['messages', chatId] as const

export const appendMessage = (queryClient: QueryClient, chatId: string, message: ChatMessage) => {
  queryClient.setQueryData<ChatMessage[]>(messagesQueryKey(chatId), (current) =>
    mergeMessages(current ?? [], [message]),
  )
}
