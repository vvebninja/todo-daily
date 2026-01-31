import type { PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router";

function TodoPage() {
  const params = useParams<PathParams[typeof ROUTES.TODO]["params"]>();

  return <div>{params.todoId}</div>;
}

export const Component = TodoPage;
