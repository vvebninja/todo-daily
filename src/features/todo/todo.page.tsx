import { useParams } from "react-router";
import type { PathParams, ROUTES } from "shared/model/routes";

function TodoPage() {
  const params = useParams<PathParams[typeof ROUTES.TODO]["params"]>();

  return <div>{params.todoId}</div>;
}

export const Component = TodoPage;
