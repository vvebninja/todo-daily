import { Navigate, Outlet } from 'react-router'
import { ROUTES } from '@/shared/model/routes'

export function ProtectedRoutesLayout() {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />
  }
  return <Outlet />
}
