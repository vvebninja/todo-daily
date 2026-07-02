import type { TodoFilter } from '@/features/todo/model/filters'
import { cn } from '@/shared/lib/css.ts'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Typography } from '@/shared/ui/typography.tsx'
import { useTodoStatusCounts } from '../model/use-todo-status-counts'

interface FilterButtonProps {
  filter: TodoFilter
  isSelected: boolean
  onClick: (filter: TodoFilter['value']) => void
}

export function FilterButton({
  filter: { title, value },
  isSelected,
  onClick,
}: FilterButtonProps) {
  const counts = useTodoStatusCounts()
  const count = counts.data?.[value]

  return (
    <Button
      onClick={() => onClick(value)}
      variant="ghost"
      className={cn(
        'text-muted-foreground hover:text-primary focus-visible:text-primary flex items-center gap-2 py-1',
        'text-shadow-2xs',
        isSelected && 'text-primary',
      )}
    >
      <Typography as="span" size="md" color="inherit" className="flex gap-1">
        {title}
      </Typography>
      <Typography as="span" size="md" color="inherit">
        {count}
      </Typography>
    </Button>
  )
}
