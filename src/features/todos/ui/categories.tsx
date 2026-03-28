import type { TodoCategory } from '../model/categories'
import { cn } from '@/shared/lib/css'
import { Skeletons } from '@/shared/ui/skeletons'
import { Typography } from '@/shared/ui/typography'

type TodosCategoriesProps = Readonly<{
  categories: readonly TodoCategory[]
  onCategoryClick: (category: Omit<TodoCategory, 'icon'>) => void
  selectedCategory: TodoCategory
  counts: any
  isLoading?: boolean
  className?: string
}>

export function TodoCategories({
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

type Props = Readonly<{
  category: TodoCategory
  isSelected: boolean
  count: any
  onClick: (category: Omit<TodoCategory, 'icon'>) => void
}>

function CategoryBtn({ category, isSelected, count, onClick }: Props) {
  const { value, title, icon } = category
  const Icon = icon

  return (
    <button
      onClick={() => onClick({ value, title })}
      className={cn(
        'flex items-center gap-2 py-1 text-muted-foreground hover:text-primary focus-visible:text-primary',
        isSelected && 'text-primary',
      )}
    >
      <Icon size={28} />
      <Typography as="span" size="md" color="inherit" className="flex gap-1">
        {title}
      </Typography>
      <Typography
        as="span"
        variant="p"
        size="md"
        font="secondary"
        color="inherit"
      >
        {count}
      </Typography>
    </button>
  )
}
