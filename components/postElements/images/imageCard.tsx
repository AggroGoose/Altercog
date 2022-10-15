import { createElement, useState } from "react";
import Image from "next/image";
import parseImageCard from "./helpers/parseImageCard";
import ModalPortal from "../../modalPortal";
import ImageModal from "./imageModal";
import { ParseElement } from "../../../addl";
import contentEval from "../../../lib/contentEval";

const ImageCard = ({ elem }: { elem: ParseElement }) => {
  const [viewModal, setViewModal] = useState(false);
  const parsed = parseImageCard(elem);
  if (!parsed) return null;

  const {
    imgSrc,
    hasCaption,
    caption,
    imgWidth,
    imgHeight,
    numWidth,
    numHeight,
  } = parsed;

  if (!imgSrc?.src) return null;

  const wideImg = numWidth > numHeight;

  return (
    <>
      {viewModal && (
        <ModalPortal>
          <ImageModal
            src={imgSrc.src}
            alt={imgSrc.alt}
            width={numWidth}
            height={numHeight}
            caption={hasCaption ? caption : undefined}
            setViewModal={setViewModal}
          />
        </ModalPortal>
      )}
      <figure
        className={`kg-card kg-image-card${wideImg ? " kg-image-wide" : ""}`}
      >
        <div
          className="kg-image"
          onClick={() => {
            setViewModal(true);
          }}
        >
          <Image
            src={imgSrc.src}
            alt={imgSrc.alt}
            width={imgWidth}
            height={imgHeight}
          />
        </div>
        {hasCaption && <ImageCaption caption={caption} />}
      </figure>
    </>
  );
};

export default ImageCard;

const ImageCaption = ({ caption }: { caption: ParseElement | undefined }) => {
  if (!caption) return null;
  const capContent = contentEval(caption);
  return createElement("figcaption", {}, ...capContent);
};
