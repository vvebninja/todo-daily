import { Calendar1 } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";

const menuItems = [
  { icon: Calendar1, label: "Today" },
  { icon: Calendar1, label: "Yesterday" },
  { icon: Calendar1, label: "Upcoming" },
];

export function ProtectedRoutesLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div className="container mx-auto grow">
      <div className="fixed top-[40%] left-2 hidden md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="opacity-50 hover:opacity-100 focus:opacity-100">
            <Button size="icon">
              <Calendar1 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-muted">
            <DropdownMenuGroup>
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.label} className="focus:text-primary">
                  <item.icon className="hover:text-primary" /> {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Outlet />
    </div>
  );
}
