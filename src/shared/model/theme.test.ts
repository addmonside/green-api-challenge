import { describe, expect, it } from 'vitest'
import { resolveTheme } from './theme'

describe('resolveTheme', () => {
  it('уважает явный выбор пользователя', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('падает на системную настройку, если выбора нет', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
  })

  it('игнорирует мусор в localStorage', () => {
    expect(resolveTheme('blue', false)).toBe('light')
    expect(resolveTheme('', true)).toBe('dark')
  })
})
