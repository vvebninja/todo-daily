import type { TodoFilterText } from '@/features/todos/model/filters.ts'
import { todoFilters } from '@/features/todos/model/filters.ts'
import { useTodosCount } from '@/features/todos/model/use-todos-count.ts'
import { FilterButton } from '@/features/todos/ui/filter-button.tsx'
import { cn } from '@/shared/lib/css'

interface TodosCategoriesProps {
  selectedFilter: TodoFilterText
  onFilterClick: (filter: TodoFilterText) => void
  className?: string
}

export function TodoFilterList({
  selectedFilter,
  onFilterClick,
  className,
}: TodosCategoriesProps) {
  const counts = useTodosCount()

  return (
    <ul className={cn('flex justify-between', className)}>
      {todoFilters.map((filter) => {
        return (
          <li key={filter.value}>
            <FilterButton
              filter={filter}
              count={counts?.[filter.value]}
              isSelected={filter.value === selectedFilter.value}
              onClick={onFilterClick}
            />
          </li>
        )
      })}
    </ul>
  )
}
