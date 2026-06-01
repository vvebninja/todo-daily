import type {
  TodoFilter,
  TodoFilterText,
} from '@/features/todos/model/filters.ts'
import { cn } from '@/shared/lib/css.ts'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Typography } from '@/shared/ui/typography.tsx'

interface FilterButtonProps {
  filter: TodoFilter
  count?: number
  isSelected: boolean
  onClick: (filter: TodoFilterText) => void
}

export function FilterButton({
  filter: { title, value, icon: Icon },
  count,
  isSelected,
  onClick,
}: FilterButtonProps) {
  return (
    <Button
      onClick={() => onClick({ title, value })}
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
      {count && (
        <Typography as="span" size="md" font="secondary" color="inherit">
          {count}
        </Typography>
      )}
    </Button>
  )
}
