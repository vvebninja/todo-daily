import type { TodoStatus } from '@/shared/api/todo-service'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/kit/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu'
import { useClearTodos } from '../model/use-clear-todos'
import { useDeleteTodosByStatus } from '../model/use-delete-todos-by-status'
import { useTodoStatusCounts } from '../model/use-todo-status-counts'

export default function TodosDeleteDropdown() {
  const deleteTodosByStatus = useDeleteTodosByStatus()
  const clearTodos = useClearTodos()
  const counts = useTodoStatusCounts()

  const hasActiveTodos = !!counts.data?.active
  const hasCompletedTodos = !!counts.data?.completed
  const hasAny = hasActiveTodos || hasCompletedTodos

  const handleDeleteTodosByStatus = (status: TodoStatus) => () => {
    toast.promise(deleteTodosByStatus.mutateAsync(status), {
      loading: `Deleting ${status} todos...`,
      success: `${status.charAt(0).toUpperCase() + status.slice(1)} todos deleted`,
      error: err => `Failed to delete ${status} todos: ${err}`,
    })
  }

  const handleClearTodos = () => {
    toast.promise(clearTodos.mutateAsync(), {
      loading: 'Deleting all todos...',
      success: 'All todos deleted',
      error: err => `Failed to delete all todos: ${err}`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open delete options menu"
          className="text-muted-foreground data-[state=open]:text-primary hover:text-primary focus-visible:text-primary"
        >
          <Trash2Icon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={-8}
        alignOffset={23}
        className="border-primary/20"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={!hasAny} onSelect={handleClearTodos}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!hasActiveTodos}
            onSelect={handleDeleteTodosByStatus('active')}
          >
            Active
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!hasCompletedTodos}
            onSelect={handleDeleteTodosByStatus('completed')}
          >
            Completed
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
