import { createElement } from "react";
import GalleryImageCard from "../galleryImageCard";

export default function parseGalleryCard(elem, rows = 3) {
  const base = elem.children.find((child) =>
    child.attributes?.class?.includes("gallery-container")
  );

  let imageArr = [];
  const imgGallery = [];
  let imgID = 0;

  base.children.forEach((child) => {
    if (child.name == "div") {
      child.children.forEach((image) => {
        if (image.attributes?.class?.includes("gallery-image")) {
          imageArr.push({
            elem: image,
            imgID,
          });
          imgID++;
          const imgRef = image.children[0].attributes;
          const { src, width, height, alt } = imgRef;
          imgGallery.push({ src, width, height, alt });
        }
      });
    }
  });

  const rowNum = Math.ceil(imageArr.length / rows);

  const rowArr = [];

  for (let i = 0; i < rowNum; i++) {
    const rowContents = [];
    if (imageArr.length > rows) {
      for (let i = 0; i < rows; i++) {
        rowContents.push(imageArr[i]);
      }
      imageArr = imageArr.splice(3);
    } else if (imageArr.length <= rows) {
      rowContents.push(...imageArr);
    }
    rowArr.push(rowContents);
  }
  return { rowArr, imgGallery };
}
