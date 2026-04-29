import { useState } from 'react'
import { useCreateTodo } from './use-create-todo'

export function useTodoDraft() {
  const [title, setTitle] = useState('')
  const { createTodo, isPending } = useCreateTodo()

  const submit = async () => {
    if (!title.trim())
      return

    await createTodo({ title: title.trim() })
    setTitle('')
  }

  return {
    title,
    setTitle,
    submit,
    isPending,
  }
}
