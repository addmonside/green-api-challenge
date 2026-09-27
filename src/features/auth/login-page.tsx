import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import { LoginForm } from './login-form'

function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Вход в GREEN-API</CardTitle>
        <CardDescription>
          Чтобы получить возможность просмотра чатов и отправки сообщений, введите данные инстанса и
          токена
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}

export const Component = LoginPage
