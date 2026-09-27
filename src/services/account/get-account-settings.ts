import { apiClientConfig } from '@/shared/api'
import { getAccountSettings as getAccountSettingsRequest } from '@/shared/api/generated/clients/getAccountSettings'
import type { GetAccountSettingsStatus200 } from '@/shared/api/generated/types/GetAccountSettings'
import type { Credentials } from '@/shared/model'

export const getAccountSettings = async (
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<GetAccountSettingsStatus200> =>
  getAccountSettingsRequest({
    ...apiClientConfig,
    path: credentials,
    signal,
  }).unwrap()
