import { HttpResponse } from "msw";
import { http } from "../http";
import { type ApiSchemas } from "../../schema";

const todos: ApiSchemas["Todo"][] = [
  {
    id: "todo-1",
    title: "Marketing Campaign",
    description: "Lorem desck",
    isCompleted: false,
  },

  {
    id: "todo-2",
    title: "Dont forget to remove pnpm.lock and push",
    description: "Lorem desck",
    isCompleted: false,
  },
];

export const todosHandlers = [
  http.get("/todos", () => {
    return HttpResponse.json(todos);
  }),
  http.post("/todos", async (ctx) => {
    const data = await ctx.request.json();
    const todo = {
      id: crypto.randomUUID(),
      title: data.title,
      isCompleted: false,
    };
    todos.push(todo);
    return HttpResponse.json({ message: "OK", code: "OK" });
  }),
  http.patch("/todos/{todoId}", async ({ request, params }) => {
    const data = await request.json();
    const index = todos.findIndex((todo) => todo.id === params.todoId);

    if (index === -1) {
      return HttpResponse.json({
        message: "Todo not found",
        code: "NOT_FOUND",
      });
    }

    const updatedTodo = { ...todos[index], ...data };
    todos[index] = updatedTodo;
    return HttpResponse.json({
      message: "isCompleted was changed",
      code: "OK",
    });
  }),
  http.delete("/todos/{todoId}", ({ params }) => {
    const { todoId } = params;
    const index = todos.findIndex((todo) => todo.id === todoId);
    if (index === -1) {
      return HttpResponse.json({
        message: "Todo not found",
        code: "NOT_FOUND",
      });
    }
    todos.splice(index, 1);
    return HttpResponse.json({ message: "Todo deleted", code: "OK" });
  }),
];
