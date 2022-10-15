import React from "react";
import { useState } from "react";
import { BiHeadphone } from "react-icons/bi";
import { useSession, signIn } from "next-auth/react";
import Avatar from "./user/Avatar";
import SignIn from "./user/SignIn";
import { MenuProps } from "../../addl";

const NavRight = ({
  menuType,
  setIsMenuOpen,
  setMenuType,
  resetMenu,
}: MenuProps) => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const { data: session } = useSession();

  const handleListen = () => {
    if (menuType === "listen") {
      resetMenu();
      return;
    }

    resetMenu();
    setMenuType("listen");
    setIsMenuOpen(true);
  };

  const handleProfile = () => {
    if (menuType === "user") {
      resetMenu();
      return;
    }

    resetMenu();
    setMenuType("user");
    setIsMenuOpen(true);
  };

  const handleSignIn = () => {
    if (menuType === "signin") {
      resetMenu();
      return;
    }

    resetMenu();
    setMenuType("signin");
    setIsMenuOpen(true);
  };

  return (
    <div className="header__right">
      <button
        className={`header__right--button${musicPlaying ? " nav__active" : ""}${
          menuType === "listen" ? " drop__active" : ""
        }`}
        onClick={handleListen}
      >
        <div className="header__right--content">
          <BiHeadphone />
          <p>Listen</p>
        </div>
      </button>
      {session ? (
        <Avatar
          avatarLink={session.user?.image}
          handleProfile={handleProfile}
          menuType={menuType}
        />
      ) : (
        <SignIn signIn={signIn} />
      )}
    </div>
  );
};

export default NavRight;
