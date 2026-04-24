import type { LucideIcon } from 'lucide-react'
import type { Todo } from '@/shared/api/todo-service'
import { cva } from 'class-variance-authority'
import { LayoutGrid, List } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/kit/button'
import { Skeletons } from '@/shared/ui/skeletons'
import { Typography } from '@/shared/ui/typography'
import { TodoCard } from './card'

const layoutToggleVariants = cva('grid grid-flow-row-dense', {
  variants: {
    variant: {
      list: 'grid gap-2.5',
      grid: 'grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-4.5',
    },
  },
})

const layouts = [
  { layout: 'grid', Icon: LayoutGrid },
  { layout: 'list', Icon: List },
] as const

type LayoutKey = (typeof layouts)[number]['layout']

type TodoListProps = Readonly<{
  items?: Todo[]
  isLoading?: boolean
  className?: string
}>

export function TodoList({ items, isLoading, className }: TodoListProps) {
  const [selectedLayout, setSelectedLayout] = useState<'list' | 'grid'>('grid')

  const listClassNames = cn(
    layoutToggleVariants({ variant: selectedLayout }),
    className,
  )

  if (isLoading) {
    return (
      <div className={listClassNames}>
        <Skeletons itemsCount={4} className="h-24" />
      </div>
    )
  }

  if (!items?.length) {
    return (
      <Typography color="muted" size="md" className="py-10 text-center">
        No todos yet
      </Typography>
    )
  }

  return (
    <div>
      <LayoutToggle
        layouts={layouts}
        selectedLayout={selectedLayout}
        onClick={setSelectedLayout}
        className="mb-2 max-md:hidden"
      />
      <ul className={listClassNames}>
        {items.map(todo => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}

type LayoutToggleProps = Readonly<{
  layouts: readonly { layout: LayoutKey, Icon: LucideIcon }[]
  selectedLayout: LayoutKey
  onClick: (layout: LayoutKey) => void
  className?: string
}>

function LayoutToggle({
  layouts,
  selectedLayout,
  onClick,
  className,
}: LayoutToggleProps) {
  return (
    <ul className={cn('flex justify-end gap-1', className)}>
      {layouts.map(({ layout, Icon }) => (
        <li key={layout} className="size-9">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onClick(layout)}
            className={cn(
              'size-8',
              selectedLayout === layout
                ? 'text-primary'
                : 'text-muted-foreground',
            )}
          >
            <Icon className="size-5" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
