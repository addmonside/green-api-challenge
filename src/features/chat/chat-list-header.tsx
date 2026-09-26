import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg'
import { useCredentials } from '@/shared/model'
import { Button } from '@/shared/ui/kit/button'
import { Text } from '@/shared/ui/text'

export function ChatListHeader() {
  const { signOut } = useCredentials()
  return (
    <>
      <Button variant="ghost-icon" aria-label="Выйти" onClick={signOut}>
        <ArrowLeftIcon />
      </Button>
      <Text as="h1" variant="chat-header-title" className="flex-1">
        Чаты
      </Text>
    </>
  )
}
