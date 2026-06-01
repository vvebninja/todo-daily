import type { TodoFilterValue } from '@/features/todos/model/filters.ts'
import type { Todo } from '@/shared/api/todo-service.ts'
import { useCallback } from 'react'
import { useTodos } from '@/features/todos/model/use-todos.ts'

export function useFilteredTodos(filter: TodoFilterValue) {
  const { data, isLoading, error } = useTodos({
    select: useCallback(
      (todos: Todo[]) => {
        if (filter === 'active') {
          return todos.filter(todo => !todo.isCompleted)
        }
        else if (filter === 'completed') {
          return todos.filter(todo => todo.isCompleted)
        }
      },
      [filter],
    ),
  })

  return { filteredTodos: data, isLoading, error }
}
