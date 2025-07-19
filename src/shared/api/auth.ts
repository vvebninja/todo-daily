import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { redirect } from "react-router";
import { ROUTES } from "../model";
import { auth } from "./config";

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

async function logOutUser() {
  await signOut(auth);
}

function onAuthStateChange(callback: (user: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}

function getCurrentUserPromise(): Promise<User | null> {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChange(user => {
      unsubscribe();
      resolve(user);
    });
  });
}

async function publicRoutesLoader() {
  const user = await getCurrentUserPromise();

  if (user) {
    return redirect(ROUTES.TODOS);
  }

  return null;
}

async function protectedRoutesLoader() {
  const user = await getCurrentUserPromise();

  if (!user) {
    return redirect(ROUTES.LANDING);
  }

  return null;
}

export {
  getCurrentUserPromise,
  publicRoutesLoader,
  protectedRoutesLoader,
  logOutUser,
  signInWithGoogle,
  onAuthStateChange,
};
