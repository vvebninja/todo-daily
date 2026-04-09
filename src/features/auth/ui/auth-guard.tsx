import { Navigate, Outlet } from 'react-router'
import { ROUTES } from '@/shared/model/routes'
import { useUser } from '../model/use-user'

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
