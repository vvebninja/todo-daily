import type { Todo } from '@/shared/api/todo-service'
import { useMutation } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'
import { TODOS_QUERY_KEY } from './use-todos'

export function useToggleTodo() {
  return useMutation({
    mutationFn: todoService.toggleComplete,
    onMutate: async ({ id, isCompleted }, context) => {
      await context.client.cancelQueries({ queryKey: [TODOS_QUERY_KEY] })

      const previousTodos = context.client.getQueryData<Todo[]>([
        TODOS_QUERY_KEY,
      ])
      context.client.setQueryData([TODOS_QUERY_KEY], (oldTodos: Todo[]) => {
        return oldTodos?.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isCompleted }
          }
          return todo
        })
      })
      return { previousTodos }
    },
    onError: (_error, _vars, onMutateResult, context) => {
      context.client.setQueryData<Todo[]>(
        [TODOS_QUERY_KEY],
        onMutateResult?.previousTodos,
      )
    },
    onSettled: (_data, _error, _vars, _onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] }),
  })
}
