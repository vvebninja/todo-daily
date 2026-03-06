import { CirclePlus, EditIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/shared/ui/kit/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/shared/ui/kit/dialog'
import { Field, FieldError } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'
import { Spinner } from '@/shared/ui/kit/spinner'
import { Textarea } from '@/shared/ui/kit/textarea'
import { Typography } from '@/shared/ui/typography.tsx'

import { useCreateTodo } from '../model/use-create-todo.ts'

export function AddTodoDialog() {
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
    <div className="mb-2">
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="mb-6 flex items-center gap-2 text-primary hover:text-black"
          >
            <CirclePlus size={24} className="transition-colors" />
            <Typography as="span" size="lg" color="inherit">
              Add todo
            </Typography>
          </button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="w-full pt-3 md:top-[43%]"
        >
          <DialogHeader className="flex-row items-center justify-center gap-3 text-center font-secondary">
            <Typography as="h3" variant="h3" size="lg" color="primary">
              Add todo
              <EditIcon />
            </Typography>
          </DialogHeader>
          <form onSubmit={createTodo.handleSubmit} className="w-full max-w-250">
            <div className="mb-4 overflow-hidden rounded-sm border border-gray-300">
              <Field
                data-invalid={!!createTodo.fieldError}
                className="relative"
              >
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
                    className="pointer-events-none absolute inset-y-0 right-2 inline-flex items-center justify-end text-end text-shadow-md"
                  />
                )}
              </Field>
              <Field
                data-invalid={!!createTodo.fieldError}
                className="relative"
              >
                <Textarea
                  name="description"
                  rows={3}
                  placeholder="Description"
                  onChange={createTodo.clearError}
                  className={cn(
                    'rounded-none border-0 text-lg focus-visible:bg-primary/10 focus-visible:ring-0 md:text-lg',
                    createTodo.fieldError && 'placeholder:text-destructive',
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
                className="border-primary text-primary hover:text-primary focus:text-primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createTodo.isPending}
                className="bg-primary text-[16px] text-primary-foreground disabled:opacity-30"
              >
                {createTodo.isPending && <Spinner />}
                {' '}
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
