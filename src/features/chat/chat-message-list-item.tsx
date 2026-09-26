import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit/avatar'
import { Bubble, BubbleContent } from '@/shared/ui/kit/bubble'
import { Message, MessageAvatar, MessageContent } from '@/shared/ui/kit/message'

export function ChatMessageListItem({
  fullName = 'avatar',
  avatarImaageUrl,
  avatarFallBack,
  content,
  isOwn,
}: {
  fullName?: string
  avatarImaageUrl?: string
  avatarFallBack?: string
  content: string
  isOwn: boolean
}) {
  return (
    <Message align={isOwn ? 'end' : 'start'}>
      {(!!avatarImaageUrl || !!avatarFallBack) && (
        <MessageAvatar>
          <Avatar>
            <AvatarImage src={avatarImaageUrl} alt={fullName} />
            <AvatarFallback>{avatarFallBack}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
      )}
      <MessageContent>
        <Bubble variant={isOwn ? 'default' : 'muted'}>
          <BubbleContent>{content}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
