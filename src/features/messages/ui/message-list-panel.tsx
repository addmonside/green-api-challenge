import { useState } from 'react'
import { getErrorMessage } from '@/shared/api'
import SendIcon from '@/shared/assets/icons/send.svg'
import { Alert, AlertDescription } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/kit/input-group'
import { useSendMessage } from '../model/use-send-message'

export function ChatPanel({ chatId }: { chatId: string }) {
  const [text, setText] = useState('')
  const { sendMessage, isPending, error } = useSendMessage(chatId)

  const canSend = text.trim() !== '' && !isPending

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSend) return
    sendMessage(text.trim())
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
          <Button variant="chat-send" type="submit" disabled={!canSend}>
            <SendIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {!!error && (
        <Alert variant="destructive" className="rounded-lg">
          <AlertDescription>{getErrorMessage(error)}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}
