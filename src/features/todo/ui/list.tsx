import type { TodoFilter } from '../model/filters'
import { TodoItem } from '@/features/todo/ui/item'
import { cn } from '@/shared/lib/css'
import { Skeletons } from '@/shared/ui/skeletons.tsx'
import { Typography } from '@/shared/ui/typography'
import { useTodosByFilter } from '../model/use-todos-by-filter'

interface TodoListProps {
  filter: TodoFilter['value']
  className?: string
}

export function TodoList({ filter = 'active', className }: TodoListProps) {
  const filteredTodos = useTodosByFilter(filter)

  const listClassNames = cn(
    'md:brake-inside-avoid space-y-4 md:columns-2 lg:columns-3 xl:columns-4',
    className,
  )

  if (filteredTodos.isLoading) {
    return (
      <div className={listClassNames}>
        <Skeletons itemsCount={4} className="h-24" />
      </div>
    )
  }

  if (filteredTodos.error) {
    return <div>{filteredTodos.error.message}</div>
  }

  if (!filteredTodos.data?.length) {
    return (
      <Typography color="muted" size="md" className="py-10 text-center">
        No todos yet
      </Typography>
    )
  }

  return (
    <ul className={listClassNames}>
      {filteredTodos.data?.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
}
