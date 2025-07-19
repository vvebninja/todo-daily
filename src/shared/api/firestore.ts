import { Timestamp } from "firebase/firestore";

interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  isCompleted: boolean;
}

export { type Todo };
