import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import type { ApiSchemas } from "@/shared/api/schema";

export function useCreateTodo() {
  const { mutateAsync, isPending } = rqClient.useMutation("post", "/todos", {
    onSuccess() {
      queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },
  });

  return {
    isPending,
    async createTodo(todo: ApiSchemas["TodoCreate"]) {
      mutateAsync({ body: { title: todo.title, description: todo.description } });
    },
  };
}
