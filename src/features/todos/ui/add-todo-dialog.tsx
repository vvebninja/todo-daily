import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/shared/ui/kit/dialog";
import { Field, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Textarea } from "@/shared/ui/kit/textarea";
import { CirclePlus, EditIcon } from "lucide-react";
import { useState } from "react";
import { useCreateTodo } from "../use-create-todo";

export function AddTodoDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createTodo = useCreateTodo();

  function handleDialogChange(open: boolean) {
    setIsDialogOpen(open);
    if (!open && createTodo.fieldError) createTodo.clearError();
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  return (
    <div className="mb-2">
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
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
                  autoFocus={isDialogOpen}
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
                onClick={closeDialog}
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
  );
}
