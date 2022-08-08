import { createElement, useState, useRef } from "react";
import parseGalleryCard from "./helpers/parseGalleryCard";
import ModalPortal from "../../modalPortal";
import GalleryModal from "./galleryModal";
import GalleryImageCard from "./galleryImageCard";

export default function GalleryCard({ elem }) {
  const [viewModal, setViewModal] = useState(false);
  const imgNumber = useRef();
  const { rowArr, imgGallery } = parseGalleryCard(elem);

  const hasCaption = elem.attributes.class.includes("kg-card-hascaption");
  const caption = elem.children.find((child) => child.name == "figcaption");

  return (
    <>
      {viewModal && (
        <ModalPortal>
          <GalleryModal
            gallery={imgGallery}
            caption={hasCaption ? caption : null}
            setViewModal={setViewModal}
            imgNumber={imgNumber}
          />
        </ModalPortal>
      )}
      <figure className="kg-card kg-gallery-card kg-width-wide">
        <div className="kg-gallery-container">
          {rowArr.map((row, i) => {
            return (
              <div className="kg-gallery-row" key={i}>
                {row.map((img) => {
                  return (
                    <GalleryImageCard
                      elem={img.elem}
                      imgID={img.imgID}
                      key={img.imgID}
                      setViewModal={setViewModal}
                      imgNumber={imgNumber}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        {hasCaption && <ImageCaption caption={caption} />}
      </figure>
    </>
  );
}

const ImageCaption = ({ caption }) => {
  const capContent = caption.content
    ? [caption.content]
    : childBuilder(caption.children);
  return createElement("figcaption", {}, ...capContent);
};
