import { type ReactNode, useEffect, useRef } from 'react'

type ScrollDownProps = {
  children: ReactNode
  scrollingOnFirstRender?: boolean
  scrollingOnChange?: boolean
  /**
   * Счётчик, по которому отслеживается изменение содержимого. Ожидается
   * длина списка: сообщения только добавляются, поэтому рост числа означает
   * новый элемент, а не изменившийся текст старого.
   */
  listKey: number
}

export function ScrollDown({
  children,
  scrollingOnFirstRender = false,
  scrollingOnChange = false,
  listKey,
}: ScrollDownProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)
  const isFirstRenderRef = useRef(true)

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: listKey не читается в теле эффекта — это счётный триггер прокрутки
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
  }, [listKey, scrollingOnFirstRender, scrollingOnChange])

  return (
    <>
      {children}
      <div ref={bottomRef} />
    </>
  )
}
