import { rqClient } from "@/shared/api/instance";

export function useTodos() {
  const { data, error, isLoading } = rqClient.useQuery("get", "/todos");

  return {
    data,
    error,
    isLoading,
  };
}
