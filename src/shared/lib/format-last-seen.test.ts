import { describe, expect, it } from 'vitest'
import { formatLastSeen } from './format-last-seen'

const at = (year: number, month: number, day: number, hours = 0, minutes = 0) =>
  new Date(year, month - 1, day, hours, minutes).getTime()

describe('formatLastSeen', () => {
  it('shows "только что" for less than a minute', () => {
    const now = at(2025, 1, 15, 23, 0)

    expect(formatLastSeen(now / 1000 - 30, now)).toBe('был(а) только что')
  })

  it('shows minutes with correct declension', () => {
    const now = at(2025, 1, 15, 23, 0)

    expect(formatLastSeen(now / 1000 - 5 * 60, now)).toBe('был(а) 5 минут назад')
    expect(formatLastSeen(now / 1000 - 2 * 60, now)).toBe('был(а) 2 минуты назад')
    expect(formatLastSeen(now / 1000 - 21 * 60, now)).toBe('был(а) 21 минуту назад')
    expect(formatLastSeen(now / 1000 - 11 * 60, now)).toBe('был(а) 11 минут назад')
  })

  it('shows today time', () => {
    const now = at(2025, 1, 15, 23, 0)

    expect(formatLastSeen(at(2025, 1, 15, 10, 5) / 1000, now)).toBe('был(а) сегодня в 10:05')
  })

  it('shows yesterday time', () => {
    const now = at(2025, 1, 15, 12, 0)

    expect(formatLastSeen(at(2025, 1, 14, 9, 5) / 1000, now)).toBe('был(а) вчера в 09:05')
  })

  it('shows the date for older entries', () => {
    const now = at(2025, 1, 15, 12, 0)

    expect(formatLastSeen(at(2025, 1, 12, 9, 5) / 1000, now)).toBe('был(а) 12.01.2025')
  })
})
