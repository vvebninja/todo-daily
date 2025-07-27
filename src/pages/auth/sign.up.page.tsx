import { useAuth } from "@/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { type FieldValues, useForm } from "react-hook-form";
import * as z from "zod";
import { AuthPageLayout } from "./auth.page.layout";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model";
import { useEffect } from "react";

const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(9, "Password must be at least 9 characters"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

function SignUpPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const {
    registerWithEmailPassword,
    error: firebaseError,
    clearError: clearFirebaseError,
    isLoading: firebaseIsLoading,
  } = useAuth();

  useEffect(() => {
    clearFirebaseError();
  }, [clearFirebaseError]);

  const onSubmit = async ({ email, password }: FieldValues) => {
    clearFirebaseError();
    const user = await registerWithEmailPassword(email, password);
    if (user) {
      await navigate(ROUTES.TODOS, { replace: true });
      reset();
    }
  };

  return (
    <AuthPageLayout title="SignUp">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mb-10"
      >
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          variant="filled"
          disabled={isSubmitting || firebaseIsLoading}
          className="disabled:opacity-45 disabled:pointer-events-none"
        >
          SignUp
        </Button>
        {firebaseError && <p className="text-red-500 mt-2 text-center">{firebaseError}</p>}
      </form>
    </AuthPageLayout>
  );
}

export const Component = SignUpPage;
