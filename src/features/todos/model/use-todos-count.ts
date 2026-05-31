import { useTodosQuery } from '@/features/todos/model/use-todos-query.ts'

export function useTodosCount() {
  const { data } = useTodosQuery({
    select: todos => ({
      active: todos.filter(todo => !todo.isCompleted).length,
      completed: todos.filter(todo => todo.isCompleted).length,
    }),
  })

  return data
}
