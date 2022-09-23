import Link from "next/link";
import { useRouter } from "next/router";
import { BiBookHeart, BiHome, BiPlanet } from "react-icons/bi";

const NavCenter = ({ menuType, setIsMenuOpen, setMenuType, resetMenu }) => {
  const router = useRouter();
  const thisPage = router.pathname;

  const handleReadMenu = () => {
    if (menuType === "read") {
      resetMenu();
      return;
    }
    resetMenu();
    setIsMenuOpen(true);
    setMenuType("read");
  };

  const handleAboutMenu = () => {
    if (menuType === "about") {
      resetMenu();
      return;
    }
    resetMenu();
    setIsMenuOpen(true);
    setMenuType("about");
  };

  return (
    <nav className={`header__center`}>
      <button
        className={`header__center--button${
          thisPage === "/" ? " nav__active" : ""
        }`}
        onClick={resetMenu}
      >
        <Link href="/">
          <a>
            <BiHome />
            <p>Home</p>
          </a>
        </Link>
      </button>
      <button
        className={`header__center--button${
          thisPage.includes("/articles") ? " nav__active" : ""
        }${menuType === "read" ? " drop__active" : ""}`}
        onClick={handleReadMenu}
      >
        <div className="header__center--content">
          <BiBookHeart />
          <p>Read</p>
        </div>
      </button>

      <button
        className={`header__center--button${
          thisPage.includes("/about") ? " nav__active" : ""
        }${menuType === "about" ? " drop__active" : ""}`}
        onClick={handleAboutMenu}
      >
        <div className="header__center--content">
          <BiPlanet />
          <p>About</p>
        </div>
      </button>
    </nav>
  );
};

export default NavCenter;
