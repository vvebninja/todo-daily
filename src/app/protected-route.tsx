import { Navigate, Outlet, redirect } from 'react-router'
import { Header } from '@/features/header'
import { authService } from '@/shared/api/auth-service'
import { ROUTES } from '@/shared/model/routes'
import { useSessionStore } from '@/shared/model/session.ts'
import { Spinner } from '@/shared/ui/kit/spinner'

export function ProtectedRoute() {
  const { user, isInitialized } = useSessionStore()

  if (!isInitialized) {
    return <Spinner className="text-primary fixed inset-0 m-auto size-20" />
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function protectedRouteLoader() {
  const session = await authService.getSession()

  if (!session)
    return redirect(ROUTES.LOGIN)
}
