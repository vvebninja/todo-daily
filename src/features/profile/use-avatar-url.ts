import { useQuery } from '@tanstack/react-query'
import { storageService } from '@/shared/api/storage-service'

export function useAvatarUrl(filePath?: string | null) {
  const query = useQuery({
    queryKey: ['avatar-url', filePath],
    queryFn: () => storageService.getPrivateUrl(filePath!),
    enabled: !!filePath,
    staleTime: 1000 * 60 * 50,
  })

  return {
    avatarUrl: query.data,
    isLoading: query.isLoading,
  }
}
