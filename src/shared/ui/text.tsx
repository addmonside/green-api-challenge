import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const textVariants = cva('@container/page-layout', {
  variants: {
    variant: {
      default: 'text-foreground font-normal font-base',
      'chat-header-title': 'font-medium line-clamp-1 lleading-tight',
      'chat-header-description': 'text-sm text-muted-foreground line-clamp-1 leading-tight',
      'contact-name': 'block truncate',
      'contact-phone': 'block truncate text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function Text<T extends React.ElementType = 'p'>({
  className,
  as,
  variant,
  ...props
}: {
  as?: T
} & Omit<React.ComponentProps<T>, 'as'> &
  VariantProps<typeof textVariants>) {
  const Component = as || 'p'
  return (
    <Component data-slot="text" className={cn(textVariants({ variant }), className)} {...props} />
  )
}
