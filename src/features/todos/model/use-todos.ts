import type { TodoCategory } from './categories'
import { useQuery } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'

export function useTodos({ category }: { category: TodoCategory['value'] }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoService.getAll(),
    select: (todos) => {
      const active = todos.filter(todo => !todo.isCompleted)
      const completed = todos.filter(todo => todo.isCompleted)

      return {
        todos: category === 'completed' ? completed : active,
        counts: {
          active: active.length,
          completed: completed.length,
        },
      }
    },
  })

  return {
    todos: data?.todos,
    counts: data?.counts,
    error,
    isLoading,
  }
}
