import { appConfig } from '@/shared/model'

/**
 * Общая конфигурация запросов GREEN-API.
 *
 * Передаётся в сгенерированные хуки/клиенты через опцию `client`,
 * поэтому базовый URL задаётся в одном месте.
 */
export const apiClientConfig = { baseURL: appConfig.apiUrl } as const
