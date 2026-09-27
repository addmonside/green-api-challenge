import { cn } from '@/shared/lib/utils'
import { Bubble, BubbleContent, BubbleTail } from '@/shared/ui/kit/bubble'
import { Message, MessageContent } from '@/shared/ui/kit/message'
import { Time } from '@/shared/ui/time'

export function MessageListItem({
  content,
  isOwn,
  tailed,
  timestamp,
}: {
  content: string
  isOwn: boolean
  tailed: boolean
  timestamp: number
}) {
  return (
    <Message align={isOwn ? 'end' : 'start'}>
      <MessageContent>
        <Bubble variant={isOwn ? 'default' : 'muted'}>
          <BubbleContent
            className={cn(
              'flex flex-wrap items-end justify-end gap-x-1.5',
              tailed && (isOwn ? 'rounded-br-none' : 'rounded-bl-none'),
            )}
          >
            <span className="min-w-0 grow">{content}</span>
            <Time
              timestamp={timestamp}
              className={isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}
            />
          </BubbleContent>
          {tailed && <BubbleTail align={isOwn ? 'end' : 'start'} />}
        </Bubble>
      </MessageContent>
    </Message>
  )
}
