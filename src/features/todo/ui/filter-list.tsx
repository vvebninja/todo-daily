import type { TodoFilter } from '@/features/todo/model/filters'
import { todoFilters } from '@/features/todo/model/filters'
import { FilterButton } from '@/features/todo/ui/filter-button'
import { cn } from '@/shared/lib/css'

interface TodosCategoriesProps {
  selectedFilter: TodoFilter['value']
  onFilterClick: (filter: TodoFilter['value']) => void
  className?: string
}

export function TodoFilterList({
  selectedFilter,
  onFilterClick,
  className,
}: TodosCategoriesProps) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {todoFilters.map((filter) => {
        return (
          <li key={filter.value}>
            <FilterButton
              filter={filter}
              isSelected={filter.value === selectedFilter}
              onClick={onFilterClick}
            />
          </li>
        )
      })}
    </ul>
  )
}
