import { afterEach, describe, expect, it, vi } from 'vitest'

const apiUrl = 'https://4100.api.green-api.com'

const loadAppConfig = async (env: Record<string, string> = {}) => {
  vi.resetModules()
  vi.stubEnv('VITE_API_URL', apiUrl)
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value)

  return (await import('./app-config')).appConfig
}

describe('appConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('убирает слеши на конце из адреса API', async () => {
    const config = await loadAppConfig({ VITE_API_URL: `${apiUrl}//` })

    expect(config.apiUrl).toBe(apiUrl)
  })

  it('подсказывает, где искать переменную, если адрес API не задан', async () => {
    vi.resetModules()
    vi.stubEnv('VITE_API_URL', '')

    await expect(import('./app-config')).rejects.toThrow(/VITE_API_URL.*\.env\.example/s)
  })

  it.each([
    ['5', 5],
    ['30', 30],
    ['60', 60],
    ['120', 60],
    ['1', 5],
    ['0', 5],
    ['', 5],
    ['не число', 5],
  ])('приводит receiveTimeout=%s к %i', async (raw, expected) => {
    const config = await loadAppConfig({ VITE_RECEIVE_TIMEOUT: raw })

    expect(config.receiveTimeout).toBe(expected)
  })

  it.each([
    ['true', true],
    ['false', false],
    ['', false],
  ])('включает девтулзы при VITE_DEVTOOLS_ENABLED=%s: %s', async (raw, expected) => {
    const config = await loadAppConfig({ VITE_DEVTOOLS_ENABLED: raw })

    expect(config.devtoolsEnabled).toBe(expected)
  })
})
