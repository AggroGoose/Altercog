import { createElement, useEffect, useRef, useState } from "react";
import Image from "next/image";
import childBuilder from "../../../lib/childBuilder";
import parseImageCard from "./helpers/parseImageCard";
import ModalPortal from "../../modalPortal";
import ImageModal from "./imageModal";

const ImageCard = ({ elem }) => {
  const [viewModal, setViewModal] = useState(false);
  const {
    imgSrc,
    hasCaption,
    caption,
    imgWidth,
    imgHeight,
    numWidth,
    numHeight,
  } = parseImageCard(elem);

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
            caption={hasCaption ? caption : null}
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

const ImageCaption = ({ caption }) => {
  const capContent = caption.content
    ? [caption.content]
    : childBuilder(caption.children);
  return createElement("figcaption", {}, ...capContent);
};
