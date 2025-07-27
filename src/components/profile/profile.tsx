import { clsn } from "@/shared/utils/clsn";
import { useEffect, useRef, useState } from "react";
import { ProfileMenu } from "./profile.menu";
import { useAuth } from "@/context/auth";

interface ProfileProps {
  className?: string;
}

function Profile({ className }: ProfileProps) {
  const { user } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleToggleMenu = () => setIsMenuVisible(prev => !prev);
  const handleCloseMenu = () => setIsMenuVisible(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        handleCloseMenu();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        handleCloseMenu();
      }
    };

    if (isMenuVisible) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isMenuVisible]);

  const profileImageSrc = user?.photoURL || "https://placehold.co/55x55";
  const profileName = user?.displayName || user?.email;

  return (
    <div
      className={clsn(className, "relative flex gap-2 items-center")}
      ref={profileRef}
      tabIndex={0}
    >
      {user?.displayName && (
        <span className="font-secondary text-white sm:inline-block">{profileName}</span>
      )}
      <button
        className="bg-gray-200 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={handleToggleMenu}
        aria-label={!isMenuVisible ? "Show profile menu" : "Hide profile menu"}
        aria-haspopup="menu"
        aria-controls="user-menu-floating"
        aria-expanded={isMenuVisible}
      >
        <img
          className="object-cover w-full h-full"
          src={profileImageSrc}
          alt="Profile image"
        />
      </button>
      {isMenuVisible && <ProfileMenu onClose={handleCloseMenu} />}
    </div>
  );
}

export { Profile };
