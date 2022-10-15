import Link from "next/link";
import { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function ReadMenu({ resetMenu }: { resetMenu: () => void }) {
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  const toggleCategory = () => {
    setCategoryExpanded(!categoryExpanded);
  };

  return (
    <div className="nav__menu__inner">
      <ul className="nav__menu__list">
        <li className="nav__menu__item">
          <button onClick={resetMenu}>
            <Link href="/about">
              <a>Latest Article</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button>
            <Link href="/about">
              <a>Random Article</a>
            </Link>
          </button>
        </li>
        <li className="nav__menu__item">
          <button onClick={toggleCategory}>
            <span>
              <span>Categories</span>
              {categoryExpanded ? <BiMinus /> : <BiPlus />}
            </span>
          </button>
        </li>
      </ul>
      {categoryExpanded && <CategoryList />}
    </div>
  );
}

const CategoryList = () => {
  return (
    <ul className="nav__menu__list">
      <li className="nav__menu__subitem">
        <button>
          <Link href="/about">
            <a>Art</a>
          </Link>
        </button>
      </li>
      <li className="nav__menu__subitem">
        <button>
          <Link href="/about">
            <a>Life</a>
          </Link>
        </button>
      </li>
      <li className="nav__menu__subitem">
        <button>
          <Link href="/about">
            <a>Philosophy</a>
          </Link>
        </button>
      </li>
      <li className="nav__menu__subitem">
        <button>
          <Link href="/about">
            <a>Society</a>
          </Link>
        </button>
      </li>
      <li className="nav__menu__subitem">
        <button>
          <Link href="/about">
            <a>Technology</a>
          </Link>
        </button>
      </li>
    </ul>
  );
};
