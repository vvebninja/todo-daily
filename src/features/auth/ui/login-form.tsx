import { Button } from "@/shared/ui/kit/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useLogin } from "../model/use-login";
import { Spinner } from "@/shared/ui/kit/spinner";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password  must be at least 8 characters."),
});

export function LoginForm() {
  const { login, isPending } = useLogin()

  const { handleSubmit, Field: LoginField } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => { login(value) },
  });

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="gap-6 [&_div]:gap-2.5 [&_input]:h-11 [&_input]:text-[18px] [&_input::placeholder]:text-[18px] [&_label]:text-[16px]">
        <LoginField
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
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
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
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

      <Field orientation="responsive" className="mt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 mt-2 px-8 text-lg focus:cursor-pointer hover:cursor-pointer"
        >
          {isPending && <Spinner />}Login
        </Button>
      </Field>
    </form>
  );
}
