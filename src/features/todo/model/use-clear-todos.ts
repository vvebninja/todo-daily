import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'
import { TODOS_QUERY_KEY } from './use-todos'

export function useClearTodos() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoService.deleteAll,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] })
    },
  })
}
