import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/shared/ui/kit/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
import { useTodos } from "./use-todos";
import { useToggleTodoCompleted } from "./use-toggle-todo-completed";
import { Field } from "@/shared/ui/kit/field";

function TodosPage() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { todos, isLoading, error } = useTodos();
  const { createTodo, isPending: isPendingCreate } = useCreateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { toggleCompleted } = useToggleTodoCompleted();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const todo = new FormData(e.target);
    const title = String(todo.get("title"));
    const description = String(todo.get("description"));

    if (!title && !description) return;

    createTodo({ title, description });
    console.log({ title, description });

    e.currentTarget.reset();
  }

  if (isLoading) {
    return <div className="text-primary text-2xl font-normal italic">Loading todos...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="px-4 pt-5 lg:pt-9 lg:pl-10">
      <h1 className="text-primary mb-2 text-3xl font-bold lg:mb-6 lg:text-5xl">Today</h1>
      <p className="mb-4 text-lg text-gray-500 lg:mb-7 lg:text-2xl">completed 4/6</p>

      <div className="mb-2">
        <Dialog open={isDialogVisible} onOpenChange={() => setIsDialogVisible(!isDialogVisible)}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="text-primary hover:text-accent-foreground mb-2 px-0 text-lg md:text-2xl"
            >
              + Add todo
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="w-full">
            <DialogHeader className="font-secondary text-primary flex-row items-center justify-center gap-3 text-center text-2xl font-normal">
              Add todo <EditIcon />
            </DialogHeader>
            <form onSubmit={handleSubmit} className="w-full max-w-250">
              <div className="mb-4 border border-gray-300 rounded-sm overflow-hidden">
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  autoFocus={isDialogVisible}
                  className="h-12 border-0 rounded-none focus-visible:ring-0 focus-visible:bg-muted/70 md:text-lg"
                />
                <Textarea
                  name="description"
                  placeholder="Description"
                  className="text-lg border-0 rounded-none focus-visible:ring-0 focus-visible:bg-muted/70 md:text-lg"
                />
              </div>
              <div className="grid gap-1 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPendingCreate}
                  onClick={() => setIsDialogVisible(false)}
                  className="border-primary text-primary focus:text-primaty hover:text-primary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPendingCreate}
                  className="text-primary-foreground bg-primary text-[16px]"
                >
                  {isPendingCreate ? "Adding.." : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ul className={cn("grid gap-2.5", isDialogVisible && "opacity-50")}>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <div className="flex items-center gap-2 max-md:relative max-md:pl-3 md:gap-2">
              <Checkbox
                checked={todo.isCompleted}
                onCheckedChange={(checked) => toggleCompleted(todo.id, Boolean(checked))}
                className={cn(
                  "h-6 w-6 rounded-full bg-white max-md:absolute max-md:-translate-x-[50%]",
                  todo.isCompleted && "opacity-50",
                )}
              />
              <Card
                className={cn("w-full max-w-250 pt-2 pb-4.5", todo.isCompleted && "opacity-50")}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-normal md:text-2xl">{todo.title}</CardTitle>
                  {todo.description && (
                    <CardDescription className="text-lg font-normal md:text-[22px]">
                      {todo.description}
                    </CardDescription>
                  )}
                  <CardAction className="pl-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => deleteTodo(todo.id)}
                            className="text-primary focus:text-primary"
                          >
                            <Trash2Icon className="text-primary stroke-[1.5px]" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardAction>
                </CardHeader>
              </Card>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Component = TodosPage;
