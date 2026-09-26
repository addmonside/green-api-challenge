import { Form } from '@/shared/ui/form'
import { Card, CardContent } from '@/shared/ui/kit/card'
import { Input } from '@/shared/ui/kit/input'
import { useChatListForm } from './use-chat-list-form'

export function ChatListForm() {
  const { form } = useChatListForm()
  return (
    <Card>
      <CardContent>
        <Form form={form}>
          <Form.Field name="recipient" label="Номер получателя">
            {(field) => (
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="79999999999"
                autoComplete="off"
                aria-invalid={!field.state.meta.isValid}
              />
            )}
          </Form.Field>

          <Form.Error title="Не удалось открыть чат" />

          <Form.Submit pendingLabel="Открытие…">Открыть</Form.Submit>
        </Form>
      </CardContent>
    </Card>
  )
}
