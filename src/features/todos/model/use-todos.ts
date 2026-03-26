import type { TodoCategory } from './categories'
import { rqClient } from '@/shared/api/instance.ts'

export function useTodos({ category }: { category: TodoCategory['value'] }) {
  const { data, error, isLoading } = rqClient.useQuery('get', '/todos')

  const completedCount = data?.filter(todo => todo.isCompleted).length

  const todosByCategory = {
    all: data?.filter(todo => !todo.isCompleted),
    completed: data?.filter(todo => todo.isCompleted),
  }

  return {
    todos: todosByCategory[category] ?? todosByCategory.all,
    completedCount,
    error,
    isLoading,
  }
}
