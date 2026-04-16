import { useSessionStore } from '@/shared/model/session'
import { useAvatarUrl } from './use-avatar-url'
import { useProfile } from './use-profile'

export function useProfileAvatar() {
  const { user } = useSessionStore()
  const { profile, isLoading: isProfileLoading } = useProfile(user?.id)
  const { avatarUrl, isLoading: isAvatarLoading } = useAvatarUrl(
    profile?.avatar_url,
  )

  const isWaitingForProfile = isProfileLoading || isAvatarLoading

  const avatar
    = avatarUrl
      || (isWaitingForProfile ? undefined : user?.user_metadata?.avatar_url)

  return {
    avatar,
  }
}
