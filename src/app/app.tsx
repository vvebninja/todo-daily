import { Outlet } from "react-router";
import { Providers } from "./providers/providers";

export function App() {
  return (
    <Providers>
      <div>
        <Outlet />
      </div>
    </Providers>
  );
}
