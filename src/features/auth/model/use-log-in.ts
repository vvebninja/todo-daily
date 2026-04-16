import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/shared/api/auth-service'
import { ROUTES } from '@/shared/model/routes'

export function useLogIn() {
  const mutation = useMutation({
    mutationFn: () =>
      authService.signInWithGoogle({ redirectTo: ROUTES.TODOS }),
    onError: () => {
      toast.error('Log in failed. Please try again later.')
    },
  })

  return {
    logInWithGoogle: () => mutation.mutate(),
    isLoading: mutation.isPending,
    error: mutation.error,
  }
}
