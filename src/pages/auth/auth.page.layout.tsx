import { useAuth } from "@/context/auth";
import { ROUTES } from "@/shared/model";
import { Logo } from "@/shared/ui/logo";
import { SocialButton } from "@/shared/ui/social.button";
import { Link, useLocation, useNavigate } from "react-router";

function AuthPageLayout({ title, children }: React.PropsWithChildren<{ title: string }>) {
  const { loginWithGoogle, error: firebaseError, isLoading: firebaseIsLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    await loginWithGoogle();
    navigate(ROUTES.TODOS, { replace: true });
  };

  return (
    <section className="section-px h-screen flex flex-col justify-center">
      <div
        className="w-full max-w-[26rem] container mx-auto px-2 py-4 rounded-[0.375rem] border 
      border-[#d2d2d2] bg-white shadow-2xl sm:p-6"
      >
        <Logo
          theme="accent"
          className="mb-10"
        />
        <h2 className="mb-10 font-secondary text-2xl font-bold text-black">{title}</h2>
        {children}

        <div className="h-[1px] mb-10 bg-gray-200" />
        <div className="flex justify-center">
          <SocialButton
            label="Continue with Google"
            iconName="google"
            onClick={handleGoogleSignIn}
            disabled={firebaseIsLoading}
            className="mb-10 disabled:opacity-45"
          />
          {firebaseError && <p className="text-red-500 mt-2 text-center">{firebaseError}</p>}
        </div>

        <div className="text-center">
          {location.pathname === ROUTES.SIGN_UP ? (
            <>
              <span className="mr-3">Have an account?</span>
              <Link
                to={ROUTES.SIGN_IN}
                className="text-accent hover:text-red-600 transition-colors duration-300"
              >
                SignIn
              </Link>
            </>
          ) : (
            <>
              <span className="mr-3">Don't have an account?</span>
              <Link
                to={ROUTES.SIGN_UP}
                className="text-accent hover:text-red-600 transition-colors duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export { AuthPageLayout };
