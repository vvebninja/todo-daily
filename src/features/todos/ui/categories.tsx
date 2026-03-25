import type { TodoCategory } from '../todos.page'
import { cn } from '@/shared/lib/css'
import { Typography } from '@/shared/ui/typography'
import { todoCategories } from '../model/categories'

interface TodosCategoriesProps {
  onCategoryClick: (category: TodoCategory) => void
  selectedCategory: TodoCategory
  className?: string
}

export function TodosCategories({
  selectedCategory,
  onCategoryClick,
  className,
}: TodosCategoriesProps) {
  return (
    <ul className={cn('flex justify-between', className)}>
      {todoCategories.map((category) => {
        const Icon = category.icon
        return (
          <li key={category.value}>
            <button
              onClick={() => onCategoryClick(category)}
              className={cn(
                'flex items-center gap-2 py-1 text-muted-foreground hover:text-primary focus-visible:text-primary',
                selectedCategory.value === category.value && 'text-primary',
              )}
            >
              <Icon size={28} />
              <Typography size="md" color="inherit">
                {category.title}
              </Typography>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
