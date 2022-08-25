import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  const thisPage = router.pathname;
  return (
    <ul>
      <li>
        <Link href="/">
          <a className={thisPage === "/" ? "nav__active" : ""}>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/posts/test-article">
          <a className={thisPage.includes("/posts") ? "nav__active" : ""}>
            Blog
          </a>
        </Link>
      </li>
      <li>
        <Link href="/listen">
          <a className={thisPage === "/listen" ? "nav__active" : ""}>Listen</a>
        </Link>
      </li>
    </ul>
  );
}
