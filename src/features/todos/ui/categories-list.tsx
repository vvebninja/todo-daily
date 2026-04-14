import type { TodoCategory } from '../model/categories'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/kit/button'
import { Skeletons } from '@/shared/ui/skeletons'
import { Typography } from '@/shared/ui/typography'

type TodoCategoryText = Omit<TodoCategory, 'icon'>

type TodosCategoriesProps = Readonly<{
  categories: readonly TodoCategory[]
  onCategoryClick: (category: TodoCategoryText) => void
  selectedCategory: TodoCategoryText
  counts: any
  isLoading?: boolean
  className?: string
}>

export function TodoCategoriesList({
  categories,
  selectedCategory,
  onCategoryClick,
  counts,
  isLoading,
  className,
}: TodosCategoriesProps) {
  return (
    <ul className={cn('flex justify-between', className)}>
      {categories.map((category) => {
        return (
          <li key={category.value}>
            {isLoading
              ? (
                  <Skeletons className="h-9 w-35 md:w-45" />
                )
              : (
                  <CategoryBtn
                    category={category}
                    count={counts?.[category.value]}
                    isSelected={selectedCategory.value === category.value}
                    onClick={onCategoryClick}
                  />
                )}
          </li>
        )
      })}
    </ul>
  )
}

type CategoryBtnProps = Readonly<{
  category: TodoCategory
  isSelected: boolean
  count: any
  onClick: (category: TodoCategoryText) => void
}>

function CategoryBtn({
  category,
  isSelected,
  count,
  onClick,
}: CategoryBtnProps) {
  const { value, title, icon } = category
  const Icon = icon

  return (
    <Button
      onClick={() => onClick({ value, title })}
      variant="ghost"
      className={cn(
        'text-muted-foreground hover:text-primary focus-visible:text-primary flex items-center gap-2 py-1',
        'text-shadow-2xs',
        isSelected && 'text-primary',
      )}
    >
      <Icon className="size-6" />
      <Typography as="span" size="md" color="inherit" className="flex gap-1">
        {title}
      </Typography>
      <Typography as="span" size="md" font="secondary" color="inherit">
        {count}
      </Typography>
    </Button>
  )
}
