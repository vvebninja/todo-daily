import type { TodoFilterValue } from '@/features/todos/model/filters.ts'
import { useFilteredTodos } from '@/features/todos/model/use-filtered-todos.ts'
import { Skeletons } from '@/shared/ui/skeletons'
import { Typography } from '@/shared/ui/typography'
import { TodoCard } from './card'

interface TodoListProps {
  filter: TodoFilterValue
  className?: string
}

export function TodoList({ filter = 'active' }: TodoListProps) {
  const { filteredTodos, isLoading, error } = useFilteredTodos(filter)

  if (isLoading) {
    return (
      <div className="">
        <Skeletons itemsCount={4} className="h-24" />
      </div>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!filteredTodos?.length) {
    return (
      <Typography color="muted" size="md" className="py-10 text-center">
        No todos yet
      </Typography>
    )
  }

  return (
    <div>
      <ul className="md:brake-inside-avoid space-y-4 md:columns-2 lg:columns-3 xl:columns-4">
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}
