import AltercogText from "../../lib/SVG/AltercogText";
import Link from "next/link";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";
import { useState } from "react";
import NavMenu from "./menu/NavMenu";
import ModalPortal from "../modalPortal";
import InfoBanner from "./InfoBanner";
import { useBanner } from "../../lib/context/BannerContext";
import { MenuProps } from "../../addl";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuType, setMenuType] = useState("");
  const infoBanner = useBanner();

  const resetMenu = () => {
    setIsMenuOpen(false);
    setMenuType("");
  };

  return (
    <MenuCheck
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      menuType={menuType}
      setMenuType={setMenuType}
      resetMenu={resetMenu}
      infoBanner={infoBanner}
    />
  );
}

const MenuCheck = ({
  isMenuOpen,
  setIsMenuOpen,
  menuType,
  setMenuType,
  resetMenu,
  infoBanner,
}: MenuProps) => {
  if (isMenuOpen) {
    return (
      <ModalPortal>
        <NavHead
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          menuType={menuType}
          setMenuType={setMenuType}
          resetMenu={resetMenu}
          infoBanner={infoBanner}
        />
      </ModalPortal>
    );
  } else {
    return (
      <NavHead
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuType={menuType}
        setMenuType={setMenuType}
        resetMenu={resetMenu}
        infoBanner={infoBanner}
      />
    );
  }
};

const NavHead = ({
  isMenuOpen,
  setIsMenuOpen,
  menuType,
  setMenuType,
  resetMenu,
  infoBanner,
}: MenuProps) => {
  return (
    <nav className={`header${isMenuOpen ? " isModal" : ""}`}>
      <div className="header__content">
        <Link href="/">
          <a className="header__text" onClick={resetMenu}>
            <AltercogText />
          </a>
        </Link>
        <NavCenter
          setIsMenuOpen={setIsMenuOpen}
          menuType={menuType}
          setMenuType={setMenuType}
          resetMenu={resetMenu}
        />
        <NavRight
          setIsMenuOpen={setIsMenuOpen}
          menuType={menuType}
          setMenuType={setMenuType}
          resetMenu={resetMenu}
        />
        {isMenuOpen && <NavMenu menuType={menuType} resetMenu={resetMenu} />}
      </div>
      {infoBanner && <InfoBanner infoBanner={infoBanner} />}
    </nav>
  );
};
