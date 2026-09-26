import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { createContext, useContext, useMemo } from 'react'
import { WidthBoundary } from './width-boundary'

type Variant = 'default' | 'chat'
type PageLayoutContextProps = {
  variant: Variant
}
const PageLayoutContext = createContext<PageLayoutContextProps | null>(null)

function usePageLayout() {
  const context = useContext(PageLayoutContext)
  if (!context) {
    throw new Error('usePageLayout must be used inside a PageLayout.')
  }

  return context
}

const pageLayoutVariants = cva('@container/page-layout', {
  variants: {
    variant: {
      default: 'flex w-full flex-1 flex-col pb-15',
      chat: 'grid flex-1 grid-rows-[auto_1fr_auto]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function PageLayoutWrapper({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode
  className?: string
} & VariantProps<typeof pageLayoutVariants>) {
  const value = useMemo(() => ({ variant: variant || 'default' }), [variant])
  return (
    <PageLayoutContext.Provider value={value}>
      <WidthBoundary
        as="section"
        className={cn(pageLayoutVariants({ variant }), className)}
        data-slot="page-layout"
        data-variant={variant}
      >
        {children}
      </WidthBoundary>
    </PageLayoutContext.Provider>
  )
}

const pageLayoutHeaderVariants = cva('', {
  variants: {
    variant: {
      default: '',
      centered: '',
      chat: 'sticky top-7.5 z-10 items-stretch justify-center rounded-full mt-7.5 flex flex-row rounded-full w-full gap-2 bg-card h-12 p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function PageLayoutHeader({ className, ...props }: React.ComponentProps<'header'> & {}) {
  const { variant } = usePageLayout()
  return (
    <header
      data-slot="page-layout-header"
      className={cn(pageLayoutHeaderVariants({ variant }), className)}
      {...props}
    />
  )
}

const pageLayoutContentVariants = cva('', {
  variants: {
    variant: {
      default: 'grid flex-1 gap-12',
      centered: 'flex flex-col flex-1 items-center justify-center gap-12',
      chat: 'flex flex-col flex-1 pt-[1.875rem] pb-[6.75rem]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function PageLayoutContent({
  className,
  as,
  render,
  ...props
}: useRender.ComponentProps<'div'> & {
  as?: keyof React.JSX.IntrinsicElements
}) {
  const { variant } = usePageLayout()
  return useRender({
    defaultTagName: as,
    props: mergeProps<'div'>(
      { className: cn(pageLayoutContentVariants({ variant }), className) },
      props,
    ),
    render,
    state: { slot: 'page-layout-content', variant },
  })
}

type PageLayoutToolbarProps = useRender.ComponentProps<'div'> & {
  as?: keyof React.JSX.IntrinsicElements
}

function PageLayoutToolbar({ className, as, render, ...props }: PageLayoutToolbarProps) {
  return (
    <WidthBoundary
      as={as}
      render={render}
      data-slot="page-layout-toolbar"
      className={cn(
        'fixed bottom-0 flex flex-col w-full mb-7.5 z-10 bg-card rounded-full h-12 p-1',
        className,
      )}
      {...props}
    />
  )
}

// function PageLayoutError({
//   title,
//   error,
//   media,
//   action,
// }: {
//   title?: string
//   error: { message: string } | null | undefined
//   media?: ReactNode
//   action?: ReactNode
// }) {
//   if (!error) return null
//   return (
//     <PageLayoutContent>
//       <Alert variant="destructive" data-slot="page-layout-error">
//         {media ?? <LucideInfo />}
//         {title && <AlertTitle>{title}</AlertTitle>}
//         <AlertDescription>{error.message}</AlertDescription>
//         {action && <AlertAction>{action}</AlertAction>}
//       </Alert>
//     </PageLayoutContent>
//   )
// }

// function PageLayoutEmpty({
//   title,
//   description,
//   media,
//   content,
// }: {
//   title: string
//   description?: string
//   media?: ReactNode
//   content?: ReactNode
// }) {
//   return (
//     <PageLayoutContent variant="centered" data-slot="page-layout-empty">
//       <Empty>
//         <EmptyHeader>
//           <EmptyMedia variant="icon">{media ?? <LucideInfo />}</EmptyMedia>
//           <EmptyTitle>{title}</EmptyTitle>
//           <EmptyDescription>{description}</EmptyDescription>
//         </EmptyHeader>
//         {!!content && <EmptyContent>{content}</EmptyContent>}
//       </Empty>
//     </PageLayoutContent>
//   )
// }

export const PageLayout = Object.assign(PageLayoutWrapper, {
  Header: PageLayoutHeader,
  // Title: PageLayoutTitle,
  Content: PageLayoutContent,
  Toolbar: PageLayoutToolbar,
  // Error: PageLayoutError,
  // Empty: PageLayoutEmpty,
})
