import type { ApiSchemas } from '@/shared/api/schema'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { rqClientInstance as rqc } from '@/shared/api/instance'

export function useDeleteTodo() {
  const qc = useQueryClient()
  const mutation = rqc.useMutation('delete', `/todos/{todoId}`, {
    onSuccess: (_, variables) => {
      qc.setQueryData<ApiSchemas['Todo'][]>(
        rqc.queryOptions('get', '/todos').queryKey,
        (todos) => {
          return todos?.filter(
            todo => todo.id !== variables.params.path.todoId,
          )
        },
      )
      toast.error('Todo deleted')
    },
    onSettled: async () => {
      await qc.invalidateQueries(rqc.queryOptions('get', '/todos'))
    },
  })

  return {
    deleteTodo(id: string) {
      mutation.mutate({ params: { path: { todoId: id } } })
    },
    isDeleting: mutation.isPending,
  }
}
