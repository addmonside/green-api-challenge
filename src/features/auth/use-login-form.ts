import { useForm } from '@tanstack/react-form'
import { useNavigate } from 'react-router'
import { getAccountSettings } from '@/services/account'
import { getErrorMessage, isUnauthorizedError } from '@/shared/api'
import { credentialsSchema, routes, useCredentials } from '@/shared/model'

export function useLoginForm() {
  const navigate = useNavigate()
  const { signIn } = useCredentials()

  const form = useForm({
    defaultValues: { idInstance: '', apiTokenInstance: '' },
    validators: {
      onSubmit: credentialsSchema,
    },
    onSubmit: async ({ value }) => {
      const credentials = {
        idInstance: value.idInstance.trim(),
        apiTokenInstance: value.apiTokenInstance.trim(),
      }
      try {
        await getAccountSettings(credentials)
        signIn(credentials)
        navigate(routes.CHAT_LIST, { replace: true })
      } catch (error) {
        form.setErrorMap({
          onSubmit: {
            form: isUnauthorizedError(error)
              ? 'Неверный idInstance или apiTokenInstance'
              : getErrorMessage(error),
            fields: {},
          },
        })
      }
    },
  })

  return { form }
}
