import { appConfig, type Credentials } from '@/shared/model'
import { apiClientConfig } from './client-config'
import { deleteNotification as deleteNotificationRequest } from './generated/clients/deleteNotification'
import { getAccountSettings as getAccountSettingsRequest } from './generated/clients/getAccountSettings'
import { getChatHistory as getChatHistoryRequest } from './generated/clients/getChatHistory'
import { receiveNotification as receiveNotificationRequest } from './generated/clients/receiveNotification'
import type { DeleteNotificationResponse } from './generated/types/DeleteNotification'
import type { GetAccountSettingsStatus200 } from './generated/types/GetAccountSettings'
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
export const getAccountSettings = async (
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<GetAccountSettingsStatus200> =>
  getAccountSettingsRequest({ ...apiClientConfig, path: toPath(credentials), signal }).unwrap()

