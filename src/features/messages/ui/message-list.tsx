import { MessageGroup } from '@/shared/ui/kit/message'
import type { ChatMessage } from '../model/message-converter'
import { MessageListItem } from './message-list-item'

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <MessageGroup>
      {messages.map((message, index) => (
        <MessageListItem
          key={message.id}
          content={message.text}
          isOwn={message.direction === 'outgoing'}
          timestamp={message.timestamp}
          tailed={messages[index + 1]?.direction !== message.direction}
        />
      ))}
    </MessageGroup>
  )
}
