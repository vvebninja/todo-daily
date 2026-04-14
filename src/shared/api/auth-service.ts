import { supabaseClientInstance } from './instance'

export const authService = {
  signInWithGoogle: async (redirectTo: string) => {
    const { data, error } = await supabaseClientInstance.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${globalThis.location.origin}${redirectTo}`,
      },
    })

    if (error)
      throw error
    return data
  },

  signOut: async () => {
    const { error } = await supabaseClientInstance.auth.signOut()

    if (error)
      throw error
  },

  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabaseClientInstance.auth.getUser()

    if (error)
      return null
    return user
  },

  getSession: async () => {
    const {
      data: { session },
    } = await supabaseClientInstance.auth.getSession()
    return session
  },

  onAuthChange: (callback: (user: any) => void) => {
    const {
      data: { subscription },
    } = supabaseClientInstance.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })

    return subscription
  },
}
