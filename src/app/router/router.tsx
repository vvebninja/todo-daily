import { AuthProvider } from "@/context/auth";
import { todosLoader } from "@/pages/todo/loaders";
import { ROUTES } from "@/shared/model";
import { createBrowserRouter, redirect } from "react-router";
import { App } from "../app";
import { protectedRoutesLoader, publicRoutesLoader } from "./loaders";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        loader: publicRoutesLoader,
        children: [
          {
            path: ROUTES.LANDING,
            lazy: () => import("@/pages/landing/landing.page"),
          },
          {
            path: ROUTES.SIGN_UP,
            lazy: () => import("@/pages/auth/sign.up.page"),
          },
          {
            path: ROUTES.SIGN_IN,
            lazy: () => import("@/pages/auth/sign.in.page"),
          },
        ],
      },
      {
        loader: protectedRoutesLoader,
        children: [
          {
            path: ROUTES.TODOS,
            loader: todosLoader,
            lazy: () => import("@/pages/todo/todo.page"),
          },
        ],
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TODOS),
      },
      {
        path: "*",
        loader: () => redirect(ROUTES.HOME),
      },
    ],
  },
]);
