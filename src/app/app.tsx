import { Outlet, useLocation } from "react-router";
import { Providers } from "./providers/providers";
import { Header } from "@/features/header";
import { ROUTES } from "@/shared/model/routes";

export function App() {
  const location = useLocation();
  const isPrivateRoute =
    location.pathname === ROUTES.TODOS || location.pathname === ROUTES.PROFILE;

  return (
    <Providers>
      {isPrivateRoute && <Header />}
      <div className="flex flex-col min-h-screen">
        <Outlet />
      </div>
    </Providers>
  );
}
