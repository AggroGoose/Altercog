import Link from "next/link";

export default function AboutMenu({ resetMenu }) {
  return (
    <div className="nav__menu__inner">
      <ul className="nav__menu__list">
        <li className="nav__menu__item">
          <button onClick={resetMenu}>
            <Link href="/about">
              <a>About Altercog</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button>
            <Link href="/about">
              <a>Our Philosophy</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button>
            <Link href="/about/authors">
              <a>Our Authors</a>
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}
