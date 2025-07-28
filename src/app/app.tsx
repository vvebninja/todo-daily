import { Header } from "@/components/header";
import { ROUTES } from "@/shared/routes";
import { Outlet, useLocation } from "react-router";

export function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === ROUTES.SIGN_UP || location.pathname === ROUTES.SIGN_IN;

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
