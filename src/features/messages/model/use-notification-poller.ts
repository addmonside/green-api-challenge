import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { isUnauthorizedError } from '@/shared/api'
import { appConfig, useCredentials } from '@/shared/model'
import { toMessageFromNotification } from './chat-message'
import { appendMessage } from './messages-cache'
import { deleteNotification, receiveNotification } from './notifications'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useNotificationPoller = (chatId: string) => {
  const { credentials, signOut } = useCredentials()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!credentials) return

    const controller = new AbortController()
    const { signal } = controller

    const poll = async () => {
      while (!signal.aborted) {
        try {
          const notification = await receiveNotification(credentials, signal)
          if (!notification) continue
          const message = toMessageFromNotification(notification.body)
          if (message?.chatId === chatId) appendMessage(queryClient, chatId, message)
          await deleteNotification(credentials, notification.receiptId, signal)
        } catch (error) {
          if (signal.aborted) return
          if (isUnauthorizedError(error)) {
            signOut()
            return
          }
          await wait(appConfig.messagePullingRetryDelay)
        }
      }
    }

    void poll()

    return () => controller.abort()
  }, [chatId, credentials, queryClient, signOut])
}
