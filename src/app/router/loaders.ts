import { getCurrentUserPromise } from "@/shared/api";
import { ROUTES } from "@/shared/model";
import { redirect } from "react-router";

async function publicRoutesLoader() {
  const user = await getCurrentUserPromise();
  if (user) return redirect(ROUTES.TODOS);
}

async function protectedRoutesLoader() {
  const user = await getCurrentUserPromise();
  if (!user) return redirect(ROUTES.LANDING);
}

export { protectedRoutesLoader, publicRoutesLoader };
