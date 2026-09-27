import type { ReactNode } from 'react'

type ShowIfProps = {
  condition: boolean
  /** Отображается, когда условие выполнено. */
  children: ReactNode
  /** Отображается, когда условие не выполнено. */
  fallback?: ReactNode
}

export function ShowIf({ condition, children, fallback }: ShowIfProps) {
  return condition ? children : (fallback ?? null)
}
