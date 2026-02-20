import { HttpResponse } from "msw";
import type { ApiSchemas } from "../../schema";
import { http } from "../http";

const todos: ApiSchemas["Todo"][] = [
  {
    id: "1",
    title: "Dont forget to buy milk",
    description: "Dont forget to buy milk",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Dont forget to buy milk",
    description: "Dont forget to buy milk",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Dont forget to buy milk",
    description: "Dont forget to buy milk",
    isCompleted: false,
  },
  {
    id: "4",
    title: "Dont forget to buy milk",
    description: "Dont forget to buy milk",
    isCompleted: false,
  },
];

export const todosHandlers = [
  http.get("/todos", () => {
    return HttpResponse.json(todos);
  }),
  http.post("/todos", async (ctx) => {
    const data = await ctx.request.json();

    const todo: ApiSchemas["Todo"] = {
      id: crypto.randomUUID(),
      title: data.title,
      isCompleted: false,
    };

    if (data.description) {
      todo.description = data.description;
    }

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
