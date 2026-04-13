import type { SubmitEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { queryClient } from '@/shared/api/query-client'
import { todoService } from '@/shared/api/todoService'

export function useCreateTodo() {
  const [fieldError, setFieldError] = useState<null | string>(null)

  const mutation = useMutation({
    mutationFn: todoService.create,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title')?.toString() || ''
    const description = formData.get('description')?.toString() || ''

    if (!title && !description) {
      setFieldError('Fill at least one field')
      return
    }

    mutation.mutate(
      {
        title,
        description,
      },
      {
        onSuccess: () => {
          toast.success('Todo created')
          setFieldError(null)
          form.reset()
        },
      },
    )
  }

  return {
    fieldError,
    isCreatingTodo: mutation.isPending,
    handleSubmit,
    clearError: () => {
      if (fieldError)
        setFieldError(null)
    },
  }
}
