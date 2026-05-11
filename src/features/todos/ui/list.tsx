import type { VariantProps } from 'class-variance-authority'
import type { Todo } from '@/shared/api/todo-service'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/css.ts'
import { Skeletons } from '@/shared/ui/skeletons'
import { Typography } from '@/shared/ui/typography'
import { TodoCard } from './card'

const layoutVariants = cva('space-y-4', {
  variants: {
    layout: {
      list: 'grid',
      columns: 'md:columns-2 lg:columns-3 xl:columns-4',
    },
  },
})

export type LayoutVariants = VariantProps<typeof layoutVariants>

type TodoListProps = Readonly<
  {
    items: Todo[]
    gap?: string
    isLoading?: boolean
    className?: string
  } & LayoutVariants
>

export function TodoList({
  layout = 'columns',
  items,
  isLoading,
  className,
}: TodoListProps) {
  const classNames = cn(layoutVariants({ layout }), className)

  if (isLoading) {
    return (
      <div className={classNames}>
        <Skeletons itemsCount={4} className="h-24" />
      </div>
    )
  }

  if (!items?.length) {
    return (
      <Typography color="muted" size="md" className="py-10 text-center">
        No todos yet
      </Typography>
    )
  }

  return (
    <div>
      <ul className={classNames}>
        {items.map(todo => (
          <li
            key={todo.id}
            className={cn(layout === 'columns' && `brake-inside-avoid`)}
          >
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}
