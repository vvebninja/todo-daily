import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authService } from '@/shared/api/auth-service'
import { ROUTES } from '@/shared/model/routes'

export function useLogIn() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: authService.signInWithGoogle,
    onSuccess: () => navigate(ROUTES.TODOS, { replace: true }),
  })

  return {
    logInWithGoogle: () => mutation.mutate(),
    isLoggingIn: mutation.isPending,
    error: mutation.error,
  }
}
