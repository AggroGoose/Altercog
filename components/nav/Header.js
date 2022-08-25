import AltercogLogo from "../../lib/SVG/AltercogLogo";
import AltercogText from "../../lib/SVG/AltercogText";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <nav className="header">
      <div className="header__logo">
        <AltercogLogo />
      </div>
      <div className="header__text">
        <AltercogText />
      </div>
      <div className="header__nav">
        <Navigation />
      </div>
    </nav>
  );
}
