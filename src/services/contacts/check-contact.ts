import { apiClientConfig } from '@/shared/api'
import { checkAccount as checkAccountRequest } from '@/shared/api/generated/clients/checkAccount'
import type { CheckAccountStatus200 } from '@/shared/api/generated/types/CheckAccount'
import type { Credentials } from '@/shared/model'

export const checkContact = async (
  credentials: Credentials,
  phoneNumber: number,
  signal?: AbortSignal,
): Promise<CheckAccountStatus200> =>
  checkAccountRequest({
    ...apiClientConfig,
    path: credentials,
    body: { phoneNumber },
    signal,
  }).unwrap()
