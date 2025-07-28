import { ROUTES } from "@/shared/routes";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME}>Go Back</Link>
    </div>
  );
}

export const Component = NotFoundPage;
