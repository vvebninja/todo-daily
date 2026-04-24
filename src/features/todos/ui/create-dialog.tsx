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
  const {
    isLoading: isCreatingTodo,
    fieldError,
    handleSubmit,
    clearError,
  } = useCreateTodo()

  function handleDialogChange(open: boolean) {
    setIsDialogOpen(open)

    if (!open && fieldError)
      clearError()
  }

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field data-invalid={!!fieldError} className="relative">
            <Input
              name="title"
              disabled={isCreatingTodo}
              placeholder="Title..."
              onChange={clearError}
              className="dark:focus-visible:shadow-primary/20 focus-visible:border-foreground/10 placeholder:text-muted-foreground/80 border-b-primary/20 h-10 transition-all duration-300 focus-visible:shadow-md focus-visible:ring-0 md:hidden"
            />
            <FieldError
              errors={[{ message: fieldError ? 'Title is required' : '' }]}
              className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center justify-end text-end text-shadow-sm"
            />
          </Field>
        </FieldGroup>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="md:text-primary md:hover:text-muted-foreground hidden md:mb-6 md:flex md:items-center md:gap-2"
          >
            <CirclePlus className="size-7 stroke-[1.5px]" />
            <Typography as="span" size="lg" color="inherit">
              Add todo
            </Typography>
          </Button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="w-full pt-3 md:top-[43%]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-250 flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle asChild>
                <Typography
                  as="h2"
                  variant="h2"
                  size="lg"
                  color="primary"
                  className="flex items-center justify-center gap-2 text-center font-bold"
                >
                  Add todo
                  <EditIcon size={24} />
                </Typography>
              </DialogTitle>
            </DialogHeader>
            <FieldGroup className="gap-0 overflow-hidden rounded-sm border border-gray-300">
              <Field data-invalid={!!fieldError} className="relative">
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  aria-invalid
                  autoFocus={isDialogOpen}
                  onChange={clearError}
                  className={cn(
                    'focus-visible:bg-primary/10 h-12 rounded-none border-0 focus-visible:ring-0 md:text-lg',
                    fieldError && 'placeholder:text-destructive',
                  )}
                />
                <FieldError
                  errors={[
                    { message: fieldError ? 'Fill at least one field' : '' },
                  ]}
                  className="pointer-events-none absolute inset-y-0 right-2 inline-flex items-center justify-end text-end text-shadow-sm"
                />
              </Field>
              <Field data-invalid={!!fieldError} className="relative">
                <Textarea
                  name="description"
                  placeholder="Description"
                  onChange={clearError}
                  className={cn(
                    'focus-visible:bg-primary/10 h-30 resize-none rounded-none border-0 text-lg focus-visible:ring-0 md:text-lg',
                    fieldError && 'placeholder:text-destructive',
                  )}
                />
                <FieldError
                  errors={[
                    { message: fieldError ? 'Fill at least one field' : '' },
                  ]}
                  className="pointer-events-none absolute right-2 inline-flex items-center justify-end pt-3 text-end text-shadow-sm"
                />
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
                  <Typography as="span" color="primary">
                    Cancel
                  </Typography>
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isCreatingTodo}
                className="bg-primary disabled:opacity-30"
              >
                {isCreatingTodo && <Spinner />}
                <Typography as="span" color="primary-foreground">
                  Add
                </Typography>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
