import Image from "next/image";
import parseImageCard from "./helpers/parseImageCard";

import { ParseElement } from "../../../addl";

export default function GalleryImageCard({
  elem,
  setViewModal,
  imgNumber,
  imgID,
}: {
  elem: ParseElement;
  setViewModal: (arg: boolean) => void;
  imgNumber: React.MutableRefObject<any>;
  imgID: string;
}) {
  const parsed = parseImageCard(elem);

  if (!parsed) return null;

  const imgSrc = parsed.imgSrc;
  const imgWidth = parsed.imgWidth;
  const imgHeight = parsed.imgHeight;

  if (!imgSrc?.src) return null;

  function handleModal() {
    imgNumber.current = imgID;
    setViewModal(true);
  }
  return (
    <div
      className="kg-gallery-image"
      style={{ flex: `${imgWidth / imgHeight} 1 0%` }}
      onClick={handleModal}
    >
      <Image
        src={imgSrc.src}
        alt={imgSrc.alt}
        width={imgWidth}
        height={imgHeight}
      />
    </div>
  );
}
