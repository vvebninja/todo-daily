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
  title: ReactNode
  form: ReactNode
  footer?: ReactNode
}>

export function AuthLayout(props: AuthLayoutProps) {
  return (
    <main className="flex grow flex-col items-center px-4 pt-50">
      <Card className="w-full max-w-125 gap-8 rounded-[6px] p-10 pb-24">
        <CardHeader className="mb-8 gap-10">
          <AppLogo variant="secondary" />
          <CardTitle className="font-secondary text-2xl font-bold">
            {props.title}
          </CardTitle>
        </CardHeader>
        <CardContent>{props.form}</CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="flex gap-2 text-lg text-muted-foreground">
            {props.footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
