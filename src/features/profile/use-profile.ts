import { useQuery } from '@tanstack/react-query'
import { supabaseClientInstance } from '@/shared/api/instance'

export function useProfile(userId?: string) {
  const query = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabaseClientInstance
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        throw error
      }
      return data
    },
    enabled: !!userId,
  })

  return {
    isLoading: query.isLoading,
    profile: query.data,
  }
}
