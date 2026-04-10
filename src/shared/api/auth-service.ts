import { supabaseClientInstance } from './instances'

export const authService = {
  signInWithGoogle: async ({
    redirectTo = window.location.origin,
  }: {
    redirectTo?: string
  }) => {
    const { error } = await supabaseClientInstance.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
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
