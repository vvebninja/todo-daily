import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers/auth";
import { todosHandlers } from "./handlers/todos";
import { profileHandlers } from "./handlers/profile";

export const worker = setupWorker(...authHandlers, ...todosHandlers, ...profileHandlers);
