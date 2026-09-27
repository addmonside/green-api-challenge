import { apiClientConfig } from '@/shared/api'
import { getChatHistory as getChatHistoryRequest } from '@/shared/api/generated/clients/getChatHistory'
import type {
  GetChatHistoryBody,
  GetChatHistoryStatus200,
} from '@/shared/api/generated/types/GetChatHistory'
import type { Credentials } from '@/shared/model'

export const getChatHistory = async (
  credentials: Credentials,
  body: GetChatHistoryBody,
  signal?: AbortSignal,
): Promise<GetChatHistoryStatus200> =>
  getChatHistoryRequest({ ...apiClientConfig, path: credentials, body, signal }).unwrap()
