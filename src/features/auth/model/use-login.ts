import type { ApiSchemas } from '@/shared/api/schema'

import { useNavigate } from 'react-router'
import { rqClient } from '@/shared/api/instance'
import { ROUTES } from '@/shared/model/routes'

export function useLogin() {
  const navigate = useNavigate()

  const loginMutation = rqClient.useMutation('post', '/auth/login', {
    onSuccess() {
      navigate(ROUTES.HOME)
    },
  })

  const login = (userCredentials: ApiSchemas['LoginRequest']) =>
    loginMutation.mutate({ body: userCredentials })

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined

  return {
    login,
    errorMessage,
    isPending: loginMutation.isPending,
  }
}
