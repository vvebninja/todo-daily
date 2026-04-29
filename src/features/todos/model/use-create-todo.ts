// features/todos/model/use-create-todo.ts
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryClient } from '@/shared/api/query-client'
import { todoService } from '@/shared/api/todo-service'

export function useCreateTodo() {
  const mutation = useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleCreate = async (data: { title: string }) => {
    const promise = mutation.mutateAsync(data)

    toast.promise(promise, {
      loading: 'Creating todo... ⏳',
      success: 'Todo created! 🎉',
      error: err => err?.message || 'Error creating todo ❌',
    })

    return promise
  }

  return {
    createTodo: handleCreate,
    isPending: mutation.isPending,
  }
}
