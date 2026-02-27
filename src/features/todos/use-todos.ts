import { rqClient } from "@/shared/api/instance";

export function useTodos() {
  const { data: todos, error, isLoading } = rqClient.useQuery("get", "/todos");

  return {
    todos,
    error,
    isLoading,
  };
}
