import { CircleUserRound, LogOutIcon } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '@/shared/model/routes'
import { useSessionStore } from '@/shared/model/session.ts'
import AppLogo from '@/shared/ui/app-logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit/avatar'
import { Button } from '@/shared/ui/kit/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu'
import { Skeleton } from '@/shared/ui/kit/skeleton'
import { Typography } from '@/shared/ui/typography'
import { useLogOut } from './auth/model/use-log-out'
import { useAvatarUrl } from './profile/use-avatar-url'
import { useProfile } from './profile/use-profile'

export function Header() {
  const { user } = useSessionStore()
  const { logOut, isLoading: isLoggingOut } = useLogOut()
  const { profile } = useProfile(user?.id)
  const { avatarUrl } = useAvatarUrl(profile?.avatar_url)

  const avatar = avatarUrl ?? user?.user_metadata?.avatar_url

  return (
    <header className="bg-primary">
      <div className="bg-primary container mx-auto flex h-21 items-center justify-between px-4">
        <AppLogo />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="hover:border-muted focus-visible:border-muted overflow-hidden rounded-full border border-transparent"
            >
              <Avatar size="lg">
                <AvatarImage src={avatar} alt="User profile avatar" />
                <AvatarFallback asChild>
                  <Skeleton className="h-full w-full rounded-full" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40 transition-all">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.PROFILE}>
                  <CircleUserRound className="size-5" />
                  <Typography as="span">Profile</Typography>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="text-primary hover:text-primary focus:text-primary"
            >
              <Button
                variant="ghost"
                onClick={logOut}
                disabled={isLoggingOut}
                className="flex w-full justify-start"
              >
                <LogOutIcon className="text-primary size-5" />
                <Typography as="span" color="primary">
                  Logout
                </Typography>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
