import type { ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { supabaseClientInstance } from '@/shared/api/instance'
import { queryClient } from '@/shared/api/query-client'
import { storageService } from '@/shared/api/storage-service'

export function useUpdateAvatar(userId: string) {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: async (selectedFile: File) => {
      const filePath = await storageService.uploadAvatar(selectedFile, userId)

      const { error } = await supabaseClientInstance
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', userId)

      if (error) {
        throw error
      }
      return filePath
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setFile(null)
    },
  })

  function openFileDialog() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]

    if (selectedFile?.type.startsWith('image/')) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  function handleFileUpload() {
    if (file) {
      mutation.mutate(file)
    }
  }

  return {
    fileInputRef,
    openFileDialog,
    preview,
    isPending: mutation.isPending,
    handleFileChange,
    handleFileUpload,
  }
}
