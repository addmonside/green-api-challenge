import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router'
import { checkContact } from '@/services/contacts'
import { getErrorMessage } from '@/shared/api'
import { routes, useCredentials } from '@/shared/model'
import { chatRecipientSchema } from './chat-recipient-schema'

export function useChatListForm() {
  const navigate = useNavigate()
  const { credentials } = useCredentials()

  const form = useForm({
    defaultValues: { recipient: '' },
    validators: {
      onSubmit: chatRecipientSchema,
    },
    onSubmit: async ({ value }) => {
      if (!credentials) return
      try {
        const { exist, chatId } = await checkContact(credentials, Number(value.recipient.trim()))
        if (!exist) {
          form.setErrorMap({ onSubmit: { fields: { recipient: 'Аккаунт не найден' } } })
          return
        }
        navigate(routes.getChat(chatId))
      } catch (error) {
        form.setErrorMap({ onSubmit: { form: getErrorMessage(error), fields: {} } })
      }
    },
  })

  return { form }
}
