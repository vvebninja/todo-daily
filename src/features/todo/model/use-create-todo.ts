import type { Todo } from '@/shared/api/todo-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'
import { TODOS_QUERY_KEY } from './use-todos'

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.create,
    onSuccess: (newTodo: Todo) => {
      return queryClient.setQueryData([TODOS_QUERY_KEY], (oldTodos: Todo[]) => [
        ...oldTodos,
        newTodo,
      ])
    },
  })
}
