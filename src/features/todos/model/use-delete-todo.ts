import type { ApiSchemas } from '@/shared/api/schema'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryClient } from '@/shared/api/query-client'
import { todoService } from '@/shared/api/todo-service'

export function useDeleteTodo() {
  const mutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: (_, id) => {
      queryClient.setQueryData<ApiSchemas['Todo'][]>(['todos'], (todos) => {
        return todos?.filter(todo => todo.id !== id)
      })
      toast.info('Todo deleted')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return {
    deleteTodo(id: string) {
      mutation.mutate(id)
    },
    isDeleting: mutation.isPending,
  }
}
