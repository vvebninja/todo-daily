import { getCurrentUserPromise } from "@/shared/firebase/auth";
import { ROUTES } from "@/shared/routes";
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
