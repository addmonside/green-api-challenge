import { apiClientConfig } from '@/shared/api'
import { deleteNotification as deleteNotificationRequest } from '@/shared/api/generated/clients/deleteNotification'
import { receiveNotification as receiveNotificationRequest } from '@/shared/api/generated/clients/receiveNotification'
import type { DeleteNotificationResponse } from '@/shared/api/generated/types/DeleteNotification'
import type { ReceiveNotificationResponse } from '@/shared/api/generated/types/ReceiveNotification'
import { appConfig, type Credentials } from '@/shared/model'

const toPath = (credentials: Credentials) => ({
  idInstance: credentials.idInstance,
  apiTokenInstance: credentials.apiTokenInstance,
})

/**
 * Методы, которые дёргаются императивно, а не через react-query хуки:
 * проверка кредов на логине, long-poll уведомлений и его подтверждение,
 * история чата с кастомной обработкой сообщений.
 */

export const receiveNotification = async (
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | undefined> =>
  receiveNotificationRequest({
    ...apiClientConfig,
    path: toPath(credentials),
    query: { receiveTimeout: appConfig.receiveTimeout },
    signal,
    // ReceiveNotification отдаёт пустое тело по таймауту long-poll (200 без body).
    // Транспорт превращает это в undefined и валидация объекта падает — считаем это отсутствием уведомления.
    onValidationError: (error, { value }) => {
      if (value === undefined) return { value: undefined }
      throw error
    },
  }).unwrap()

export const deleteNotification = async (
  credentials: Credentials,
  receiptId: number,
  signal?: AbortSignal,
): Promise<DeleteNotificationResponse> =>
  deleteNotificationRequest({
    ...apiClientConfig,
    path: { ...toPath(credentials), receiptId: String(receiptId) },
    signal,
  }).unwrap()
