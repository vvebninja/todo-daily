import { User } from "firebase/auth";
import { auth } from "./config";

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

export { getCurrentUserPromise, onAuthStateChange };
