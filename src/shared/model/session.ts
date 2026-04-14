import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type SessionState = Readonly<{
  user: User | null
  isInitialized: boolean
  setUser: (user: User | null) => void
}>

export const useSessionStore = create<SessionState>(set => ({
  user: null,
  isInitialized: false,
  setUser: user => set({ user, isInitialized: true }),
}))
