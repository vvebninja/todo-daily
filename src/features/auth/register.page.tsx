import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Register"
      form={<RegisterForm />}
      footer={
        <Fragment>
          Have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </Fragment>
      }
    />
  );
};

export const Component = RegisterPage;
