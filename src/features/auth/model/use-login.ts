import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const login = (userCredentials: ApiSchemas["LoginRequest"]) =>
    loginMutation.mutate({ body: userCredentials });

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined;

  return {
    login,
    errorMessage,
    isPending: loginMutation.isPending,
  };
};
