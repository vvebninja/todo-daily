import { Link, href } from "react-router";
import { ROUTES } from "shared/model/routes";

const TodosPage = () => {
  return (
    <div>
      <Link to={href(ROUTES.TODO, { todoId: "3" })}>Todo 3</Link>
    </div>
  );
};

export const Component = TodosPage;
