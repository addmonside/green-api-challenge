import { MessageGroup } from '@/shared/ui/kit/message'
import type { ChatMessage } from '../model/message-converter'
import { MessageListItem } from './message-list-item'

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <MessageGroup>
      {messages.map((message) => (
        <MessageListItem
          key={message.id}
          content={message.text}
          authorName={message.authorName}
          isOwn={message.direction === 'outgoing'}
        />
      ))}
    </MessageGroup>
  )
}
