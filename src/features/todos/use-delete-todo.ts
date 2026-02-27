import { rqClient as rqc } from "@/shared/api/instance";
import { queryClient as qc } from "@/shared/api/query-client";

export function useDeleteTodo() {
  const mutation = rqc.useMutation("delete", `/todos/{todoId}`, {
    onSettled: async () => {
      await qc.invalidateQueries(rqc.queryOptions("get", "/todos"));
    },
  });

  return {
    deleteTodo(id: string) {
      mutation.mutate({ params: { path: { todoId: id } } });
    },
    getIsPending(id: string) {
      return mutation.isPending && mutation.variables?.params.path.todoId === id;
    },
  };
}
