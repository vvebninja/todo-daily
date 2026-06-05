import type { Todo } from '@/shared/api/todo-service.ts'
import { TodoActions } from '@/features/todos/ui/actions.tsx'
import { cn } from '@/shared/lib/css'
import { Card, CardHeader } from '@/shared/ui/kit/card'
import { Checkbox } from '@/shared/ui/kit/checkbox.tsx'
import { useDeleteTodo } from '../model/use-delete-todo'
import { useToggleTodo } from '../model/use-toggle-todo'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleCompleted } = useToggleTodo()
  const { deleteTodo, isDeleting } = useDeleteTodo()

  const handleCompletedChange = (isCompleted: boolean) => {
    toggleCompleted(todo.id, isCompleted)
  }

  const handleDeleteClick = () => {
    deleteTodo(todo.id)
  }

  return (
    <div className="relative flex items-center">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={handleCompletedChange}
        disabled={isDeleting}
        className={cn(
          'bg-primary-foreground dark:bg-card absolute z-10 h-6 w-6 translate-x-[-50%]',
          'shadow-primary/20 hover:border-primary rounded-full shadow-xs transition-colors',
          isDeleting && 'pointer-events-none',
        )}
      />
      <Card className="backdrop-filter-lg shadow-primary/20 dark:bg-card w-full rounded-md bg-white/40 pt-2 pb-4.5 pl-1 shadow-xs">
        <CardHeader>
          <div className={cn((todo.isCompleted || isDeleting) && 'opacity-50')}>
            {todo.title}
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
