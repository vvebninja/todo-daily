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
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import { CirclePlus, EditIcon, MoreHorizontal, SquarePen, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
import { useTodos } from "./use-todos";
import { useToggleTodo } from "./use-toggle-todo";
import { Spinner } from "@/shared/ui/kit/spinner";
import type { ApiSchemas } from "@/shared/api/schema";

function TodosPage() {
  const todos = useTodos();
  const [isAddTodoDialogOpen, setIsAddTodoDialogOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [todoId, setTodoId] = useState<string | null>(null);
  const [todoTitle, setTodoTitle] = useState("");

  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleCompleted } = useToggleTodo();

  const checkedTodos = todos.data?.filter(todo => todo.isCompleted).length;
  const totalTodos = todos.data?.length;

  function handleAddTodoDialogChange(open: boolean) {
    setIsAddTodoDialogOpen(open);
    if (!open && createTodo.fieldError) createTodo.clearError();
  }

  function closeAddTodoDialog() {
    setIsAddTodoDialogOpen(false);
  }

  function handleToggleModifiable(todo: ApiSchemas["Todo"]) {
    return () => {
      if (todoId === todo.id) {
        setIsEditable(!isEditable);
        return;
      }
      setTodoId(todo.id);
      setIsEditable(true);
    };
  }

  if (todos.isLoading) {
    return <div className="text-primary text-2xl font-normal italic">Loading todos...</div>;
  }

  if (todos.error) {
    return <div>{JSON.stringify(todos.error.message)}</div>;
  }

  return (
    <div className="px-4 pt-5 lg:pt-9 lg:pl-10">
      <h1 className="text-primary mb-2 text-3xl font-bold lg:mb-6 lg:text-5xl">Today</h1>
      <p className="mb-4 text-lg text-gray-500 lg:mb-7 lg:text-2xl">
        completed {checkedTodos}/{totalTodos}
      </p>

      <div className="mb-2">
        <Dialog open={isAddTodoDialogOpen} onOpenChange={handleAddTodoDialogChange}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="text-primary hover:text-accent-foreground mb-6 flex items-center gap-3 p-0 px-0 text-lg md:text-2xl"
            >
              <CirclePlus size={24} /> Add todo
            </button>
          </DialogTrigger>

          <DialogContent showCloseButton={false} className="w-full pt-3 md:top-[43%]">
            <DialogHeader className="font-secondary text-primary flex-row items-center justify-center gap-3 text-center text-2xl font-normal">
              Add todo <EditIcon />
            </DialogHeader>
            <form onSubmit={createTodo.handleSubmit} className="w-full max-w-250">
              <div className="mb-4 overflow-hidden rounded-sm border border-gray-300">
                <Field data-invalid={!!createTodo.fieldError} className="relative">
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    aria-invalid
                    autoFocus={isAddTodoDialogOpen}
                    className={cn(
                      "focus-visible:bg-primary/10 h-12 rounded-none border-0 focus-visible:ring-0 md:text-lg",
                      createTodo.fieldError && "placeholder:text-destructive"
                    )}
                    onChange={createTodo.clearError}
                  />
                  {createTodo.fieldError && (
                    <FieldError
                      errors={[{ message: createTodo.fieldError }]}
                      className="pointer-events-none absolute inset-y-0 right-2 inline-flex items-center justify-end text-end text-shadow-md"
                    />
                  )}
                </Field>
                <Field data-invalid={!!createTodo.fieldError} className="relative">
                  <Textarea
                    name="description"
                    rows={3}
                    placeholder="Description"
                    onChange={createTodo.clearError}
                    className={cn(
                      "focus-visible:bg-primary/10 rounded-none border-0 text-lg focus-visible:ring-0 md:text-lg",
                      createTodo.fieldError && "placeholder:text-destructive"
                    )}
                  />
                  {createTodo.fieldError && (
                    <FieldError
                      errors={[{ message: createTodo.fieldError }]}
                      className="pointer-events-none absolute right-2 inline-flex items-center justify-end pt-3 text-end text-shadow-md"
                    />
                  )}
                </Field>
              </div>
              <div className="grid gap-1 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAddTodoDialog}
                  className="border-primary text-primary focus:text-primary hover:text-primary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createTodo.isPending}
                  className="text-primary-foreground bg-primary text-[16px] disabled:opacity-30"
                >
                  {createTodo.isPending && <Spinner />} Add
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ul className={cn("grid gap-2.5", isAddTodoDialogOpen && "opacity-50")}>
        {todos.data?.map(todo => (
          <li key={todo.id}>
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
                  deleteTodo.getIsPending(todo.id) && "bg-muted animate-pulse opacity-50"
                )}
              >
                <CardHeader>
                  {isEditable ? (
                    <Input type="text" name="title" />
                  ) : (
                    <CardTitle className="text-xl font-normal md:text-2xl">{todo.title}</CardTitle>
                  )}
                  {todo.description && (
                    <CardDescription className="text-lg font-normal md:text-[22px]">
                      {todo.description}
                    </CardDescription>
                  )}
                  <CardAction className="flex items-center gap-4 pl-1">
                    <button
                      type="button"
                      onClick={handleToggleModifiable(todo)}
                      className="hover:text-primary text-gray-600 transition-colors hover:cursor-pointer"
                    >
                      <SquarePen
                        className={cn(
                          "stroke-[1.5px]",
                          todoId === todo.id && isEditable && "text-primary/80"
                        )}
                      />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button type="button" className="hover:text-primary p-0">
                          {deleteTodo.getIsPending(todo.id) ? (
                            <Trash2Icon className="text-destructive animate-pulse" />
                          ) : (
                            <MoreHorizontal className="text-gray-600" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="shadow-lg">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => deleteTodo.handleDelete(todo.id)}
                            className="text-primary focus:text-primary h-10 w-35"
                          >
                            <Trash2Icon className="text-primary stroke-[1.5px]" /> Delete
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
