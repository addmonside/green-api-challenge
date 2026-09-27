import { createContext, use } from 'react'

export type Theme = 'light' | 'dark'

export const themeStorageKey = 'green-api:theme'
export const themeClassName = 'dark'

// Явный выбор пользователя важнее системной настройки.
export const resolveTheme = (stored: string | null, prefersDark: boolean): Theme => {
  if (stored === 'light' || stored === 'dark') return stored
  return prefersDark ? 'dark' : 'light'
}

export const readTheme = (): Theme =>
  resolveTheme(
    localStorage.getItem(themeStorageKey),
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

export const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle(themeClassName, theme === 'dark')
}

export const writeTheme = (theme: Theme) => {
  localStorage.setItem(themeStorageKey, theme)
}

export type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
})

export const useTheme = () => use(ThemeContext)
