import type { Todo } from '@/shared/api/todo-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'
import { TODOS_QUERY_KEY } from './use-todos'

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.deleteById,
    onSuccess: (_, id) => {
      return queryClient.setQueryData([TODOS_QUERY_KEY], (todos: Todo[]) => {
        return todos?.filter(todo => todo.id !== id)
      })
    },
  })
}
