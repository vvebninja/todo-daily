import { Trash2Icon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu'
import { useDeleteMenuActions } from '../model/use-delete-menu-actions'
import { useTodosCount } from '../model/use-todos-count'

export default function DeleteActionsMenu() {
  const { deleteByStatus, deleteAll } = useDeleteMenuActions()
  const counts = useTodosCount()

  const hasActiveTodos = !!counts?.active
  const hasCompletedTodos = !!counts?.completed
  const hasAny = hasActiveTodos || hasCompletedTodos

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
        className="border-primary/30"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={!hasAny} onSelect={() => deleteAll()}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!hasActiveTodos}
            onSelect={() => deleteByStatus('active')}
          >
            Active
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!hasCompletedTodos}
            onSelect={() => deleteByStatus('completed')}
          >
            Completed
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
