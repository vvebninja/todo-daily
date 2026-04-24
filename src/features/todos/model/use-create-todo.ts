import type { SubmitEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { queryClient } from '@/shared/api/query-client'
import { todoService } from '@/shared/api/todo-service'

export function useCreateTodo() {
  const [fieldError, setFieldError] = useState<boolean>(false)

  const mutation = useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      setFieldError(false)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title')?.toString().trim() || ''
    const description = formData.get('description')?.toString().trim() || ''

    if (!title && !description) {
      setFieldError(true)
      return
    }

    try {
      const promise = mutation.mutateAsync({ title, description })
      toast.promise(promise, {
        loading: 'Creating todo...',
        success: () => {
          form.reset()
          return 'Todo created'
        },
        error: 'Failed to create todo',
      })
    }
    catch (error) {
      console.error('Error:', error)
      toast.error('Failed to create todo')
    }
  }

  return {
    fieldError,
    isLoading: mutation.isPending,
    handleSubmit,
    clearError: () => {
      if (fieldError) {
        setFieldError(false)
      }
    },
  }
}
