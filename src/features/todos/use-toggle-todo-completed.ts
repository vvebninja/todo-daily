import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";

export function useToggleTodoCompleted() {
  const toggleCompletedMutation = rqClient.useMutation("patch", "/todos/{todoId}", {
    async onMutate(variables) {
      await queryClient.cancelQueries(rqClient.queryOptions("get", "/todos"));

      const previousTodos = queryClient.getQueryData(
        rqClient.queryOptions("get", "/todos").queryKey,
      );

      queryClient.setQueryData(rqClient.queryOptions("get", "/todos").queryKey, (old) =>
        old?.map((todo) =>
          todo.id === variables.params.path.todoId
            ? { ...todo, isCompleted: variables.body.isCompleted }
            : todo,
        ),
      );

      return { previousTodos };
    },

    onError(error, variables, context) {
      if (context?.previousTodos) {
        queryClient.setQueryData(
          rqClient.queryOptions("get", "/todos").queryKey,
          context.previousTodos,
        );
      }
    },

    async onSettled() {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },
  });

  return {
    toggleCompleted: (todoId: string, isCompleted: boolean) => {
      toggleCompletedMutation.mutate({ params: { path: { todoId } }, body: { isCompleted } });
    },
  };
}
