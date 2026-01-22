import "react-router";

export const ROUTES = {
  HOME: "/",
  TODOS: "/todos",
  TODO: "/todos/:todoId",
  LANDING: "/landing",
  PROFILE: "/profile",
} as const;

export type PathParams = {
  [ROUTES.TODO]: {
    params: {
      todoId: string;
    };
  };
};

declare module "react-router" {
  interface Register {
    pages: PathParams;
  }
}
