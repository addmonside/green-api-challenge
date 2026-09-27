import { describe, expect, it } from 'vitest'
import { chatRecipientSchema } from './chat-recipient-schema'

const parse = (recipient: string) => chatRecipientSchema.safeParse({ recipient })

describe('chatRecipientSchema', () => {
  it('принимает российский номер из 11 цифр', () => {
    expect(parse('79991234567').success).toBe(true)
  })

  it('принимает белорусский номер из 12 цифр', () => {
    expect(parse('375291234567').success).toBe(true)
  })

  it('обрезает окружающие пробелы', () => {
    expect(chatRecipientSchema.parse({ recipient: '  79991234567  ' })).toEqual({
      recipient: '79991234567',
    })
  })

  it('отклоняет пустой номер', () => {
    expect(parse('   ').success).toBe(false)
  })

  it('отклоняет слишком короткий номер', () => {
    expect(parse('7999123456').success).toBe(false)
  })

  it('отклоняет 12 цифр с префиксом 7 вместо 375', () => {
    expect(parse('799912345678').success).toBe(false)
  })

  it('отклоняет неподдерживаемые префиксы', () => {
    expect(parse('380991234567').success).toBe(false)
    expect(parse('89991234567').success).toBe(false)
    expect(parse('+79991234567').success).toBe(false)
  })

  it('отклоняет нецифровые символы', () => {
    expect(parse('7999123456a').success).toBe(false)
  })
})
