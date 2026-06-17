import type { TodoFilter } from './filters'
import { useState } from 'react'

export function useSelectedTodoFilter(initialFilter: TodoFilter['value']) {
  const [selectedFilter, setSelectedFilter]
    = useState<TodoFilter['value']>(initialFilter)

  return {
    selectedFilter,
    setSelectedFilter: (filter: TodoFilter['value']) =>
      setSelectedFilter(filter),
  }
}
