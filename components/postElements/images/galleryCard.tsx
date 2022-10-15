import { createElement, useState, useRef } from "react";
import parseGalleryCard from "./helpers/parseGalleryCard";
import ModalPortal from "../../modalPortal";
import GalleryModal from "./galleryModal";
import GalleryImageCard from "./galleryImageCard";
import { ParseElement } from "../../../addl";
import contentEval from "../../../lib/contentEval";

export default function GalleryCard({ elem }: { elem: ParseElement }) {
  const [viewModal, setViewModal] = useState(false);
  const imgNumber = useRef<number>(0);
  const { rowArr, imgGallery } = parseGalleryCard(elem);

  const hasCaption = elem.attributes.class?.includes("kg-card-hascaption");
  const caption = elem.children?.find((child) => child.name == "figcaption");

  return (
    <>
      {viewModal && (
        <ModalPortal>
          <GalleryModal
            gallery={imgGallery}
            caption={hasCaption ? caption : undefined}
            setViewModal={setViewModal}
            imgNumber={imgNumber.current}
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
                      imgID={img.imgID.toString()}
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

const ImageCaption = ({ caption }: { caption: ParseElement | undefined }) => {
  if (!caption) return null;
  const capContent = contentEval(caption);
  return createElement("figcaption", {}, ...capContent);
};
