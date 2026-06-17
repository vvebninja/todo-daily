import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'
import { TODOS_QUERY_KEY } from './use-todos'

export function useDeleteTodosByStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.deleteByStatus,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] })
    },
  })
}
