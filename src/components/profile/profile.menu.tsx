import { logOutUser } from "@/shared/api";
import { ROUTES } from "@/shared/model";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router";

interface ProfileMenuProps {
  onClose: () => void;
}

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    navigate(ROUTES.LANDING, { replace: true });
    onClose();
  };

  return (
    <div
      className="absolute top-full mt-2 px-8 py-3 rounded-[0.7rem] bg-white shadow-2xl max-sm:-right-[50%]"
      id="user-menu-floating"
      role="menu"
    >
      <button
        onClick={handleLogout}
        className="flex gap-3 cursor-pointer hover:text-accent focus:text-accent transition-colors duration-300"
      >
        <CgLogOut
          size={25}
          className="text-accent"
        />
        <span>Logout</span>
      </button>
    </div>
  );
}

export { ProfileMenu };
