import { useNavigate } from 'react-router'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg'
import { routes } from '@/shared/model'
import { Button } from '@/shared/ui/kit/button'
import { Text } from '@/shared/ui/text'
import { TimeLastSeen } from '@/shared/ui/time-last-seen'

export function MessageListHeader({ title, lastSeen }: { title: string; lastSeen?: number }) {
  const navigate = useNavigate()

  return (
    <>
      <Button
        variant="ghost-icon"
        aria-label="Назад к чатам"
        onClick={() => navigate(routes.CHAT_LIST)}
      >
        <ArrowLeftIcon />
      </Button>
      <div className="flex-1 flex flex-col justify-between">
        <Text as="h1" variant="chat-header-title">
          {title}
        </Text>
        <TimeLastSeen lastSeen={lastSeen} />
      </div>
    </>
  )
}
