import { describe, expect, it } from 'vitest'
import { getContactsStatus200Schema } from './generated/zod/getContactsSchema'

describe('getContactsStatus200Schema', () => {
  it('принимает контакт из документации GREEN-API', () => {
    const result = getContactsStatus200Schema.safeParse([
      {
        chatId: '100000000',
        name: 'John Doe',
        contactName: 'John Doe',
        type: 'user',
        phoneNumber: 79001111111,
      },
    ])

    expect(result.success).toBe(true)
  })

  it('принимает контакт без имени и номера (например, группу)', () => {
    const result = getContactsStatus200Schema.safeParse([{ chatId: '100000003', type: 'group' }])

    expect(result.success).toBe(true)
  })

  it('принимает любой type и лишние поля', () => {
    const result = getContactsStatus200Schema.safeParse([
      { chatId: '100000004', type: 'official', isMyContact: true, avatar: 'avatarId' },
    ])

    expect(result.success).toBe(true)
  })

  it('отклоняет контакт без chatId', () => {
    const result = getContactsStatus200Schema.safeParse([{ phoneNumber: 79001111111 }])

    expect(result.success).toBe(false)
  })
})
