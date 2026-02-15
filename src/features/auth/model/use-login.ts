import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = rqClient.useMutation("post", "/todos", {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const login = ({ email, password }: { email: string, password: string }) =>
    loginMutation.mutate({ body: { email, password } });

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined;

  return {
    login,
    errorMessage,
    isPending: loginMutation.isPending,
  };
};
