import { rqClient } from "@/shared/api/instance";

export function useTodos() {
  const {
    data: todos,
    error,
    isLoading,
  } = rqClient.useQuery(
    "get",
    "/todos",
    {}, //fetch params
    {
      select: todos => {
        return todos.toSorted((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
      },
    }
  );

  return {
    todos,
    error,
    isLoading,
  };
}
