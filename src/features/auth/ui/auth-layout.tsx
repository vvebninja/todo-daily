import type { ReactNode } from 'react'

import AppLogo from '@/shared/ui/app-logo'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card'

type AuthLayoutProps = Readonly<{
  title?: ReactNode
  form: ReactNode
  footer?: ReactNode
}>

export function AuthLayout(props: AuthLayoutProps) {
  return (
    <main className="flex grow flex-col items-center px-4 pt-50">
      <div className="bg-primary absolute -z-1 h-50 w-50 rounded-full blur-[120px]" />
      <Card className="w-full max-w-125 gap-8 rounded-[6px] p-10 shadow-2xl">
        <CardHeader className="mb-10 justify-center gap-10">
          <AppLogo variant="secondary" className="bg-transparent" />
          {props.title && (
            <CardTitle className="font-secondary text-2xl font-bold">
              {props.title}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>{props.form}</CardContent>

        <CardFooter className="flex items-center justify-center">
          <p className="text-muted-foreground flex gap-2 text-lg">
            {props.footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
