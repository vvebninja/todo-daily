const LOCAL_STORAGE_TODO_KEY = "todo";
const LOCAL_STORAGE_HAS_VISITED_APP_KEY = "has-visited-app";

const ROUTES = {
  HOME: "/",
  LANDING: "/landing",
  SIGN_UP: "/register",
  SIGN_IN: "/login",
  TODOS: "/todos",
} as const;

export { LOCAL_STORAGE_HAS_VISITED_APP_KEY, LOCAL_STORAGE_TODO_KEY, ROUTES };
