import type { Todo } from '@/shared/api/todo-service.ts'
import { TodoActions } from '@/features/todo/ui/actions'
import { Card, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import { Checkbox } from '@/shared/ui/kit/checkbox.tsx'
import { useToggleTodo } from '../model/use-toggle-todo'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleCompleted = useToggleTodo()

  const handleCompletedChange = (isCompleted: boolean) => {
    toggleCompleted.mutate({ id: todo.id, isCompleted })
  }

  return (
    <div className="relative flex items-center">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={handleCompletedChange}
        className="bg-primary-foreground dark:bg-card shadow-primary/20 hover:border-primary absolute z-10 h-6 w-6 translate-x-[-50%] rounded-full shadow-xs transition-colors"
      />
      <Card className="backdrop-filter-lg shadow-primary/20 dark:bg-card w-full rounded-md bg-white/40 pt-2 pb-4.5 pl-1 shadow-xs">
        <CardHeader>
          <CardTitle>{todo.title}</CardTitle>
          <TodoActions todoId={todo.id} />
        </CardHeader>
      </Card>
    </div>
  )
}
