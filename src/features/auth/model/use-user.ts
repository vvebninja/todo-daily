import { useQuery } from '@tanstack/react-query'
import { supabaseClientInstance } from '@/shared/api/instances'

export function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabaseClientInstance.auth.getUser()

      if (error) {
        throw error
      }

      return user
    },
    staleTime: Infinity,
  })

  return {
    user: query.data,
    isLoading: query.isPending,
  }
}
