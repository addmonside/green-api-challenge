import type { AnyFieldApi, AnyFormApi } from '@tanstack/react-form'
import { cn } from 'cn'
import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext } from 'react'
import InfoIcon from '@/shared/assets/icons/info.svg'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/shared/ui/kit/field'

type FormStateAny = AnyFormApi['state']
type ComponentRender = ReactNode | Promise<ReactNode>

type FormFieldProps = {
  name: string
  label?: ReactNode
  description?: ReactNode
  className?: string
  children: (field: AnyFieldApi) => ReactNode
}

type FormSubscribe = <TSelected>(props: {
  selector?: (state: FormStateAny) => TSelected
  children: ((state: TSelected) => ReactNode) | ReactNode
}) => ComponentRender

type AnyReactFormApi = AnyFormApi & {
  Field: (props: FormFieldProps) => ComponentRender
  Subscribe: FormSubscribe
}

const FormContext = createContext<AnyReactFormApi | null>(null)

const useFormInstance = () => {
  const form = useContext(FormContext)
  if (!form) throw new Error('Form components must be used within <Form>')
  return form
}

const toFieldErrors = (errors: unknown[]): Array<{ message?: string }> =>
  errors.map((error) => {
    if (typeof error === 'string') return { message: error }
    if (error && typeof error === 'object' && 'message' in error) {
      return error as { message?: string }
    }
    return {}
  })

const getFormErrorMessage = (error: unknown): string | undefined => {
  if (!error) return undefined
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && 'form' in error) {
    return getFormErrorMessage((error as { form?: unknown }).form)
  }
  return undefined
}

type FormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  form: AnyReactFormApi
}

function FormWrapper({ form, className, ...props }: FormProps) {
  return (
    <FormContext.Provider value={form}>
      <form
        noValidate
        data-slot="form"
        className={cn('flex flex-col gap-6', className)}
        onSubmit={(event) => {
          event.preventDefault()
          event.stopPropagation()
          void form.handleSubmit()
        }}
        {...props}
      />
    </FormContext.Provider>
  )
}

function FormField({ name, label, description, className, children }: FormFieldProps) {
  const form = useFormInstance()
  return (
    <form.Field name={name}>
      {(field) => (
        <Field data-invalid={!field.state.meta.isValid} className={className}>
          {label ? <FieldLabel htmlFor={name}>{label}</FieldLabel> : null}
          {children(field)}
          {description ? <FieldDescription>{description}</FieldDescription> : null}
          <FieldError errors={toFieldErrors(field.state.meta.errors)} />
        </Field>
      )}
    </form.Field>
  )
}

type FormErrorProps = Omit<ComponentProps<typeof Alert>, 'variant'> & {
  title?: ReactNode
}

function FormError({ title = 'Ошибка', className, ...props }: FormErrorProps) {
  const form = useFormInstance()
  return (
    <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
      {(error) => {
        const message = getFormErrorMessage(error)
        if (!message) return null
        return (
          <Alert variant="destructive" className={className} {...props}>
            <InfoIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )
      }}
    </form.Subscribe>
  )
}

type FormSubmitProps = ComponentProps<typeof Button> & {
  pendingLabel?: ReactNode
}

function FormSubmit({ children, pendingLabel, disabled, ...props }: FormSubmitProps) {
  const form = useFormInstance()
  return (
    <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
      {([isSubmitting]) => (
        <Button
          type="submit"
          variant="ghost-primary"
          disabled={disabled || isSubmitting}
          {...props}
        >
          {isSubmitting && pendingLabel ? pendingLabel : children}
        </Button>
      )}
    </form.Subscribe>
  )
}

function FormActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="form-actions" className={cn('flex flex-col gap-2', className)} {...props} />
  )
}

function FormGroup({ className, ...props }: ComponentProps<'fieldset'>) {
  const form = useFormInstance()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <fieldset
          data-slot="form-group"
          disabled={isSubmitting}
          className={cn('flex flex-col gap-2.5', className)}
          {...props}
        />
      )}
    </form.Subscribe>
  )
}

export const Form = Object.assign(FormWrapper, {
  Field: FormField,
  Error: FormError,
  Submit: FormSubmit,
  Actions: FormActions,
  Group: FormGroup,
})
