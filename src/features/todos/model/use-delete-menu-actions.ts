import type { TodoStatus } from '@/shared/api/todo-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { todoService } from '@/shared/api/todo-service'

export function useDeleteMenuActions() {
  const queryClient = useQueryClient()

  const invalidateTodos = () =>
    queryClient.invalidateQueries({ queryKey: ['todos'] })

  const deleteByStatusMutation = useMutation({
    mutationFn: todoService.deleteByStatus,
    onSuccess: invalidateTodos,
  })

  const deleteAllMutation = useMutation({
    mutationFn: todoService.deleteAll,
    onSuccess: invalidateTodos,
  })

  const deleteAll = () => {
    toast.promise(deleteAllMutation.mutateAsync(), {
      loading: 'Deleting all todos...',
      success: 'All todos deleted successfully',
      error: err => `Failed to delete all todos: ${err}`,
    })
  }

  const deleteByStatus = (status: TodoStatus) => {
    toast.promise(deleteByStatusMutation.mutateAsync(status), {
      loading: `Deleting ${status} todos...`,
      success: `${status.charAt(0).toUpperCase() + status.slice(1)} todos deleted successfully`,
    })
  }

  return {
    deleteByStatus,
    deleteAll,
    isDeleting: deleteAllMutation.isPending || deleteByStatusMutation.isPending,
  }
}
