import type { TodoCategory } from './categories'
import { rqClient } from '@/shared/api/instance.ts'

rqClient.queryOptions('get', '/todos')

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
          counts: {
            active: active.length,
            completed: completed.length,
          },
        }
      },
    },
  )

  return {
    todos: data?.todos,
    counts: data?.counts,
    error,
    isLoading,
  }
}
