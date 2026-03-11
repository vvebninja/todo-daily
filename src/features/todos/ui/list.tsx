import type { ApiSchemas } from '@/shared/api/schema'

import { cn } from '@/shared/lib/css.ts'
import { Skeletons } from '@/shared/ui/skeletons.tsx'
import { Typography } from '@/shared/ui/typography.tsx'
import { useDeleteTodo } from '../model/use-delete-todo.ts'
import { useToggleTodo } from '../model/use-toggle-todo.ts'
import { TodoItem } from './item.tsx'

type TodoListProps = Readonly<{
  items?: ApiSchemas['Todo'][]
  isLoading: boolean
  className?: string
}>

export function TodoList({ items, isLoading, className }: TodoListProps) {
  const deleteTodo = useDeleteTodo()
  const { toggleCompleted } = useToggleTodo()

  const listClassNames = cn('grid max-w-250 gap-2.5', className)

  if (isLoading) {
    return (
      <ul className={listClassNames}>
        <Skeletons itemsCount={4} className="h-24 bg-gray-300" />
      </ul>
    )
  }

  if (!items?.length) {
    return (
      <Typography
        as="p"
        variant="p"
        color="muted"
        size="md"
        className="flex items-center gap-4"
      >
        No todos yet
      </Typography>
    )
  }

  return (
    <ul className={listClassNames}>
      {items.map(todo => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            isDeleting={deleteTodo.getIsPending(todo.id)}
            onDelete={deleteTodo.handleDelete}
            toggleCompleted={toggleCompleted}
          />
        </li>
      ))}
    </ul>
  )
}
