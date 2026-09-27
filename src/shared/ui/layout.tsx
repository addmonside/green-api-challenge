import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const layoutVariants = cva('', {
  variants: {
    variant: {
      default: 'min-h-svh flex flex-col',
      centered: 'min-h-svh flex flex-col items-center justify-center',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function Layout({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
} & VariantProps<typeof layoutVariants>) {
  return (
    <div className={cn(layoutVariants({ variant }))} data-slot="layout" data-variant={variant}>
      {children}
    </div>
  )
}
