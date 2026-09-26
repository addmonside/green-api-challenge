import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg'
import EllipsisVerticalIcon from '@/shared/assets/icons/ellipsis-vertical.svg'
import { Button } from '@/shared/ui/kit/button'
import { Text } from '@/shared/ui/text'

export function ChatHeader() {
  return (
    <>
      <Button variant="ghost-icon">
        <ArrowLeftIcon />
      </Button>
      <div className="flex-1 flex flex-col justify-between">
        <Text as="h1" variant="chat-header-title">
          title
        </Text>
        <Text variant="chat-header-description">title</Text>
      </div>
      <div>
        <Button variant="ghost-icon">
          <EllipsisVerticalIcon />
        </Button>
      </div>
    </>
  )
}
