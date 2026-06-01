import { useTodos } from '@/features/todos/model/use-todos.ts'

export function useTodosCount() {
  const { data } = useTodos({
    select: todos => ({
      active: todos.filter(todo => !todo.isCompleted).length,
      completed: todos.filter(todo => todo.isCompleted).length,
    }),
  })

  return data
}
