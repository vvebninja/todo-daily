import type { ApiSchemas } from '@/shared/api/schema'
import { cn } from '@/shared/lib/css'
import { Card, CardHeader } from '@/shared/ui/kit/card'
import { Checkbox } from '@/shared/ui/kit/checkbox'

import { Typography } from '@/shared/ui/typography'
import { TodoActions } from './actions'

type TodoItemProps = Readonly<{
  todo: ApiSchemas['Todo']
  isDeleting: boolean
  onDelete: (id: string) => void
  toggleCompleted: (id: string, completed: boolean) => void
}>

export function TodoItem({
  todo,
  isDeleting,
  onDelete,
  toggleCompleted,
}: TodoItemProps) {
  function handleCompletedChange(isCompleted: boolean) {
    toggleCompleted(todo.id, isCompleted)
  }

  return (
    <div className="relative flex items-center pl-3">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={handleCompletedChange}
        disabled={isDeleting}
        className={cn(
          'absolute z-1 h-6 w-6 -translate-x-[50%] rounded-full bg-white transition-colors hover:border-primary',
          todo.isCompleted && 'opacity-50',
          isDeleting && 'bg-muted opacity-50',
        )}
      />
      <Card
        className={cn(
          'w-full rounded-sm pt-2 pb-4.5',
          todo.isCompleted && 'bg-muted opacity-50',
          isDeleting && 'animate-pulse bg-muted opacity-50',
        )}
      >
        <CardHeader>
          <Typography as="h3" variant="h3" size="lg">
            {todo.title}
          </Typography>
          {todo.description && (
            <Typography as="p" size="md" color="muted">
              {todo.description}
            </Typography>
          )}
          <TodoActions
            todoId={todo.id}
            isDeleting={isDeleting}
            onDelete={onDelete}
          />
        </CardHeader>
      </Card>
    </div>
  )
}
