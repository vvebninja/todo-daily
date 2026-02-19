import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";

export function useDeleteTodo() {
  const { mutate, isPending, variables } = rqClient.useMutation("delete", `/todos/{todoId}`, {
    async onSettled() {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/todos"));
    },
    async onSuccess(_, varialbes) {
      queryClient.setQueryData(rqClient.queryOptions("get", "/todos").queryKey, (oldTodos) => {
        return oldTodos.filter((todo) => todo.id !== varialbes.params.path.todoId);
      });
    },
  });

  function deleteTodo(id: string) {
    mutate({ params: { path: { todoId: id } } });
  }

  function getIsPending(id: string) {
    return isPending && variables?.params.path.todoId === id;
  }

  return {
    deleteTodo,
    getIsPending,
  };
}
