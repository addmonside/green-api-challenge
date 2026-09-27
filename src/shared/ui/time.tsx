import { formatClock } from '@/shared/lib/format-clock'
import { cn } from '@/shared/lib/utils'

export function Time({ timestamp, className }: { timestamp: number; className?: string }) {
  return (
    <time
      data-slot="time"
      dateTime={new Date(timestamp * 1000).toISOString()}
      className={cn('shrink-0 text-xs leading-tight opacity-70', className)}
    >
      {formatClock(timestamp)}
    </time>
  )
}
