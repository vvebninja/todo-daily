import { AuthLayout } from './ui/auth-layout'
import { LogInWithGoogleBtn } from './ui/log-in-with-google-btn'

function LoginPage() {
  return <AuthLayout form={<LogInWithGoogleBtn />} />
}

export const Component = LoginPage
