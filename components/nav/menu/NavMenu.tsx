import { useEffect } from "react";
import AboutMenu from "./AboutMenu";
import ListenMenu from "./ListenMenu";
import ReadMenu from "./ReadMenu";
import UserMenu from "./UserMenu";

export default function NavMenu({
  menuType,
  resetMenu,
}: {
  menuType: string;
  resetMenu: () => void;
}) {
  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        resetMenu();
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, [resetMenu]);

  return (
    <>
      <div className="nav__menu">
        <InnerMenu menuType={menuType} resetMenu={resetMenu} />
      </div>
      <div className="nav__menu--underlay" onClick={resetMenu} />
    </>
  );
}

const InnerMenu = ({
  menuType,
  resetMenu,
}: {
  menuType: string;
  resetMenu: () => void;
}) => {
  switch (menuType) {
    case "about":
      return <AboutMenu resetMenu={resetMenu} />;
    case "listen":
      return <ListenMenu resetMenu={resetMenu} />;
    case "read":
      return <ReadMenu resetMenu={resetMenu} />;
    case "user":
      return <UserMenu resetMenu={resetMenu} />;
    default:
      return null;
  }
};
