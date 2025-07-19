import { signInWithGoogle } from "@/shared/api";
import { ROUTES } from "@/shared/model";
import { SocialButton } from "@/shared/ui/social.button";
import { useNavigate } from "react-router";

function AuthPage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(ROUTES.TODOS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to sign-in with Google: ", error);
    }
  };

  return (
    <section className="section-px">
      <div
        className="container mx-auto mt-52 max-w-lg rounded-[0.375rem] border 
      border-[#d2d2d2] bg-white p-10 pb-23 shadow-2xl"
      >
        <h2 className="mb-10 font-secondary text-2xl font-bold text-black">Continue with:</h2>
        <div className="flex justify-center">
          <SocialButton
            iconName="google"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
    </section>
  );
}

export const Component = AuthPage;
