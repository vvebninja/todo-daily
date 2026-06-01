import type { TodoFilterText } from '@/features/todos/model/filters.ts'
import { useState } from 'react'

export function useSelectedTodoFilter(initialFilter: TodoFilterText) {
  const [selectedFilter, setSelectedFilter]
    = useState<TodoFilterText>(initialFilter)

  return {
    selectedFilter,
    setSelectedFilter: (filter: TodoFilterText) => setSelectedFilter(filter),
  }
}
