import { Menu } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../model/routes";

export default function AppLogo() {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-1 text-4xl text-accent font-extrabold "  >
      <div className="flex items-center w-10 h-10 pl-3 pr-1 bg-accent text-white rounded-sm">
        <Menu className="stroke-4" />
      </div>
      Todo Daily
    </Link>
  )
}

