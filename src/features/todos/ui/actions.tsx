import { MoreHorizontal, Trash2Icon } from 'lucide-react'

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
  isPending: boolean
  onDelete: (id: string) => void
}>

export function TodoActions({ todoId, isPending, onDelete }: TodoActionsProps) {
  return (
    <CardAction className="flex items-center gap-4 pl-1">
      <button
        type="button"
        className="text-gray-600 transition-colors hover:cursor-pointer hover:text-primary"
      >
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isPending}
            className="p-0 hover:text-primary"
          >
            {isPending
              ? (
                  <Trash2Icon className="animate-pulse text-destructive" />
                )
              : (
                  <MoreHorizontal className="text-gray-600" />
                )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="shadow-lg">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => onDelete(todoId)}
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
