import { cn } from "@/shared/lib/css";
import { CardAction } from "@/shared/ui/kit/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { MoreHorizontal, SquarePen, Trash2Icon } from "lucide-react";

export function TodoActions({
  todoId,
  isPending,
  onDelete,
}: {
  todoId: string;
  isPending: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <CardAction className="flex items-center gap-4 pl-1">
      <button
        type="button"
        className="hover:text-primary text-gray-600 transition-colors hover:cursor-pointer"
      >
        <SquarePen className={cn("stroke-[1.5px]")} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="hover:text-primary p-0">
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
              <Trash2Icon className="text-primary stroke-[1.5px]" /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  );
}
