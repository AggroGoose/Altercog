import Image from "next/image";
import AltercogDef from "./AltercogDef";

export default function HeroSection({ children }) {
  return (
    <div className="home__hero">
      {children}
      <div className="home__hero--main main-grid">
        <div className="home__hero--def">
          <AltercogDef />
        </div>
        <div className="home__hero--img">
          <Image src="/ItsaMe.png" height={484} width={384} priority="true" />
        </div>
      </div>
    </div>
  );
}
