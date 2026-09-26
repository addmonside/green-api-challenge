import { MessageGroup } from '@/shared/ui/kit/message'
import { ChatMessageListItem } from './chat-message-list-item'

export function ChatMessageList() {
  return (
    <MessageGroup>
      {messages.map((message) => (
        <ChatMessageListItem
          key={message.id}
          content={message.content}
          isOwn={message.role === 'user'}
        />
      ))}
    </MessageGroup>
  )
}

const messages = Array.from({ length: 50 }, (_, index) => ({
  id: String(index + 1),
  role: index % 2 === 0 ? ('user' as const) : ('assistant' as const),
  content: `messagecontent ${index + 1}`,
}))
