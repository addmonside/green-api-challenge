import { apiClientConfig } from '@/shared/api/client-config'
import { checkAccount as checkAccountRequest } from '@/shared/api/generated/clients/checkAccount'
import type { CheckAccountStatus200 } from '@/shared/api/generated/types/CheckAccount'
import type { Credentials } from '@/shared/model'

const toPath = (credentials: Credentials) => ({
  idInstance: credentials.idInstance,
  apiTokenInstance: credentials.apiTokenInstance,
})

export const checkContact = async (
  credentials: Credentials,
  phoneNumber: number,
  signal?: AbortSignal,
): Promise<CheckAccountStatus200> =>
  checkAccountRequest({
    ...apiClientConfig,
    path: toPath(credentials),
    body: { phoneNumber },
    signal,
  }).unwrap()
