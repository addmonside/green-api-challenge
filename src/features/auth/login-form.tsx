import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/kit/input'
import { useLoginForm } from './use-login-form'

export function LoginForm() {
  const { form } = useLoginForm()
  return (
    <Form form={form}>
      <Form.Group>
        <Form.Field name="idInstance" label="idInstance">
          {(field) => (
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="410011747511"
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
      </Form.Group>
      <Form.Error title="Не удалось войти" />
      <Form.Actions>
        <Form.Submit pendingLabel="Подключение…">Войти</Form.Submit>
      </Form.Actions>
    </Form>
  )
}
