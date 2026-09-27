import { useQueryClient } from '@tanstack/react-query'
import { apiClientConfig } from '@/shared/api'
import { sendMessage as sendMessageRequest } from '@/shared/api/generated/clients/sendMessage'
import { useSendMessage as useSendMessageMutation } from '@/shared/api/generated/hooks'
import { useCredentials } from '@/shared/model'
import { toOutgoingMessage } from './message-converter'
import { appendMessage } from './message-list-cache'

export const useSendMessage = (chatId: string) => {
  const { credentials } = useCredentials()
  const queryClient = useQueryClient()

  const mutation = useSendMessageMutation<unknown>({
    client: apiClientConfig,
    mutation: {
      mutationFn: ({ path, body }) =>
        sendMessageRequest({ ...apiClientConfig, path, body }).unwrap(),
      onSuccess: (response, { body }) => {
        appendMessage(
          queryClient,
          chatId,
          toOutgoingMessage(chatId, response.idMessage, body.message),
        )
      },
    },
  })

  const sendMessage = (text: string) => {
    if (!credentials) return
    mutation.mutate({
      path: {
        idInstance: credentials.idInstance,
        apiTokenInstance: credentials.apiTokenInstance,
      },
      body: { chatId, message: text },
    })
  }

  return { sendMessage, isPending: mutation.isPending, error: mutation.error }
}
