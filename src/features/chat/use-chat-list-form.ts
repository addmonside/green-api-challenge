import { useForm } from '@tanstack/react-form'
import { chatRecipientSchema } from './chat-recipient-schema'

export function useChatListForm(onSubmit: (recipient: string) => void) {
  const form = useForm({
    defaultValues: { recipient: '' },
    validators: {
      onSubmit: chatRecipientSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value.recipient.trim())
    },
  })

  return { form }
}
