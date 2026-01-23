import { Outlet } from "react-router";
import { CONFIG } from "shared/model/config";
import { Providers } from "./providers/providers";

export function App() {
  return (
    <Providers>
      <div>
        <div>{CONFIG.API_BASE_URL}</div>
        <Outlet />
      </div>
    </Providers>
  );
}
