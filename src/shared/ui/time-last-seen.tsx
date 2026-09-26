import { formatLastSeen } from '@/shared/lib/format-last-seen'
import { Text } from './text'

export function TimeLastSeen({ lastSeen }: { lastSeen?: number }) {
  if (lastSeen === undefined) return null

  return (
    <Text
      as="time"
      variant="chat-header-description"
      dateTime={new Date(lastSeen * 1000).toISOString()}
    >
      {formatLastSeen(lastSeen)}
    </Text>
  )
}
