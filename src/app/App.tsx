import { Outlet } from "react-router";
import { Providers } from "./providers/providers";

export function App() {
  return (
    <Providers>
      <header className="h-12 bg-[#ff4f5a]">
        
      </header>
      <div>
        <Outlet />
      </div>
    </Providers>
  );
}
