import Image from "next/image";
import parseImageCard from "./helpers/parseImageCard";

export default function GalleryImageCard({
  elem,
  setViewModal,
  imgNumber,
  imgID,
}) {
  const { imgSrc, imgWidth, imgHeight } = parseImageCard(elem);

  function handleModal() {
    console.log(elem.attributes);
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
