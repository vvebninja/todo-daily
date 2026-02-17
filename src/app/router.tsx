import { createBrowserRouter, redirect } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { App } from "./app";
import { ProtectedRoutesLayout } from "./protected-routes-layout";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TODOS),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        element: <ProtectedRoutesLayout />,
        children: [

          {
            path: ROUTES.TODOS,
            lazy: () => import("@/features/todos/todos.page"),
          },
          {
            path: ROUTES.PROFILE,
            lazy: () => import("@/features/profile/profile.page"),
          },
        ]
      }
    ],
  },
]);
