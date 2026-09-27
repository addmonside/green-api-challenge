import { cn } from 'cn'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/model'
import { Button } from './kit/button'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost-icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className={cn('absolute right-3 top-3', className)}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}
