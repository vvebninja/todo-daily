import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/shared/ui/kit/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Spinner } from "@/shared/ui/kit/spinner";
import { useRegister } from "../model/use-register";

const RegisterSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password  must be at least 8 characters.")
      .refine((pwd) => /[A-Z]/.test(pwd), {
        error: "Must include an uppercase letter",
        abort: true,
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const { register, errorMessage, isPending } = useRegister();

  const { handleSubmit, Field: RegisterField } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      register(value);
    },
  });

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup className="gap-4 [&_div]:gap-2.5 [&_input]:h-11 [&_input]:text-[18px] [&_input::placeholder]:text-[18px] [&_label]:text-[16px]">
        <RegisterField
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
                  placeholder="example@email.com"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <RegisterField
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
                  placeholder="********"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <RegisterField
          name="confirmPassword"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="********"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <Field orientation="responsive" className="mt-4">
        <Button type="submit" disabled={isPending} className="mt-2 h-11 px-8 text-lg">
          {isPending && <Spinner />}
          Register
        </Button>
      </Field>
    </form>
  );
}
