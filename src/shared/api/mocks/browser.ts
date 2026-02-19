import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { todosHandlers } from "./handlers/todos";

export const worker = setupWorker(...authHandlers, ...todosHandlers);
