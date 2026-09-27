import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from '@tanstack/react-form'
import { expect, fn } from 'storybook/test'
import { credentialsSchema } from '@/shared/model'
import { Form } from '@/shared/ui/form'
import { Input } from '@/shared/ui/kit/input'

type Credentials = { idInstance: string; apiTokenInstance: string }

const validCredentials: Credentials = {
  idInstance: '110000000001',
  apiTokenInstance: 'd75b3a66374942c5b3c019c698abc2067e151558acbd412345',
}

function CredentialsForm({
  onSubmit,
  error,
}: {
  onSubmit?: (value: Credentials) => void
  error?: string
}) {
  const form = useForm({
    defaultValues: { idInstance: '', apiTokenInstance: '' },
    validators: { onSubmit: credentialsSchema },
    onSubmit: ({ value }) => {
      if (error) {
        form.setErrorMap({ onSubmit: { form: error, fields: {} } })
        return
      }
      onSubmit?.(value)
    },
  })

  return (
    <Form form={form} className="flex w-full max-w-sm flex-col gap-4">
      <Form.Group>
        <Form.Field name="idInstance" label="idInstance">
          {(field) => (
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="110000000001"
              autoComplete="off"
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
              autoComplete="off"
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

const meta = {
  component: CredentialsForm,
  tags: ['ai-generated'],
} satisfies Meta<typeof CredentialsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowsValidationErrors: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Войти' }))

    await canvas.findByText('Укажите idInstance')
    await canvas.findByText('Укажите apiTokenInstance')
  },
}

export const SubmitsValidCredentials: Story = {
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'idInstance' }),
      validCredentials.idInstance,
    )
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'apiTokenInstance' }),
      validCredentials.apiTokenInstance,
    )
    await userEvent.click(canvas.getByRole('button', { name: 'Войти' }))

    await expect(args.onSubmit).toHaveBeenCalledWith(validCredentials)
  },
}

export const ShowsFormError: Story = {
  args: { error: 'Неверный idInstance или apiTokenInstance' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'idInstance' }),
      validCredentials.idInstance,
    )
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'apiTokenInstance' }),
      validCredentials.apiTokenInstance,
    )
    await userEvent.click(canvas.getByRole('button', { name: 'Войти' }))

    await canvas.findByText('Неверный idInstance или apiTokenInstance')
  },
}
