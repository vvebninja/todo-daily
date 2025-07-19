import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange } from "@/shared/api";

interface SessionContextType {
  currentUser: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<SessionContextType["currentUser"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(user => {
      setCurrentUser(user);
      setIsLoading(false);
      console.log(user);
    });

    return unsubscribe;
  }, []);

  return (
    <SessionContext.Provider value={{ currentUser, isLoading }}>{children}</SessionContext.Provider>
  );
};

const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

export { SessionProvider, useSession };
