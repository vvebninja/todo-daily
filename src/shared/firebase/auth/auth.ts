import { connectAuthEmulator, getAuth, User } from "firebase/auth";
import { getFirebaseApp } from "../firebase.config";

export const auth = getAuth(getFirebaseApp());

if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true") {
  connectAuthEmulator(auth, `http://localhost:9099`);
  console.log("[Firabase Auth Emulator] Connected to http://localhost:9099");
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}

export function getCurrentUserPromise(): Promise<User | null> {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChange(user => {
      unsubscribe();
      resolve(user);
    });
  });
}
