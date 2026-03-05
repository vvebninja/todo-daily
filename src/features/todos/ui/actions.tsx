import { CardAction } from "@/shared/ui/kit/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Typography } from "@/shared/ui/typography";
import { MoreHorizontal, Trash2Icon } from "lucide-react";

type TodoActionsProps = Readonly<{
  todoId: string;
  isPending: boolean;
  onDelete: (id: string) => void;
}>;

export function TodoActions({ todoId, isPending, onDelete }: TodoActionsProps) {
  return (
    <CardAction className="flex items-center gap-4 pl-1">
      <button
        type="button"
        className="hover:text-primary text-gray-600 transition-colors hover:cursor-pointer"
      ></button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" disabled={isPending} className="hover:text-primary p-0">
            {isPending ? (
              <Trash2Icon className="text-destructive animate-pulse" />
            ) : (
              <MoreHorizontal className="text-gray-600" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="shadow-lg">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => onDelete(todoId)}
              className="text-primary focus:text-primary h-10 w-35"
            >
              <Trash2Icon className="text-primary stroke-[1.5px]" />
              <Typography as="span" variant="p" color="primary">
                Delete
              </Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  );
}
