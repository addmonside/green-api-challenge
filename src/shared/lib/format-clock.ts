const pad = (value: number) => String(value).padStart(2, '0')

export const formatClock = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}
