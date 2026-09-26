import { Form } from '@/shared/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import { Input } from '@/shared/ui/kit/input'
import { useLoginForm } from './use-login-form'

function LoginPage() {
  const { form } = useLoginForm()

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Вход в GREEN-API</CardTitle>
        <CardDescription>
          Для продолжения работы, укажите данные инстанса, чтобы получить возможность просмотра
          чатов и отправки сообщений.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <Form.Field name="idInstance" label="idInstance">
            {(field) => (
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="1100000001"
                autoComplete="on"
                aria-invalid={!field.state.meta.isValid}
              />
            )}
          </Form.Field>

          <Form.Field name="apiTokenInstance" label="apiTokenInstance">
            {(field) => (
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="d75b3a66374942c5b3c019c698abc2067e151558acbd412345"
                autoComplete="on"
                aria-invalid={!field.state.meta.isValid}
              />
            )}
          </Form.Field>

          <Form.Error title="Не удалось войти" />

          <Form.Submit pendingLabel="Подключение…">Войти</Form.Submit>
        </Form>
      </CardContent>
    </Card>
  )
}

export const Component = LoginPage
