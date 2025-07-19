import { Header } from "@/components/header";
import { Outlet } from "react-router";

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
