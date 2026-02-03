import { Link } from "react-router";
import { ROUTES } from "@/shared/model/routes.ts";
import { AuthLayout } from "@/features/auth/auth-layout.tsx";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Login to your account"
      description="Enter your email below to login to your account"
      form={<form></form>}
      footerText={
        <>
          No account?
          <Link className="underline" to={ROUTES.REGISTER}>
            Create account
          </Link>
        </>
      }
    />
  );
};

export const Component = LoginPage;
