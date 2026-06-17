import { MoreHorizontal, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
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
import { useDeleteTodo } from '../model/use-delete-todo'

interface TodoActionsProps {
  todoId: string
}

export function TodoActions({ todoId }: TodoActionsProps) {
  const [isInteractive, setIsInteractive] = useState(false)
  const deleteTodo = useDeleteTodo()

  const handleDelete = () => deleteTodo.mutate(todoId)

  if (!isInteractive) {
    return (
      <CardAction className="flex items-center gap-4 pl-1">
        <Button
          size="icon"
          type="button"
          variant="ghost"
          onMouseEnter={() => setIsInteractive(true)}
          onFocusCapture={() => setIsInteractive(true)}
        >
          <MoreHorizontal className="size-6 text-gray-600 transition-colors" />
        </Button>
      </CardAction>
    )
  }

  return (
    <CardAction>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            type="button"
            variant="ghost"
            className={cn(deleteTodo.isPending && 'pointer-events-none')}
          >
            {deleteTodo.isPending
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
