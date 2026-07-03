import type { ChangeEvent, KeyboardEvent, SubmitEvent } from 'react'
import {
  ListCheckIcon,
  ListIcon,
  ListOrderedIcon,
  PlusIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCreateTodo } from '@/features/todo/model/use-create-todo'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/kit/button.tsx'
import { Field } from '@/shared/ui/kit/field'
import { Input } from '@/shared/ui/kit/input'

interface TaskItem { id: string, text: string }

interface Task {
  id: string
  title?: string
  items: TaskItem[]
}

interface CreateFormProps {
  className?: string
}

export function CreateTodoForm({ className }: CreateFormProps) {
  const createTodo = useCreateTodo()
  const [isExpanded, setIsExpanded] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const taskTextRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [task, setTask] = useState<Task>({ id: '', title: '', items: [] })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // toast.promise(createTodo.mutateAsync({ title }), {
    //   loading: 'Creating todo... ⏳',
    //   success: () => 'Todo created! 🎉',
    //   error: err => err?.message || 'Error creating todo ❌',
    // })
  }

  const handleTaskTitleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      taskTextRef.current?.focus()
    }

    if (e.ctrlKey && e.code === 'Enter') {
      alert('submitted')
    }
  }

  const handleTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({ ...prev, title: e.target.value }))
  }

  const handleEditTaskChange = (e: ChangeEvent<HTMLInputElement>, id: TaskItem['id']) =>
    setTask(prev => ({
      ...prev,
      items: prev.items.map(innerItem =>
        innerItem.id === id
          ? { ...innerItem, text: e.target.value }
          : innerItem,
      ),
    }))

  const handleTaskTextKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const text = e.currentTarget.value

      setTask(prev => ({
        ...prev,
        items: [...prev.items, { id: Date.now().toString(), text }],
      }))

      e.currentTarget.value = ''
    }
  }

  useEffect(() => {
    if (!formRef)
      return

    const handleClickOutside = (e) => {
      if (!formRef.current?.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn('p-2 bg-card rounded-lg', className)}
    >
      {/* Input Title */}
      <Field orientation="horizontal">
        <Input
          name="title"
          placeholder={isExpanded ? 'Title' : 'Take a note...'}
          onFocus={() => setIsExpanded(true)}
          onChange={handleTaskTitleChange}
          onKeyDown={handleTaskTitleKeydown}
          className="h-11 pl-4 dark:bg-transparent border-0 border-b border-b-transparent rounded-none focus-visible:ring-0 dark:focus-visible:border-b-primary/30 focus-visible:placeholder-primary"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={createTodo.isPending}
          className="hover:text-primary transition-colors duration-300"
        >
          <PlusIcon className="size-6" />
        </Button>
      </Field>

      {isExpanded && (
        <div>
          {/* Input Task Text  */}
          <Input
            ref={taskTextRef}
            type="text"
            name="taskText"
            placeholder="Take a note..."
            onKeyDown={handleTaskTextKeydown}
            className="min-h-12 pl-4 dark:bg-transparent rounded-none border-0 focus-visible:ring-0 focus-visible:placeholder-primary"
          />

          <div className="pl-8">
            <ul className="list-disc">
              {task.items.map(item => (
                <li key={item.id}>
                  {isFocused
                    ? (
                      <Input
                        type="text"
                        value={item.text}
                        onChange={e => handleEditTaskChange(e, task.id)}
                        // Check what setIsFocused does
                        // Why on focus edit input doesn't appear
                        onFocus={() => setIsFocused(true)}
                        className="dark:bg-transparent border-none focus-visible:ring-0 focus-visible:text-primary"
                      />
                    )
                    : (
                      <span>{item.text}</span>
                    )}
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex items-center justify-end">
            <li>
              <Button
                variant="ghost"
                className="text-muted-foreground/80 rounded-r-none"
              >
                <ListOrderedIcon className="size-5" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-muted-foreground/80 rounded-none"
              >
                <ListIcon className="size-5" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-muted-foreground/80 rounded-l-none"
              >
                <ListCheckIcon className="size-5" />
              </Button>
            </li>
          </ul>
        </div>
      )}

    </form>
  )
}
