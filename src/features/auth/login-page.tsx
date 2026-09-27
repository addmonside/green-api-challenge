import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import { ThemeToggle } from '@/shared/ui/theme-toggle'
import { LoginForm } from './login-form'

function LoginPage() {
  return (
    <div className="relative w-full max-w-sm">
      <ThemeToggle />
      <Card>
        <CardHeader>
          <CardTitle>Вход в GREEN-API</CardTitle>
          <CardDescription>
            Чтобы получить возможность просмотра чатов и отправки сообщений, введите данные инстанса
            и токена
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export const Component = LoginPage
