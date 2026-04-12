import * as React from 'react'
import { rqClientInstance } from '@/shared/api/instance'

export function useAvatarUpload() {
  const [preview, setPreview] = React.useState<string | null>(null)
  const [file, setFile] = React.useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const mutation = rqClientInstance.useMutation('post', '/profile/avatar')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file?.type.startsWith('image/')) {
      setFile(file)
      const reader = new FileReader()

      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  function handleFileUpload() {
    if (!file)
      return

    const form = new FormData()

    form.append('avatar', file)
    mutation.mutate({
      body: form as unknown as { avatar?: string },
    })
  }

  return {
    preview,
    isPending: mutation.isPending,
    fileInputRef,
    handleFileChange,
    handleFileUpload,
  }
}
