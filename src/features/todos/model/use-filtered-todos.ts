import type { TodoFilterValue } from '@/features/todos/model/filters.ts'
import { useTodosQuery } from '@/features/todos/model/use-todos-query.ts'

export function useFilteredTodos(filter: TodoFilterValue) {
  const { data, isLoading, error } = useTodosQuery({
    select: (todos) => {
      if (filter === 'active') {
        return todos.filter(todo => !todo.isCompleted)
      }
      else if (filter === 'completed') {
        return todos.filter(todo => todo.isCompleted)
      }
    },
  })

  return { filteredTodos: data, isLoading, error }
}
