import { CirclePlus, EditIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/shared/lib/css.ts'
import { Button } from '@/shared/ui/kit/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/kit/dialog'
import { Field, FieldError, FieldGroup } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { Spinner } from '@/shared/ui/kit/spinner'
import { Textarea } from '@/shared/ui/kit/textarea'
import { Typography } from '@/shared/ui/typography.tsx'
import { useCreateTodo } from '../model/use-create-todo.ts'

export function CreateTodoDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const createTodo = useCreateTodo()

  function handleDialogChange(open: boolean) {
    setIsDialogOpen(open)

    if (!open && createTodo.fieldError)
      createTodo.clearError()
  }

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mb-6 flex items-center gap-2 text-primary hover:text-muted-foreground"
        >
          <CirclePlus
            size={28}
            className="fill-current stroke-white stroke-[1.5px]"
          />
          <Typography as="span" size="lg" color="inherit">
            Add todo
          </Typography>
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-full pt-3 md:top-[43%]"
      >
        <form
          onSubmit={createTodo.handleSubmit}
          className="flex w-full max-w-250 flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle asChild>
              <Typography
                as="h2"
                variant="h2"
                size="md"
                color="primary"
                className="flex items-center justify-center gap-2 text-center font-secondary"
              >
                Add todo
                <EditIcon size={24} />
              </Typography>
            </DialogTitle>
          </DialogHeader>
          <FieldGroup className="gap-0 overflow-hidden rounded-sm border border-gray-300">
            <Field data-invalid={!!createTodo.fieldError} className="relative">
              <Input
                type="text"
                name="title"
                placeholder="Title"
                aria-invalid
                autoFocus={isDialogOpen}
                className={cn(
                  'h-12 rounded-none border-0 focus-visible:bg-primary/10 focus-visible:ring-0 md:text-lg',
                  createTodo.fieldError && 'placeholder:text-destructive',
                )}
                onChange={createTodo.clearError}
              />
              {createTodo.fieldError && (
                <FieldError
                  errors={[{ message: createTodo.fieldError }]}
                  className="pointer-events-none absolute inset-y-0 right-2 inline-flex items-center justify-end text-end text-shadow-sm"
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
                  'resize-none rounded-none border-0 text-lg focus-visible:bg-primary/10 focus-visible:ring-0 md:text-lg',
                  createTodo.fieldError && 'placeholder:text-destructive',
                )}
              />
              {createTodo.fieldError && (
                <FieldError
                  errors={[{ message: createTodo.fieldError }]}
                  className="pointer-events-none absolute right-2 inline-flex items-center justify-end pt-3 text-end text-shadow-sm"
                />
              )}
            </Field>
          </FieldGroup>
          <DialogFooter className="grid gap-1 sm:grid-cols-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                className="border-primary hover:text-primary focus:text-primary"
              >
                <Typography as="span" size="default" color="primary">
                  Cancel
                </Typography>
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={createTodo.isCreating}
              className="bg-primary disabled:opacity-30"
            >
              {createTodo.isCreating && <Spinner />}
              <Typography as="span" size="default" color="primary-foreground">
                Add
              </Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
