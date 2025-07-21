import { getCurrentUserPromise } from "@/shared/api";
import { firestore } from "@/shared/api/config";
import { type Todo } from "@/shared/global.types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

async function todosLoader() {
  const user = await getCurrentUserPromise(); // Wait for user info

  if (!user) {
    console.log("No user found, returning empty array.");
    return []; // If no user, no todos to fetch
  }

  try {
    const querySnapshot = await getDocs(
      query(
        collection(firestore, "todos", user.uid, "userTodos"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
      ),
    ); // Get the documents ONCE

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Todo[];
  } catch (error) {
    console.error("Error fetching todos in loader:", error);
    throw new Response("Failed to load todos", { status: 500 });
  }
}

export { todosLoader };
