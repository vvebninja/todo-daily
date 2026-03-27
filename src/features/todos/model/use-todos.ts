import type { TodoCategory } from './categories'
import { rqClient } from '@/shared/api/instance.ts'

export function useTodos({ category }: { category: TodoCategory['value'] }) {
  const { data, error, isLoading } = rqClient.useQuery(
    'get',
    '/todos',
    {},
    {
      select: (todos) => {
        const active = todos.filter(todo => !todo.isCompleted)
        const completed = todos.filter(todo => todo.isCompleted)

        return {
          todos: category === 'completed' ? completed : active,
        }
      },
    },
  )

  return {
    todos: data?.todos,
    completedCount: data?.todos.length,
    error,
    isLoading,
  }
}
