import { LogOutIcon } from 'lucide-react'
import { cn } from '@/shared/lib/css.ts'
import { ThemeToggle } from '@/shared/theme'
import AppLogo from '@/shared/ui/app-logo'
import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar'
import { Button } from '@/shared/ui/kit/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown-menu'
import { Typography } from '@/shared/ui/typography'
import { useLogOut } from './auth/model/use-log-out'

export function Header() {
  const { logOut, isLoading } = useLogOut()

  return (
    <header className="bg-primary">
      <div className="bg-primary container mx-auto flex h-21 items-center justify-between px-4">
        <AppLogo />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className={cn(
                  'from-primary to-primary border-2 bg-radial via-white',
                  'hover:border-muted focus-visible:border-muted border-white',
                  'overflow-hidden rounded-full',
                )}
              >
                <Avatar size="lg">
                  <AvatarImage
                    src="/public/user-avatar.jpg"
                    alt="User profile avatar"
                    className="object-cover"
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 transition-all">
              <DropdownMenuItem
                asChild
                className="text-primary hover:text-primary focus:text-primary"
              >
                <Button
                  variant="ghost"
                  onClick={logOut}
                  disabled={isLoading}
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
      </div>
    </header>
  )
}
