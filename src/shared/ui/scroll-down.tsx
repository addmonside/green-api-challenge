import { type ReactNode, useEffect, useRef } from 'react'

type ScrollDownProps = {
  children: ReactNode
  scrollingOnFirstRender?: boolean
  scrollingOnChange?: boolean
  dependencies: unknown[]
}

export function ScrollDown({
  children,
  scrollingOnFirstRender = false,
  scrollingOnChange = false,
  dependencies,
}: ScrollDownProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)
  const isFirstRenderRef = useRef(true)
  const dependenciesKey = JSON.stringify(dependencies)

  useEffect(() => {
    const el = bottomRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isAtBottomRef.current = entry.isIntersecting
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependenciesKey — счётный триггер
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      if (scrollingOnFirstRender) {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' })
        isAtBottomRef.current = true
      }
      return
    }

    if (scrollingOnChange && isAtBottomRef.current) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }, [dependenciesKey, scrollingOnFirstRender, scrollingOnChange])

  return (
    <>
      {children}
      <div ref={bottomRef} />
    </>
  )
}
