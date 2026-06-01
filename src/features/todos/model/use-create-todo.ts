import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/query-client'
import { todoService } from '@/shared/api/todo-service'

export function useCreateTodo() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return {
    createTodo: (title: string) => mutateAsync({ title }),
    isPending,
  }
}
