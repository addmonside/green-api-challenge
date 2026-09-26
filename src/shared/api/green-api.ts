import { appConfig, type Credentials } from '@/shared/model'
import { apiClientConfig } from './client-config'
import { deleteNotification as deleteNotificationRequest } from './generated/clients/deleteNotification'
import { getChatHistory as getChatHistoryRequest } from './generated/clients/getChatHistory'
import { receiveNotification as receiveNotificationRequest } from './generated/clients/receiveNotification'
import type { DeleteNotificationResponse } from './generated/types/DeleteNotification'
import type { GetChatHistoryBody, GetChatHistoryStatus200 } from './generated/types/GetChatHistory'
import type { ReceiveNotificationResponse } from './generated/types/ReceiveNotification'

const toPath = (credentials: Credentials) => ({
  idInstance: credentials.idInstance,
  apiTokenInstance: credentials.apiTokenInstance,
})

/**
 * Методы, которые дёргаются императивно, а не через react-query хуки:
 * проверка кредов на логине, long-poll уведомлений и его подтверждение,
 * история чата с кастомной обработкой сообщений.
 */
export const getChatHistory = async (
  credentials: Credentials,
  body: GetChatHistoryBody,
  signal?: AbortSignal,
): Promise<GetChatHistoryStatus200> =>
  getChatHistoryRequest({ ...apiClientConfig, path: toPath(credentials), body, signal }).unwrap()

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
