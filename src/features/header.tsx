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

export function Header() {
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
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 transition-all">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.PROFILE}>
                  <CircleUserRound />
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="text-primary hover:text-primary focus:text-primary"
            >
              <Link to={ROUTES.LOGIN}>
                <LogOutIcon className="text-primary" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
