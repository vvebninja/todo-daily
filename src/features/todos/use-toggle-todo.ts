import { rqClient as rqc } from "@/shared/api/instance";
import { queryClient as qc } from "@/shared/api/query-client";
import type { ApiSchemas } from "@/shared/api/schema";

export function useToggleTodo() {
  const toggleCompletedMutation = rqc.useMutation("patch", "/todos/{todoId}", {
    onMutate: async variables => {
      const options = rqc.queryOptions("get", "/todos");

      await qc.cancelQueries(options);

      const previousTodos = qc.getQueryData<ApiSchemas["Todo"][]>(options.queryKey);

      qc.setQueryData<ApiSchemas["Todo"][]>(options.queryKey, old =>
        old?.map(todo =>
          todo.id === variables.params.path.todoId ? { ...todo, ...variables.body } : todo
        )
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context.previousTodos) {
        qc.setQueryData(rqc.queryOptions("get", "/todos").queryKey, context.previousTodos);
      }
    },
    onSettled: () => qc.invalidateQueries(rqc.queryOptions("get", "/todos")),
  });

  return {
    toggleCompleted: (todoId: string, isCompleted: boolean) => {
      toggleCompletedMutation.mutate({ params: { path: { todoId } }, body: { isCompleted } });
    },
  };
}
