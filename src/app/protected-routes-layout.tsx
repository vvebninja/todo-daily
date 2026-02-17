import { ROUTES } from "@/shared/model/routes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shared/ui/kit/dropdown-menu";
import { Button } from "@/shared/ui/kit/button";
import { Calendar1 } from "lucide-react";
import { Navigate, Outlet } from "react-router";

const menuItems = [
  { icon: Calendar1, label: 'Today' },
  { icon: Calendar1, label: 'Yesterday' },
  { icon: Calendar1, label: 'Upcoming' }
]

export function ProtectedRoutesLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />
  }

  return (
    <div className="grow container mx-auto">
      <div className="hidden fixed top-[40%] left-2 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className='opacity-50 focus:opacity-100 hover:opacity-100'>
            <Button size='icon'><Calendar1 /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='bg-muted'>
            <DropdownMenuGroup >
              {menuItems.map(item => (
                <DropdownMenuItem key={item.label} className='focus:text-primary'>
                  <item.icon className='hover:text-primary' /> {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Outlet />
    </div>
  )
}

