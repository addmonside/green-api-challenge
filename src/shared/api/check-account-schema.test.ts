import { describe, expect, it } from 'vitest'
import { checkAccountStatus200Schema } from './generated/zod/checkAccountSchema'

describe('checkAccountStatus200Schema', () => {
  it('принимает успешный ответ (контакт найден)', () => {
    const result = checkAccountStatus200Schema.safeParse({
      exist: true,
      chatId: '11001234567@c.us',
    })

    expect(result.success).toBe(true)
  })

  it('принимает успешный ответ с лишними полями', () => {
    const result = checkAccountStatus200Schema.safeParse({
      exist: true,
      chatId: '11001234567@c.us',
      fromCache: false,
    })

    expect(result.success).toBe(true)
  })

  it('принимает ответ 200 со статусом false вместо exist/chatId', () => {
    // GREEN-API отвечает 200 c {status:false, reason}, если инстанс ещё не авторизован.
    const result = checkAccountStatus200Schema.safeParse({
      status: false,
      reason: 'instance is starting or not authorized',
    })

    expect(result.success).toBe(true)
  })

  it('сохраняет reason в разобранном ответе', () => {
    const result = checkAccountStatus200Schema.parse({
      status: false,
      reason: 'instance is starting or not authorized',
    })

    expect(result).toEqual({
      status: false,
      reason: 'instance is starting or not authorized',
    })
  })
})
