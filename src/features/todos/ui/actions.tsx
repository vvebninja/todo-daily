import { MoreHorizontal, Trash2Icon } from 'lucide-react'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/kit/button.tsx'
import { CardAction } from '@/shared/ui/kit/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu'
import { Typography } from '@/shared/ui/typography'

type TodoActionsProps = Readonly<{
  todoId: string
  isDeleting: boolean
  onDelete: (id: string) => void
}>

export function TodoActions({
  todoId,
  isDeleting,
  onDelete,
}: TodoActionsProps) {
  function handleDelete() {
    onDelete(todoId)
  }

  return (
    <CardAction className="flex items-center gap-4 pl-1">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            type="button"
            variant="ghost"
            className={cn('h-7', isDeleting && 'pointer-events-none')}
          >
            {isDeleting
              ? (
                  <Trash2Icon
                    size={20}
                    className="animate-bounce stroke-[1.5px] text-destructive"
                  />
                )
              : (
                  <MoreHorizontal className="text-gray-600 transition-colors" />
                )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="shadow-lg">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleDelete}
              className="h-10 w-35 text-primary focus:text-primary"
            >
              <Trash2Icon className="stroke-[1.5px] text-primary" />
              <Typography as="span" variant="p" color="primary">
                Delete
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  )
}
