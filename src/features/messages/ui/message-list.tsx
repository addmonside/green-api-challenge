import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/kit/empty'
import { MessageGroup } from '@/shared/ui/kit/message'
import type { ChatMessage } from '../model/chat-message'
import { MessageListItem } from './message-list-item'

export function MessageList({
  messages,
  isPending,
}: {
  messages: ChatMessage[]
  isPending?: boolean
}) {
  if (!isPending && messages.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" />
          <EmptyTitle>Сообщений пока нет</EmptyTitle>
          <EmptyDescription>Напишите первое сообщение в этом чате.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

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
