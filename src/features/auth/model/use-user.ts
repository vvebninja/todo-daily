import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authService } from '@/shared/api/auth-service'

export function useUser() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    staleTime: Infinity,
  })

  useEffect(() => {
    const subscription = authService.onAuthChange((user) => {
      queryClient.setQueryData(['user'], user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient])

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
  }
}
