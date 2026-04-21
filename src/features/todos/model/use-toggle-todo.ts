import type { Todo } from '@/shared/api/todo-service'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/query-client'
import { todoService } from '@/shared/api/todo-service'

const TODOS_QUERY_KEY = ['todos']

export function useToggleTodo() {
  const mutation = useMutation({
    mutationFn: todoService.toggleComplete,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY })

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, oldTodos =>
        oldTodos?.map(todo =>
          todo.id === variables.id
            ? { ...todo, isCompleted: variables.isCompleted }
            : todo,
        ))

      return { previousTodos }
    },
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, context.previousTodos)
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY }),
  })

  return {
    toggleCompleted: (id: string, isCompleted: boolean) => {
      mutation.mutate({ id, isCompleted })
    },
  }
}
