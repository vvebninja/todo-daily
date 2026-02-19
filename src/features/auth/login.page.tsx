import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router";
import { AuthLayout } from "./ui/auth-layout";
import { LoginForm } from "./ui/login-form";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Login"
      form={<LoginForm />}
      footer={
        <Fragment>
          Not have an account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </Fragment>
      }
    />
  );
};

export const Component = LoginPage;
