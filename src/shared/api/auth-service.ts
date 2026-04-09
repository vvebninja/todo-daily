import { supabaseClientInstance } from './instances'

export const authService = {
  signInWithGoogle: async () => {
    const { error } = await supabaseClientInstance.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      throw error
    }
  },
  signOut: async () => {
    const { error } = await supabaseClientInstance.auth.signOut()

    if (error) {
      throw error
    }
  },
}
