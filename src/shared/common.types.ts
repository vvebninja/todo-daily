import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type Todo = {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  isCompleted: boolean;
};

export type TodoFields = Pick<Todo, "title" | "description">;

export type FirebaseUser = User | null;
