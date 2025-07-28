import type { FirebaseUser, Todo, TodoFields } from "@/shared/common.types";
import { addDoc, deleteDoc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getTodoDocRef, getTodosColectionRef } from "./firestore";

interface UseFirestoreTodosReturn {
  liveTodos: Todo[];
  addTodo: (todo: TodoFields) => void;
  deleteTodo: (id: Todo["id"]) => void;
  toggleComplete: (id: Todo["id"], isCompleted: Todo["isCompleted"]) => void;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to manage Firestore todos for a given user.
 * Automatically listens to real-time updates.
 */

export function useFirestoreTodos(user: FirebaseUser, initialTodos: Todo[] = []): UseFirestoreTodosReturn {
  const [liveTodos, setLiveTodos] = useState<Todo[]>(initialTodos);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset state when user logs out
    if (!user) {
      setLiveTodos([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    let isCancelled = false;

    try {
      const unsubscribe = onSnapshot(
        query(getTodosColectionRef(user), where("userId", "==", user.uid), orderBy("createdAt", "desc")),
        querySnaptshot => {
          if (isCancelled) return;

          const todos = querySnaptshot.docs.map((doc): Todo => {
            return {
              id: doc.id,
              ...doc.data(),
            } as Todo;
          });

          setLiveTodos(todos);
          setIsLoading(false);
        },
        error => {
          console.error("[Firestore] Error in todos listener:", error);
          if (isCancelled) return;
          setError(error);
          setIsLoading(false);
        },
      );

      return () => {
        isCancelled = true;
        unsubscribe();
      };
    } catch (error) {
      if (isCancelled) return;
      const err = error instanceof Error ? error : new Error("Unknow error setting up Firestore listener");
      console.error("[Firestore] Failed to set up listener:", err);
      setError(err);
      setIsLoading(false);
    }
  }, [user]);

  async function withUser<T>(callback: (user: NonNullable<FirebaseUser>) => Promise<T>): Promise<void> {
    if (!user?.uid) {
      console.warn("[useFirestoreTodos] Action blocked: user is not authenticated");
      return;
    }
    try {
      await callback(user);
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Firestore operation failed");
      console.log("[Firestore] Operation failed:", err);
      setError(err);
    }
  }

  async function addTodo(todo: TodoFields) {
    await withUser(async user => {
      await addDoc(getTodosColectionRef(user), {
        userId: user.uid,
        createdAt: Timestamp.now(),
        isCompleted: false,
        ...todo,
      });
    });
  }

  const deleteTodo = async (id: Todo["id"]) => {
    if (!user) return;
    await deleteDoc(getTodoDocRef(user, id));
  };

  const toggleComplete = async (id: Todo["id"], isCompleted: Todo["isCompleted"]) => {
    await withUser(async user => {
      await updateDoc(getTodoDocRef(user, id), { isCompleted });
    });
  };

  return { liveTodos, addTodo, deleteTodo, toggleComplete, isLoading, error };
}
