import Link from "next/link";

export default function ListenMenu({ resetMenu }: { resetMenu: () => void }) {
  return (
    <div className="nav__menu__inner">
      <ul className="nav__menu__list">
        <li className="nav__menu__item">
          <button>
            <a href="#">Feature Coming Soon!</a>
          </button>
        </li>
      </ul>
    </div>
  );
}
