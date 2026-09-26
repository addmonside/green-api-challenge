import { describe, expect, it } from 'vitest'
import { getAccountSettingsStatus200Schema } from './generated/zod/getAccountSettingsSchema'

describe('getAccountSettingsStatus200Schema', () => {
  it('принимает phone строкой (ответ GREEN-API MAX v3)', () => {
    const result = getAccountSettingsStatus200Schema.safeParse({
      phone: '79991234567',
      stateInstance: 'authorized',
    })

    expect(result.success).toBe(true)
  })

  it('принимает ответ без phone и с лишними полями', () => {
    const result = getAccountSettingsStatus200Schema.safeParse({
      stateInstance: 'authorized',
      logoutProcess: false,
    })

    expect(result.success).toBe(true)
  })
})
