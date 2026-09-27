import { Bubble, BubbleContent } from '@/shared/ui/kit/bubble'
import { Message, MessageContent } from '@/shared/ui/kit/message'

export function MessageListItem({
  content,
  isOwn,
}: {
  authorName?: string
  content: string
  isOwn: boolean
}) {
  return (
    <Message align={isOwn ? 'end' : 'start'}>
      <MessageContent>
        <Bubble variant={isOwn ? 'default' : 'muted'}>
          <BubbleContent>{content}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
