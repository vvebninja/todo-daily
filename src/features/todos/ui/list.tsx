import type { ApiSchemas } from '@/shared/api/schema'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/css'
import { Skeletons } from '@/shared/ui/skeletons'
import { Typography } from '@/shared/ui/typography'
import { useLayoutToggle } from '../model/use-layout-toggle'
import { TodoCard } from './card'

const layoutToggleVariants = cva('grid gap-2.5', {
  variants: {
    variant: {
      list: 'grid',
      grid: 'grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-4.5',
    },
  },
})

type TodoListProps = Readonly<{
  items?: ApiSchemas['Todo'][]
  isLoading: boolean
  className?: string
}>

export function TodoList({ items, isLoading, className }: TodoListProps) {
  const { variant, controls } = useLayoutToggle()

  const listClassNames = cn(layoutToggleVariants({ variant }), className)

  if (isLoading) {
    return (
      <div className={listClassNames}>
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
      {controls}
      <ul className={listClassNames}>
        {items.map(todo => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}
