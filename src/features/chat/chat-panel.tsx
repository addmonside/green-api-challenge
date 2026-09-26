import { SearchIcon } from 'lucide-react'
import SendIcon from '@/shared/assets/icons/send.svg'
import { Button } from '@/shared/ui/kit/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/kit/input-group'

export function ChatPanel() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Button variant="ghost-icon">
          <SearchIcon />
        </Button>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Button variant="chat-send">
          <SendIcon />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
