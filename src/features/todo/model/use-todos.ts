import type { Todo } from '@/shared/api/todo-service'
import { useQuery } from '@tanstack/react-query'
import { todoService } from '@/shared/api/todo-service'

interface UseTodosQueryOptions<TData = Todo[]> {
  select?: (todos: Todo[]) => TData
}

export const TODOS_QUERY_KEY = 'todos'

export function useTodos<TData = Todo[]>({
  select,
}: UseTodosQueryOptions<TData> = {}) {
  return useQuery({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: todoService.getAll,
    select,
  })
}
