import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { isUnauthorizedError } from '@/shared/api'
import type { ReceiveNotificationResponse } from '@/shared/api/generated/types/ReceiveNotification'
import { useCredentials } from '@/shared/model'
import { toMessageFromNotification } from './message-converter'
import { appendMessage } from './message-list-cache'
import { MessageNotificationService } from './message-notification-service'

export const useMessageNotificationPoller = (chatId: string) => {
  const { credentials, isEmpty, signOut } = useCredentials()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isEmpty) return

    const handleNotification = (notification: ReceiveNotificationResponse) => {
      const message = toMessageFromNotification(notification.body)
      if (message?.chatId === chatId) appendMessage(queryClient, chatId, message)
    }
    const handleError = (error: unknown) => {
      if (isUnauthorizedError(error)) {
        signOut()
        return true
      }
      return false
    }

    const service = new MessageNotificationService(credentials)
    void service.poll(handleNotification, handleError) // ! намеренно игнорируемый промис (реджектов не будет — всё ловится внутри poll)

    return () => service.abort()
  }, [credentials, isEmpty, queryClient, chatId, signOut])
}
