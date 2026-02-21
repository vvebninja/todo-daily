import { Outlet, useLocation } from "react-router";
import { Header } from "@/features/header";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";

export function App() {
  const location = useLocation();
  const isPrivateRoute = location.pathname === ROUTES.TODOS || location.pathname === ROUTES.PROFILE;

  return (
    <Providers>
      {isPrivateRoute && <Header />}
      <div className="flex min-h-screen flex-col">
        <Outlet />
      </div>
    </Providers>
  );
}
