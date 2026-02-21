import type { ReactNode } from "react";
import AppLogo from "@/shared/ui/app-logo";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/kit/card";

export function AuthLayout(props: { title: ReactNode; form: ReactNode; footer: ReactNode }) {
  return (
    <main className="flex grow flex-col items-center px-4 pt-25">
      <Card className="w-full max-w-125 gap-8 rounded-[6px] p-10 pb-24">
        <CardHeader className="gap-10">
          <AppLogo variant="secondary" />
          <CardTitle className="font-secondary text-2xl font-bold">{props.title}</CardTitle>
        </CardHeader>
        <CardContent className="">{props.form}</CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="text-muted-foreground text-lg">{props.footer}</p>
        </CardFooter>
      </Card>
    </main>
  );
}
