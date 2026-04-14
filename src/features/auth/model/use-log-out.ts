import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authService } from '@/shared/api/auth-service'
import { ROUTES } from '@/shared/model/routes'

export function useLogOut() {
  const queryClient = useQueryClient()
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
    isLoading: mutation.isPending,
  }
}
