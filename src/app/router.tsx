import { createBrowserRouter, redirect } from 'react-router'

import { Supabase } from '@/features/auth/ui/supabase.tsx'

import { ROUTES } from '@/shared/model/routes'
import { App } from './app'
import { ProtectedRoutesLayout } from './protected-routes-layout'
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
        path: '/supabase',
        element: <Supabase />,
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TODOS),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        element: <ProtectedRoutesLayout />,
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
