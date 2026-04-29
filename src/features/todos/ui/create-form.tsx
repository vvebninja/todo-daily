import type { SubmitEvent } from 'react'
import type { Todo } from '@/shared/api/todo-service'
import { Input } from '@/shared/ui/kit/input'

type CreateFormProps = Readonly<{
  value: string
  onChange: (newValue: string) => void
  onSubmit: (data: Pick<Todo, 'title'>) => void
  disabled?: boolean
  className?: string
}>

export function CreateTodoForm({
  value,
  onChange,
  onSubmit,
  disabled,
  className,
}: CreateFormProps) {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!value.trim() || disabled)
      return

    onSubmit({ title: value.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        name="title"
        value={value}
        disabled={disabled}
        placeholder="Task..."
        onChange={e => onChange(e.target.value)}
        className="dark:focus-visible:shadow-primary/20 focus-visible:border-foreground/10 placeholder:text-muted-foreground/80 border-b-primary/20 h-10 pr-10 transition-all duration-300 focus-visible:shadow-md focus-visible:ring-0 md:h-11 md:rounded-lg lg:h-12"
      />
    </form>
  )
}
