import AppLogo from "@/shared/ui/app-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import type { ReactNode } from "react";

export function AuthLayout(props: {
  title: ReactNode;
  form: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grow flex flex-col items-center pt-40 px-4">
      <Card className="gap-10 max-w-125 w-full p-10 pb-24 rounded-[6px]">
        <CardHeader className='gap-10'>
          <AppLogo  />
          <CardTitle className="text-2xl">
            {props.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="">{props.form}</CardContent>
        <CardFooter className="flex justify-center items-center">
          <p className="text-lg text-muted-foreground [&_a]:underline">
            {props.footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
