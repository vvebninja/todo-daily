import { useNavigate } from "react-router";
import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";

export const useRegister = () => {
  const navigate = useNavigate();

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const register = (userCredentials: ApiSchemas["RegisterRequest"]) =>
    registerMutation.mutate({ body: userCredentials });

  const errorMessage = registerMutation.isError ? registerMutation.error.message : undefined;

  return {
    register,
    errorMessage,
    isPending: registerMutation.isPending,
  };
};
