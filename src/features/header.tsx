import { ROUTES } from "@/shared/model/routes";
import AppLogo from "@/shared/ui/app-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/kit/dropdown-menu";
import { CircleUserRound, LogOutIcon, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="bg-primary">
      <div className="container mx-auto flex justify-between items-center h-21 px-4 bg-primary">
        <AppLogo />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:cursor-pointer"
            >
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.PROFILE}>
                  <CircleUserRound />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.PROFILE}>
                  <SlidersHorizontal />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary focus:text-primary hover:text-primary">
              <LogOutIcon className="text-primary" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
