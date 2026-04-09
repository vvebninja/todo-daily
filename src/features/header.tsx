import { CircleUserRound, LogOutIcon } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '@/shared/model/routes'
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
import { useUser } from './auth/model/use-user'

export function Header() {
  const { user, isLoadingUser } = useUser()
  const { logOut, isLoggingOut } = useLogOut()

  const avatar = user?.user_metadata?.picture ?? 'https://github.com/shadcn.png'

  return (
    <header className="bg-primary">
      <div className="container mx-auto flex h-21 items-center justify-between bg-primary px-4">
        <AppLogo />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="overflow-hidden rounded-full border border-transparent hover:border-muted focus-visible:border-muted"
            >
              <Avatar size="lg">
                {isLoadingUser
                  ? (
                      <Skeleton className="h-full w-full" />
                    )
                  : (
                      <>
                        <AvatarImage src={avatar} alt="shadcn" />
                        <AvatarFallback className="bg-purple-500">
                          LR
                        </AvatarFallback>
                      </>
                    )}
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
                <LogOutIcon className="size-5 text-primary" />
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
