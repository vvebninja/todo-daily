import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import type { ApiSchemas } from "@/shared/api/schema";

export function useCreateTodo() {
  const { mutate, isPending } = rqClient.useMutation("post", "/todos", {
    onSuccess() {
      queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },
  });

  function createTodo(todo: ApiSchemas["TodoCreate"]) {
    mutate({ body: { ...todo } });
  }

  return {
    isPending,
    createTodo,
  };
}
