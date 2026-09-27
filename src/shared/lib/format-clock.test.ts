import { describe, expect, it } from 'vitest'
import { formatClock } from './format-clock'

const at = (year: number, month: number, day: number, hours = 0, minutes = 0) =>
  new Date(year, month - 1, day, hours, minutes).getTime()

describe('formatClock', () => {
  it('formats 24h time with leading zeros', () => {
    expect(formatClock(at(2025, 1, 15, 9, 5) / 1000)).toBe('09:05')
    expect(formatClock(at(2025, 1, 15, 14, 30) / 1000)).toBe('14:30')
  })

  it('formats midnight as 00:00', () => {
    expect(formatClock(at(2025, 1, 15) / 1000)).toBe('00:00')
  })
})
