import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();

  const registerMutation = rqClient.useMutation("post", "/todos", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const register = ({ email, password }: { email: string, password: string }) =>
    registerMutation.mutate({ body: { email, password } });

  const errorMessage = registerMutation.isError
    ? registerMutation.error.message
    : undefined;

  return {
    register,
    errorMessage,
    isPending: registerMutation.isPending,
  };
};
