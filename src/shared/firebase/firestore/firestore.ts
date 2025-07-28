import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  CollectionReference,
  doc,
} from "firebase/firestore";
import { getFirebaseApp } from "../firebase.config";
import type { FirebaseUser, Todo } from "@/shared/common.types";

export const db = getFirestore(getFirebaseApp());

if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true") {
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("[Firestore Emulator] Connected to http://localhost:8080");
}

export function getTodosColectionRef(user: FirebaseUser): CollectionReference {
  if (!user?.uid) {
    throw new Error("Cannot get todos collection: user or user.uid is missing");
  }
  return collection(db, "todos", user.uid, "userTodos");
}

export function getTodoDocRef(user: FirebaseUser, id: Todo["id"]) {
  if (!user?.uid) {
    throw new Error("Cannot get todo doc ref: user or user.uid is missing");
  }
  if (!id) {
    throw new Error("Cannot get todo doc ref: todo ID is missing");
  }

  return doc(db, "todos", user.uid, "userTodos", id);
}
