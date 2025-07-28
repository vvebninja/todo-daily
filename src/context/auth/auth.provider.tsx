import { UseFirebaseAuthReturnType, useFirebaseAuth } from "@/shared/firebase/auth";
import { createContext, useContext } from "react";

const AuthContext = createContext<UseFirebaseAuthReturnType | undefined>(undefined);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const authService = useFirebaseAuth();

  return <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>;
};

const useAuth = (): UseFirebaseAuthReturnType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
