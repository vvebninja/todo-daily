import { SessionProvider } from "@/context/session";
import { protectedRoutesLoader, publicRoutesLoader } from "@/shared/api";
import { ROUTES } from "@/shared/model";
import { createBrowserRouter, redirect } from "react-router";
import { App } from "./app";
import { todosLoader } from "@/pages/todo/loaders";

export const router = createBrowserRouter([
  {
    element: (
      <SessionProvider>
        <App />
      </SessionProvider>
    ),
    children: [
      {
        path: "*",
        loader: () => redirect(ROUTES.HOME),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TODOS),
      },
      {
        loader: publicRoutesLoader,
        children: [
          {
            path: ROUTES.LANDING,
            lazy: () => import("@/pages/landing/landing.page"),
          },
          {
            path: ROUTES.AUTH,
            lazy: () => import("@/pages/auth/auth.page"),
          },
        ],
      },
      {
        path: ROUTES.TODOS,
        loader: protectedRoutesLoader,
        children: [
          {
            index: true,
            loader: todosLoader,
            lazy: () => import("@/pages/todo/todo.page"),
          },
        ],
      },
    ],
  },
]);
