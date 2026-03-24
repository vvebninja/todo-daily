import type { ApiSchemas } from '@/shared/api/schema'
import { rqClient as rqc } from '@/shared/api/instance.ts'
import { queryClient as qc } from '@/shared/api/query-client.ts'

export function useDeleteTodo() {
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
