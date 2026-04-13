import { Navigate, Outlet, redirect } from 'react-router'
import { useUser } from '@/features/auth/model/use-user'
import { Header } from '@/features/header'
import { authService } from '@/shared/api/auth-service'
import { ROUTES } from '@/shared/model/routes'
import { Spinner } from '@/shared/ui/kit/spinner'

export function ProtectedRoute() {
  const { user, isLoading } = useUser()

  if (isLoading) {
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
  const user = await authService.getCurrentUser()

  if (!user)
    return redirect(ROUTES.LOGIN)
}
