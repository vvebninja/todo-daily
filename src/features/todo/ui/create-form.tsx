import type { SubmitEvent } from 'react'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useCreateTodo } from '@/features/todo/model/use-create-todo'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Input } from '@/shared/ui/kit/input'

interface CreateFormProps {
  className?: string
}

export function CreateTodoForm({ className }: CreateFormProps) {
  const createTodo = useCreateTodo()

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(e.currentTarget)
    const title = String(formData.get('title')).trim()

    if (!title)
      return

    toast.promise(createTodo.mutateAsync({ title }), {
      loading: 'Creating todo... ⏳',
      success: () => 'Todo created! 🎉',
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
          className="dark:focus-visible:shadow-primary/20 focus-visible:border-foreground placeholder:text-muted-foreground/80 border-b-primary/20 h-10 pr-10 transition-all duration-300 focus-visible:shadow-md focus-visible:ring-0 md:h-11 md:rounded-lg lg:h-12"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          disabled={createTodo.isPending}
          className="hover:text-primary text-muted-foreground/80 absolute inset-y-0 right-1 my-auto transition-colors duration-300"
        >
          <PlusIcon className="size-5" />
        </Button>
      </div>
    </form>
  )
}
