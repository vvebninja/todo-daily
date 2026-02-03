import { createBrowserRouter, redirect } from "react-router";
import { App } from "./App";
import { ROUTES } from "@/shared/model/routes";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TODOS),
      },
      {
        path: ROUTES.LANDING,
        lazy: () => import("@/features/landing/landing.page"),
      },
      {
        path: ROUTES.TODOS,
        lazy: () => import("@/features/todos/todos.page"),
      },
      {
        path: ROUTES.TODO,
        lazy: () => import("@/features/todo/todo.page"),
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import("@/features/profile/profile.page"),
      },
    ],
  },
]);
