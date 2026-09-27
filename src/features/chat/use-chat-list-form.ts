import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router'
import { checkContact } from '@/services/contacts'
import { getErrorMessage } from '@/shared/api'
import type { CheckAccountStatus200 } from '@/shared/api/generated/types/CheckAccount'
import { routes, useCredentials } from '@/shared/model'
import { chatRecipientSchema } from './chat-recipient-schema'

const instanceNotAuthorized = 'Инстанс ещё не авторизован в GREEN-API, попробуйте позже'

// checkAccount отвечает 200 в двух формах: {exist, chatId} и {status:false, reason}.
// Первое — контакт проверен, второе — инстанс не готов к проверке.
const getRecipientError = (response: CheckAccountStatus200) => {
  if (response.status === false) return response.reason || instanceNotAuthorized
  if (!response.exist) return 'Аккаунт не найден'
  return undefined
}

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
        const response = await checkContact(credentials, Number(value.recipient.trim()))
        const recipientError = getRecipientError(response)
        if (recipientError) {
          form.setErrorMap({ onSubmit: { fields: { recipient: recipientError } } })
          return
        }
        if (!response.chatId) {
          form.setErrorMap({
            onSubmit: { form: 'GREEN-API не вернул идентификатор чата', fields: {} },
          })
          return
        }
        navigate(routes.getChat(response.chatId))
      } catch (error) {
        form.setErrorMap({ onSubmit: { form: getErrorMessage(error), fields: {} } })
      }
    },
  })

  return { form }
}
