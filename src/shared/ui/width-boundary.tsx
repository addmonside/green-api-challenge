import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

type WidthBoundaryProps = useRender.ComponentProps<'div'> & {
  as?: keyof React.JSX.IntrinsicElements
}

function WidthBoundary({ className, as, render, ...props }: WidthBoundaryProps) {
  return useRender({
    defaultTagName: as,
    props: mergeProps<'div'>(
      { className: cn('max-w-174 w-full mx-auto my-0 px-2 md:px-0', className) },
      props,
    ),
    render,
    state: { slot: 'width-boundary' },
  })
}

export { WidthBoundary, type WidthBoundaryProps }
