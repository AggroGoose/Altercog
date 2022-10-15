import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserMenu({ resetMenu }: { resetMenu: () => void }) {
  const signOutHandler = () => {
    signOut();
    resetMenu();
  };

  return (
    <div className="nav__menu__inner">
      <ul className="nav__menu__list">
        <li className="nav__menu__item">
          <button onClick={resetMenu}>
            <Link href="/user/favorites">
              <a>My Favorites</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button>
            <Link href="/user/read-later">
              <a>Read Later</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button>
            <Link href="/user/settings">
              <a>User Settings</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button onClick={signOutHandler}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}
