import { useState } from 'react'
import SendIcon from '@/shared/assets/icons/send.svg'
import { Button } from '@/shared/ui/kit/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/kit/input-group'

export function ChatPanel({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('')
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (text.trim() === '') return
    onSend(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <InputGroup className="w-full">
        <InputGroupInput
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Сообщение"
          aria-label="Текст сообщения"
        />
        <InputGroupAddon align="inline-end">
          <Button variant="chat-send" type="submit">
            <SendIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
