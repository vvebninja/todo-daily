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
            className={cn(isDeleting && 'pointer-events-none')}
          >
            {isDeleting
              ? (
                  <Trash2Icon className="text-destructive size-6 animate-bounce stroke-[1.5px]" />
                )
              : (
                  <MoreHorizontal className="size-6 text-gray-600 transition-colors" />
                )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="shadow-xl">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-primary focus:text-primary h-10 w-35"
            >
              <Trash2Icon className="text-primary stroke-[1.5px]" />
              <Typography as="span" color="primary">
                Delete
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  )
}
