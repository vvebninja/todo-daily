import { logoAccentIcon, logoLightIcon } from "@/shared/icons/static";
import { Link, useLocation } from "react-router";
import { Profile } from "./profile";
import { ROUTES } from "@/shared/routes";
import { clsn } from "@/shared/utils/clsn";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { pathname } = useLocation();

  const isLandingPage = pathname === ROUTES.LANDING;
  const isTodosPage = pathname === ROUTES.TODOS;

  return (
    <header className={clsn(className, isTodosPage ? "bg-accent" : "bg-white")}>
      <section className="container mx-auto section-px py-5 flex items-center justify-between max-sm:flex-col max-sm:gap-10">
        <div className="flex items-center gap-4 font-secondary text-accent">
          <img
            src={isTodosPage ? logoLightIcon : logoAccentIcon}
            alt="logo"
          />
          <span className={clsn("text-4xl leading-9 ", isTodosPage ? "text-white" : "text-accent")}>Todo Daily</span>
        </div>

        {isLandingPage && (
          <ul className="text-[1.25rem] flex gap-5 max-sm:flex-col">
            <li>
              <Link
                to={ROUTES.SIGN_IN}
                className="px-4 py-2 w-full text-accent inline-block hover:text-black transition-colors duration-300"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.SIGN_UP}
                className="px-4 py-2 w-full inline-block hover:text-accent transition-colors duration-300"
              >
                Sign up
              </Link>
            </li>
          </ul>
        )}
        {isTodosPage && <Profile />}
      </section>
    </header>
  );
};
