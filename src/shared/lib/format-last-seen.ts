const minutesForms = ['минуту', 'минуты', 'минут'] as const

const pluralize = (value: number, forms: readonly [string, string, string]) => {
  const mod10 = value % 10
  const mod100 = value % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

const pad = (value: number) => String(value).padStart(2, '0')

const formatTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`

const formatDate = (date: Date) =>
  `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const formatLastSeen = (lastSeen: number, now: number = Date.now()): string => {
  const date = new Date(lastSeen * 1000)
  const nowDate = new Date(now)
  const diff = now - lastSeen * 1000

  if (diff < 60_000) return 'был(а) только что'
  if (diff < 3_600_000) {
    const minutes = Math.floor(diff / 60_000)
    return `был(а) ${minutes} ${pluralize(minutes, minutesForms)} назад`
  }

  const dayDiff = Math.round(
    (startOfDay(nowDate).getTime() - startOfDay(date).getTime()) / 86_400_000,
  )
  if (dayDiff === 0) return `был(а) сегодня в ${formatTime(date)}`
  if (dayDiff === 1) return `был(а) вчера в ${formatTime(date)}`
  return `был(а) ${formatDate(date)}`
}
