import Image from "next/image";
import { useEffect } from "react";
import contentEval from "../../../lib/contentEval";
import ImageClose from "./SVG/imageClose";

export default function ImageModal({
  src,
  alt,
  width,
  height,
  caption,
  setViewModal,
}) {
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, []);

  function keyDownHandler(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  }

  function closeModal() {
    setViewModal(false);
  }
  return (
    <div className="post__modal">
      <div className="post__modal--content">
        <div className="post__modal--image">
          <Image src={src} alt={alt} width={width} height={height} />
          <button className="post__modal--image--button" onClick={closeModal}>
            <ImageClose />
          </button>
        </div>
        {caption && (
          <p className="post__modal--caption">{contentEval(caption)}</p>
        )}
      </div>
      <div className="post__modal--background" onClick={closeModal} />
    </div>
  );
}
