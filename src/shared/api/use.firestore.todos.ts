import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Todo } from "../global.types";
import { auth, firestore } from "./config";

interface UseFirestoreTodosReturn {
  liveTodos: Todo[];
  addTodo: (todo: Pick<Todo, "title" | "description">) => void;
  deleteTodo: (id: Todo["id"]) => void;
  toggleComplete: (id: Todo["id"], isCompleted: Todo["isCompleted"]) => void;
  updateField: (
    id: Todo["id"],
    field: keyof Pick<Todo, "title" | "description">,
    text: string,
  ) => void;
  isLoading: boolean;
  error: Error | null;
}

function useFirestoreTodos(initialTodos: Todo[]): UseFirestoreTodosReturn {
  const [liveTodos, setLiveTodos] = useState<Todo[]>(initialTodos);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      setLiveTodos([]);
      return setIsLoading(false);
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "todos", currentUser.uid, "userTodos"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
      ),
      querySnaptshot => {
        setLiveTodos(
          querySnaptshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Todo[],
        );
        setIsLoading(false);
      },
      error => {
        setError(error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [currentUser]);

  const addTodo = async (todo: Pick<Todo, "title" | "description">) => {
    if (!currentUser) return;
    await addDoc(collection(firestore, "todos", currentUser.uid, "userTodos"), {
      userId: currentUser.uid,
      createdAt: Timestamp.now(),
      isCompleted: false,
      ...todo,
    });
  };

  const deleteTodo = async (id: Todo["id"]) => {
    if (!currentUser) return;
    await deleteDoc(doc(firestore, "todos", currentUser.uid, "userTodos", id));
  };

  const toggleComplete = async (id: Todo["id"], isCompleted: Todo["isCompleted"]) => {
    if (!currentUser) return;
    await updateDoc(doc(firestore, "todos", currentUser.uid, "userTodos", id), { isCompleted });
  };

  const updateField = async (
    id: Todo["id"],
    field: keyof Pick<Todo, "title" | "description">,
    text: string,
  ) => {
    if (!currentUser) return;
    await updateDoc(doc(firestore, "todos", currentUser.uid, "userTodos", id), { [field]: text });
  };

  return { liveTodos, addTodo, deleteTodo, toggleComplete, updateField, isLoading, error };
}

export { useFirestoreTodos };
