import { apiClientConfig } from '@/shared/api/client-config'
import { getAccountSettings as getAccountSettingsRequest } from '@/shared/api/generated/clients/getAccountSettings'
import type { GetAccountSettingsStatus200 } from '@/shared/api/generated/types/GetAccountSettings'
import type { Credentials } from '@/shared/model'

const toPath = (credentials: Credentials) => ({
  idInstance: credentials.idInstance,
  apiTokenInstance: credentials.apiTokenInstance,
})

export const getAccountSettings = async (
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<GetAccountSettingsStatus200> =>
  getAccountSettingsRequest({ ...apiClientConfig, path: toPath(credentials), signal }).unwrap()
