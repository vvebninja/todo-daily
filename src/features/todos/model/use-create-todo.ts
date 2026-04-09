import { useState } from 'react'
import { toast } from 'sonner'
import { rqClientInstance as rqc } from '@/shared/api/instances.ts'
import { queryClient as qc } from '@/shared/api/query-client.ts'

export function useCreateTodo() {
  const [fieldError, setFieldError] = useState<null | string>(null)

  const mutation = rqc.useMutation('post', '/todos', {
    onSettled: () => qc.invalidateQueries(rqc.queryOptions('get', '/todos')),
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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
      { body: { title, description } },
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
