import { Navigate, Outlet } from 'react-router'
import { useUser } from '@/features/auth/model/use-user'
import { ROUTES } from '@/shared/model/routes'

export function AuthGuard() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
