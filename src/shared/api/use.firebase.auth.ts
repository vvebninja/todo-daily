/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChange } from "./auth";
import { auth } from "./config";

export interface UseFirebaseAuthReturnType {
  user: User | null;
  error: string | null;
  clearError: () => void;
  isLoading: boolean;
  registerWithEmailPassword: (email: string, password: string) => Promise<User | null>;
  loginWithEmailPassword: (email: string, password: string) => Promise<User | null>;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
}

export function useFirebaseAuth(): UseFirebaseAuthReturnType {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(user => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  async function executeAuthOperation(operation: () => Promise<any>) {
    setIsLoading(true);
    setError(null);
    try {
      return await operation();
    } catch (error) {
      setError(getFriendlyErrorMessage(error));
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function registerWithEmailPassword(email: string, password: string): Promise<User | null> {
    return executeAuthOperation(async () => {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      return userCredentials.user;
    });
  }

  async function loginWithEmailPassword(email: string, password: string): Promise<User | null> {
    return executeAuthOperation(async () => {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      return userCredentials.user;
    });
  }

  async function loginWithGoogle(): Promise<User | null> {
    return executeAuthOperation(async () => {
      const userCredentials = await signInWithPopup(auth, new GoogleAuthProvider());
      return userCredentials.user;
    });
  }

  async function logout(): Promise<void> {
    return executeAuthOperation(async () => {
      await signOut(auth);
    });
  }

  const clearError = () => setError(null);

  return {
    loginWithGoogle,
    registerWithEmailPassword,
    loginWithEmailPassword,
    logout,
    user,
    error,
    clearError,
    isLoading,
  };
}

function getFriendlyErrorMessage(error: any): string {
  if (error && typeof error.code === "string") {
    switch (error.code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        return "This email is already in use. Try signing in or use a different email.";
      case AuthErrorCodes.INVALID_EMAIL:
        return "The email address is not valid.";
      case "auth/missing-password":
        return "Please enter your password to continue.";
      case AuthErrorCodes.WEAK_PASSWORD:
        return "The password is too weak. Please choose a stronger password (at least 6 characters).";
      case AuthErrorCodes.INVALID_PASSWORD:
        return "Invalid password";
      case AuthErrorCodes.NULL_USER:
        return "Invalid email or password.";
      case AuthErrorCodes.POPUP_CLOSED_BY_USER:
        return "Google sign-in popup was closed.";
      case AuthErrorCodes.POPUP_BLOCKED:
        return "Google sign-in popup was blocked by your browser. Please allow popups for this site.";

      default:
        return `An unexpected error occured: ${error.message}`;
    }
  }
  return "An unexpected error occured. Please try again.";
}
