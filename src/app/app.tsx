import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'
import { authService } from '@/shared/api/auth-service.ts'
import { useSessionStore } from '@/shared/model/session.ts'

export default function App() {
  const setUser = useSessionStore(state => state.setUser)

  useEffect(() => {
    authService.getSession().then(session => setUser(session?.user || null))

    const subscription = authService.onAuthChange(user => setUser(user))

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser])

  return (
    <div className="flex min-h-screen flex-col">
      <Outlet />
      <Toaster position="top-center" richColors />
    </div>
  )
}
