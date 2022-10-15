import { ParseElement } from "../../../../addl";

export default function parseGalleryCard(
  elem: ParseElement | undefined,
  rows: number = 3
) {
  const returnObj: {
    rowArr: {
      elem: ParseElement;
      imgID: number;
    }[][];
    imgGallery: {
      src: string;
      width: string;
      height: string;
      alt: string;
    }[];
  } = {
    rowArr: [],
    imgGallery: [],
  };

  if (!elem) return returnObj;

  const base = elem.children?.find((child) =>
    child.attributes?.class?.includes("gallery-container")
  );

  if (!base?.children) return returnObj;

  let imageArr: Array<{ elem: ParseElement; imgID: number }> = [];
  let imgID = 0;

  base.children.forEach((child) => {
    if (child.name == "div") {
      child.children?.forEach((image) => {
        if (
          image.attributes?.class?.includes("gallery-image") &&
          image.children
        ) {
          imageArr.push({
            elem: image,
            imgID,
          });
          imgID++;
          const imgRef = image.children[0].attributes;
          const src = imgRef?.src || "";
          const alt = imgRef?.alt || "";
          const width = imgRef?.width || "";
          const height = imgRef?.height || "";
          returnObj.imgGallery.push({ src, width, height, alt });
        }
      });
    }
  });

  const rowNum = Math.ceil(imageArr.length / rows);

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
    returnObj.rowArr.push(rowContents);
  }
  return returnObj;
}
