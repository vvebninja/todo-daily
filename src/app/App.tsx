import { Outlet } from "react-router";
import { CONFIG } from "shared/model/config";

export function App() {
  return (
    <div>
      <div>{CONFIG.API_BASE_URL}</div>
      <Outlet />
    </div>
  );
}
