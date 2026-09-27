import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { applyTheme, readTheme, ThemeContext, writeTheme } from '@/shared/model'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(readTheme)

  useLayoutEffect(() => {
    applyTheme(theme)
    writeTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
