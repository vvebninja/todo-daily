import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/kit/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import { MoreHorizontal, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
import { useTodos } from "./use-todos";
import { useToggleTodoCompleted } from "./use-toggle-todo-completed";

function TodosPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { todos, isLoading, error } = useTodos();
  const { createTodo, isPending: isPendingCreate } = useCreateTodo();
  const { deleteTodo } = useDeleteTodo();
  const { toggleCompleted } = useToggleTodoCompleted();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const todo = new FormData(e.target);
    const title = todo.get("title");
    const description = todo.get("description");

    if (!title && !description) return;

    createTodo({ title, description });
    e.currentTarget.reset();
  }

  if (isLoading) {
    return (
      <div className="text-primary text-2xl font-normal italic">
        Loading todos...
      </div>
    );
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="px-4 pt-5 lg:pt-9 lg:pl-10">
      <h1 className="text-primary mb-2 text-3xl font-bold lg:mb-6 lg:text-5xl">
        Today
      </h1>
      <p className="mb-4 text-lg text-gray-500 lg:mb-7 lg:text-2xl">
        completed 4/6
      </p>

      <div className="mb-2">
        <Dialog>
          <DialogTrigger>
            <Button
              variant="secondary"
              className="text-primary hover:text-accent-foreground mb-2 px-0 text-lg md:text-2xl"
            >
              + Add todo
            </Button>
          </DialogTrigger>
          <DialogContent className="pt-12">
            <form onSubmit={handleSubmit} className="w-full max-w-250">
              <div className="mb-4">
                <Input
                  type="text"
                  name="title"
                  placeholder="title"
                  required
                  autoFocus={isFormVisible}
                  className="h-12 text-3xl font-normal rounded-b-none border-b-0"
                />
                <Textarea
                  name="description"
                  placeholder="description"
                  className="rounded-t-none p-3 text-lg font-normal"
                />
              </div>
              <div className="grid max-w-60 grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  disabled={isPendingCreate}
                  onClick={() => setIsFormVisible(false)}
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

      <ul className={cn("grid gap-2.5", isFormVisible && "opacity-50")}>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <div className="flex items-center gap-2 max-md:relative max-md:pl-3 md:gap-2">
              <Checkbox
                checked={todo.isCompleted}
                onCheckedChange={(checked) =>
                  toggleCompleted(todo.id, Boolean(checked))
                }
                className={cn(
                  "h-6 w-6 rounded-full bg-white max-md:absolute max-md:-translate-x-[50%]",
                  todo.isCompleted && "opacity-50",
                )}
              />
              <Card
                className={cn(
                  "w-full max-w-250 pt-2 pb-4.5",
                  todo.isCompleted && "opacity-50",
                )}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-normal md:text-2xl">
                    {todo.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-normal md:text-[22px]">
                    {todo.description}
                  </CardDescription>
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
