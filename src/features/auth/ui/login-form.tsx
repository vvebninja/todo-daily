import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/shared/ui/kit/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Spinner } from "@/shared/ui/kit/spinner";
import { useLogin } from "../model/use-login";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password  must be at least 8 characters."),
});

export function LoginForm() {
  const { login, errorMessage, isPending } = useLogin();

  const { handleSubmit, Field: LoginField } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      login(value);
    },
  });

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="gap-4 [&_div]:gap-2.5 [&_input]:h-11 [&_input]:text-[18px] [&_input::placeholder]:text-[18px] [&_label]:text-[16px]">
        <LoginField
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  placeholder="example@mail.com"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <LoginField
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  placeholder="********"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      {errorMessage && <p className="text-red text-sm">{errorMessage}</p>}
      <Field orientation="responsive" className="mt-4">
        <Button type="submit" disabled={isPending} className="mt-2 h-11 px-8 text-lg">
          {isPending && <Spinner />}
          Login
        </Button>
      </Field>
    </form>
  );
}
