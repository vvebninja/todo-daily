import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authService } from '@/shared/api/auth-service'
import { queryClient } from '@/shared/api/query-client'
import { ROUTES } from '@/shared/model/routes'

export function useLogOut() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate(ROUTES.LOGIN, { replace: true })
    },
  })

  return {
    logOut: () => mutation.mutate(),
    isLoggingOut: mutation.isPending,
  }
}
