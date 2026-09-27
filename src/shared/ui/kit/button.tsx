import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium cursor-pointer active:scale-95',
    'transition-colors duration-100 ease-in-out outline-none disabled:pointer-events-none disabled:opacity-50 ',
    'focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:opacity-80 h-10',
        ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground h-12',
        'ghost-primary': 'bg-transparent text-primary hover:bg-accent h-12 font-normal text-base',
        success: 'bg-success text-success-foreground shadow-xs hover:opacity-90 active:opacity-80',
        'chat-send':
          'bg-primary text-primary-foreground hover:bg-primary-hover rounded-full h-10 w-12 [&_svg]:size-6',
        'ghost-icon':
          'bg-transparent text-foreground hover:bg-muted-foreground/8 size-10 rounded-full [&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
