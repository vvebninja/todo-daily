import { supabaseClientInstance } from './instance'

const AVATARS_BUCKET_NAME = 'avatars'

export const storageService = {
  uploadAvatar: async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${crypto.randomUUID()}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    const { error } = await supabaseClientInstance.storage
      .from(AVATARS_BUCKET_NAME)
      .upload(filePath, file, {
        contentType: file.type,
      })

    if (error) {
      throw error
    }
    return filePath
  },

  getPrivateUrl: async (filePath: string) => {
    if (!filePath) {
      return null
    }

    const { data, error } = await supabaseClientInstance.storage
      .from(AVATARS_BUCKET_NAME)
      .createSignedUrl(filePath, 3600)

    if (error) {
      throw error
    }

    return data.signedUrl
  },
}
