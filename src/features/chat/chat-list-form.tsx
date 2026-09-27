import { Form } from '@/shared/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import { Input } from '@/shared/ui/kit/input'
import { useChatListForm } from './use-chat-list-form'

export function ChatListForm() {
  const { form } = useChatListForm()
  return (
    <div className="flex-1 grid place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Открыть чат</CardTitle>
          <CardDescription>Введите номер получателя для открытия чата</CardDescription>
        </CardHeader>
        <CardContent>
          <Form form={form}>
            <Form.Group>
              <Form.Field name="recipient" label="Номер получателя">
                {(field) => (
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="79999999999"
                    autoComplete="phone"
                    aria-invalid={!field.state.meta.isValid}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Error title="Не удалось открыть чат" />
            <Form.Submit pendingLabel="Открытие…">Открыть</Form.Submit>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
