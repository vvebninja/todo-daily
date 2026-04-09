import 'react-router'

export const ROUTES = {
  REGISTER: '/register',
  LOGIN: '/login',
  LOGIN_WITH_MAGIC: '/login-with-magic',
  HOME: '/',
  TODOS: '/todos',
  TODO: '/todos/:todoId',
  LANDING: '/landing',
  PROFILE: '/profile',
} as const

export interface PathParams {
  [ROUTES.TODO]: {
    params: {
      todoId: string
    }
  }
}

declare module 'react-router' {
  interface Register {
    pages: PathParams
  }
}
