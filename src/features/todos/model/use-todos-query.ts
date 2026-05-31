import type { Todo } from '@/shared/api/todo-service'
import { useQuery } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'

interface UseTodosQueryOptions<TData = Todo[]> {
  select?: (data: Todo[]) => TData
}

export function useTodosQuery<TData = Todo[]>({
  select,
}: UseTodosQueryOptions<TData> = {}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoService.getAll(),
    select,
  })

  return { data, isLoading, error }
}
