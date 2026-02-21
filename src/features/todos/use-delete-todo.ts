import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import type { ApiSchemas } from "@/shared/api/schema";

export function useDeleteTodo() {
  const { mutate, isPending, variables } = rqClient.useMutation("delete", `/todos/{todoId}`, {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },

    onSuccess: async (_, variables) => {
      queryClient.setQueryData<ApiSchemas["Todo"][]>(
        rqClient.queryOptions("get", "/todos").queryKey,
        (oldTodos) => {
          return oldTodos?.filter((todo) => todo.id !== variables.params.path.todoId);
        }
      );
    },
  });

  return {
    deleteTodo(id: string) {
      mutate({ params: { path: { todoId: id } } });
    },
    getIsPending(id: string) {
      return isPending && variables?.params.path.todoId === id;
    },
  };
}
