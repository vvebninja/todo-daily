import { createBrowserRouter, redirect } from 'react-router'
import { authService } from '@/shared/api/auth-service.ts'
import { ROUTES } from '@/shared/model/routes'
import App from './app'
import { ProtectedRoute, protectedRouteLoader } from './protected-route'
import { Providers } from './providers'

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        loader: protectedRouteLoader,
        children: [
          {
            path: ROUTES.TODOS,
            lazy: () => import('@/features/todos/todos.page'),
          },
          {
            path: ROUTES.PROFILE,
            lazy: () => import('@/features/profile/profile.page'),
          },
        ],
      },
      {
        loader: async () => {
          const session = await authService.getSession()
          if (session)
            return redirect(ROUTES.TODOS)
        },
        children: [
          {
            path: ROUTES.HOME,
            loader: () => redirect(ROUTES.LOGIN),
          },
          {
            path: ROUTES.LOGIN,
            lazy: () => import('@/features/auth/log.in.page'),
          },
          {
            path: '*',
            loader: () => redirect(ROUTES.HOME),
          },
        ],
      },
    ],
  },
])
