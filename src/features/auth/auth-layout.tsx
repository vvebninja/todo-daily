import { type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/kit/card.tsx";

export const AuthLayout = ({
  title,
  description,
  form,
  footerText,
}: {
  title: ReactNode;
  description: ReactNode;
  form: ReactNode;
  footerText: ReactNode;
}) => {
  return (
    <main className="grow flex flex-col items-center pt-50">
      <Card className="w-full max-w-100">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="flex gap-2 text-muted-foreground text-sm [&_a]:underline [&_a]:text-primary">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};
