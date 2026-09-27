import { useNavigate } from 'react-router'
import { useContactInfo } from '@/services/contacts'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg'
import { routes } from '@/shared/model'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit/avatar'
import { Button } from '@/shared/ui/kit/button'
import { Text } from '@/shared/ui/text'
import { TimeLastSeen } from '@/shared/ui/time-last-seen'

export function MessageListHeader({ chatId }: { chatId: string }) {
  const navigate = useNavigate()
  const { data } = useContactInfo(chatId)

  return (
    <>
      <Button
        variant="ghost-icon"
        aria-label="Назад к чатам"
        onClick={() => navigate(routes.CHAT_LIST)}
      >
        <ArrowLeftIcon />
      </Button>
      <Avatar>
        <AvatarImage src={data?.avatar} alt={data?.name ?? data?.contactName} />
        <AvatarFallback>
          {(data?.name ?? data?.contactName)
            ?.split(' ')
            .reduce((acc, char) => acc + char[0], '')
            .toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col justify-between">
        <Text as="h1" variant="chat-header-title">
          {data?.name ?? data?.contactName}
        </Text>
        <TimeLastSeen lastSeen={data?.lastSeen} />
      </div>
    </>
  )
}
