import type { ApiSchemas } from '@/shared/api/schema'
import { cn } from '@/shared/lib/css'
import { Card, CardHeader } from '@/shared/ui/kit/card'
import { Checkbox } from '@/shared/ui/kit/checkbox'
import { Typography } from '@/shared/ui/typography'
import { useDeleteTodo } from '../model/use-delete-todo'
import { useToggleTodo } from '../model/use-toggle-todo'
import { TodoActions } from './actions'

type TodoItemProps = Readonly<{
  todo: ApiSchemas['Todo']
}>

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleCompleted } = useToggleTodo()
  const { deleteTodo, isDeleting } = useDeleteTodo()

  function handleCompletedChange(isCompleted: boolean) {
    toggleCompleted(todo.id, isCompleted)
  }

  function handleDeleteClick() {
    deleteTodo(todo.id)
  }

  return (
    <div className="relative flex items-center">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={handleCompletedChange}
        disabled={isDeleting}
        className="absolute z-10 h-6 w-6 -translate-x-[50%] rounded-full bg-white transition-colors hover:border-primary"
      />
      <Card className={cn('w-full rounded-sm pt-2 pb-4.5 pl-1')}>
        <CardHeader>
          <div className={cn(todo.isCompleted && 'opacity-50')}>
            <Typography as="h3" variant="h3" size="lg">
              {todo.title}
            </Typography>
            {todo.description && (
              <Typography as="p" size="md" color="muted">
                {todo.description}
              </Typography>
            )}
          </div>
          <TodoActions
            todoId={todo.id}
            isDeleting={isDeleting}
            onDelete={handleDeleteClick}
          />
        </CardHeader>
      </Card>
    </div>
  )
}
