import { setupWorker } from "msw/browser";
import { todosHandlers } from "./handlers/todos.ts";
import { authHandlers } from "@/shared/api/mocks/handlers/auth.ts";

export const worker = setupWorker(...authHandlers, ...todosHandlers);
