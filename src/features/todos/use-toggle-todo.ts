import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import type { ApiSchemas } from "@/shared/api/schema";

export function useToggleTodo() {
  const toggleCompletedMutation = rqClient.useMutation("patch", "/todos/{todoId}", {
    onMutate: async (variables) => {
      const options = rqClient.queryOptions("get", "/todos");

      await queryClient.cancelQueries(options);

      const previousTodos = queryClient.getQueryData<ApiSchemas["Todo"][]>(options.queryKey);

      queryClient.setQueryData<ApiSchemas["Todo"][]>(options.queryKey, (old) =>
        old?.map((todo) =>
          todo.id === variables.params.path.todoId ? { ...todo, ...variables.body } : todo
        )
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context.previousTodos) {
        queryClient.setQueryData(
          rqClient.queryOptions("get", "/todos").queryKey,
          context.previousTodos
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },
  });

  return {
    toggleCompleted: (todoId: string, isCompleted: boolean) => {
      toggleCompletedMutation.mutate({ params: { path: { todoId } }, body: { isCompleted } });
    },
  };
}
