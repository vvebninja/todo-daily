import type { TodoFilter } from './filters'
import type { Todo } from '@/shared/api/todo-service.ts'
import { useCallback } from 'react'
import { useTodos } from '@/features/todo/model/use-todos'

export function useTodosByFilter(filter: TodoFilter['value']) {
  return useTodos({
    select: useCallback(
      (todos: Todo[]) => {
        if (filter === 'all') {
          return todos
        }
        else if (filter === 'active') {
          return todos.filter(todo => !todo.isCompleted)
        }
        else if (filter === 'completed') {
          return todos.filter(todo => todo.isCompleted)
        }
      },
      [filter],
    ),
  })
}
