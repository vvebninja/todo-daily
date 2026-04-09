import { createBrowserRouter, redirect } from 'react-router'
import { Header } from '@/features/header'
import { ROUTES } from '@/shared/model/routes'
import App from './app'
import { AuthGuard } from './auth-guard'
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
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TODOS),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/log.in.page'),
      },
      {
        element: (
          <>
            <Header />
            <AuthGuard />
          </>
        ),
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
    ],
  },
])
