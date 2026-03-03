import type { ApiSchemas } from "@/shared/api/schema";
import { cn } from "@/shared/lib/css";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Typography } from "@/shared/ui/typography";
import { TodoActions } from "./todo-actions";

export function TodoItem({
  todo,
  isPending,
  onDelete,
  toggleCompleted,
}: {
  todo: ApiSchemas["Todo"];
  isPending: boolean;
  onDelete: (id: string) => void;
  toggleCompleted: (id: string, completed: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 max-md:relative max-md:pl-3 md:gap-2">
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={checked => toggleCompleted(todo.id, Boolean(checked))}
        className={cn(
          "h-6 w-6 rounded-full bg-white max-md:absolute max-md:-translate-x-[50%]",
          todo.isCompleted && "opacity-50"
        )}
      />
      <Card
        className={cn(
          "w-full max-w-250 pt-2 pb-4.5",
          todo.isCompleted && "bg-muted opacity-50",
          isPending && "bg-muted animate-pulse opacity-50"
        )}
      >
        <CardHeader>
          <CardTitle>
            <Typography as="span" variant="h2" size="lg">
              {todo.title}
            </Typography>
          </CardTitle>
          {todo.description && (
            <CardDescription>
              <Typography color="muted">{todo.description}</Typography>
            </CardDescription>
          )}
          <TodoActions todoId={todo.id} isPending={isPending} onDelete={onDelete} />
        </CardHeader>
      </Card>
    </div>
  );
}
