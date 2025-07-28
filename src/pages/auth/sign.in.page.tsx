import { useAuth } from "@/context/auth";
import { ROUTES } from "@/shared/routes";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";
import { AuthPageLayout } from "./auth.page.layout";

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(9, "Please enter your password to continue."),
});

type SignInSchema = z.infer<typeof signInSchema>;

function SignInPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) });
  const {
    loginWithEmailPassword,
    error: firebaseError,
    clearError: clearFirebaseError,
    isLoading: firebaseIsLoading,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearFirebaseError();
  }, [clearFirebaseError]);

  const onSubmit = async ({ email, password }: FieldValues) => {
    clearFirebaseError();
    const user = await loginWithEmailPassword(email, password);
    if (user) {
      await navigate(ROUTES.TODOS, { replace: true });
      reset();
    }
  };

  return (
    <AuthPageLayout title="SignIn">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mb-10"
      >
        <Input
          type="email"
          placeholder="Email"
          autoFocus
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <Button
          type="submit"
          variant="filled"
          disabled={isSubmitting || firebaseIsLoading}
        >
          SignIn
        </Button>
        {firebaseError && <p className="text-red-500 mt-2 text-center">{firebaseError}</p>}
      </form>
    </AuthPageLayout>
  );
}

export const Component = SignInPage;
