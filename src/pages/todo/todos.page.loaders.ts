import { Todo } from "@/shared/common.types";
import { getCurrentUserPromise } from "@/shared/firebase/auth";
import { getTodosColectionRef } from "@/shared/firebase/firestore";
import { getDocs, query, where, orderBy } from "firebase/firestore";

export async function todosLoader() {
  const user = await getCurrentUserPromise();

  if (!user) {
    return [];
  }

  try {
    const querySnapshot = await getDocs(
      query(getTodosColectionRef(user), where("userId", "==", user.uid), orderBy("createdAt", "desc")),
    );

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];
  } catch {
    throw new Response("Failed to load todos", { status: 500 });
  }
}
