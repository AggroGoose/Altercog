import { ElemAttribs, ParseElement } from "../../../../addl";

export default function parseImageCard(elem: ParseElement | undefined) {
  if (!elem?.children || !elem?.attributes) return null;
  const imgSrc = elem.children.find((child) => child.name == "img")?.attributes;
  if (!imgSrc) return null;

  const hasCaption = elem.attributes.class?.includes("kg-card-hascaption");
  const caption = elem.children.find((child) => child.name == "figcaption");

  const { imgWidth, imgHeight } = imgSizeHandler(imgSrc);

  return {
    imgSrc,
    hasCaption,
    caption,
    imgWidth,
    imgHeight,
    numWidth: Number(imgSrc.width),
    numHeight: Number(imgSrc.height),
  };
}

function imgSizeHandler(source: ElemAttribs) {
  const width = source.width;
  const height = source.height;
  const imgWidth = Number(width);
  const imgHeight = Number(height);
  const ratio = imgHeight / imgWidth;

  const returnObj = { imgWidth, imgHeight };

  if (imgWidth > 1400) {
    returnObj.imgWidth = 1400;
    returnObj.imgHeight = 1400 * ratio;
  }

  return returnObj;
}
