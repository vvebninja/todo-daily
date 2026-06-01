import type { SubmitEvent } from 'react'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useCreateTodo } from '@/features/todos/model/use-create-todo.ts'
import { cn } from '@/shared/lib/css.ts'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Input } from '@/shared/ui/kit/input'

type CreateFormProps = Readonly<{
  className?: string
}>

export function CreateTodoForm({ className }: CreateFormProps) {
  const { createTodo, isPending } = useCreateTodo()
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(e.target)
    const title = String(formData.get('title')).trim()

    if (!title)
      return

    const promise = createTodo(title)
    toast.promise(promise, {
      loading: 'Creating todo... ⏳',
      success: () => {
        return 'Todo created! 🎉'
      },
      error: err => err?.message || 'Error creating todo ❌',
    })

    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Input
          name="title"
          placeholder="Task..."
          className={cn(
            'dark:focus-visible:shadow-primary/20 focus-visible:border-foreground/10',
            'placeholder:text-muted-foreground/80 border-b-primary/20 h-10 pr-10',
            'transition-all duration-300 focus-visible:shadow-md focus-visible:ring-0',
            'md:h-11 md:rounded-lg lg:h-12',
          )}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          disabled={isPending}
          className={cn(
            'hover:text-primary text-muted-foreground/80 absolute inset-y-0',
            'right-1 my-auto transition-colors duration-300',
          )}
        >
          <PlusIcon className="size-5" />
        </Button>
      </div>
    </form>
  )
}
