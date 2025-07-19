import { logoutIcon } from "@/shared/icons/static";

function SignOutButton() {
  return (
    <button className="flex gap-3 text-xl cursor-pointer transition-all hover:text-accent">
      <img
        src={logoutIcon}
        alt="Logout icon"
      />
      logout
    </button>
  );
}

export default SignOutButton;
