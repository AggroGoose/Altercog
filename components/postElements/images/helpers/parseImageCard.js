export default function parseImageCard(elem) {
  const imgSrc = elem.children.find((child) => child.name == "img").attributes;
  const hasCaption = elem.attributes.class.includes("kg-card-hascaption");
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

function imgSizeHandler({ width, height }) {
  const numWidth = Number(width);
  const numHeight = Number(height);
  const ratio = numHeight / numWidth;

  const returnObj = { imgWidth: numWidth, imgHeight: numHeight };

  if (numWidth > 1400) {
    returnObj.imgWidth = 1400;
    returnObj.imgHeight = 1400 * ratio;
  }

  return returnObj;
}
