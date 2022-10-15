import { ParseElement } from "../../../../addl";
import contentEval from "../../../../lib/contentEval";

export default function productParse(elem: ParseElement) {
  if (!elem.children) return null;
  const base = elem.children[0];
  if (!base.children) return null;

  const baseFinder = (string: string) => {
    return base.children?.find((child) =>
      child.attributes?.class?.includes(string)
    );
  };

  const image = base.children.find((child) => (child.name = "img"));
  const link = base.children.find((child) => (child.name = "a"))?.attributes
    .href;
  const titleContainer = baseFinder("title-container")?.children;
  const title = titleContainer ? titleContainer[0].content : null;
  const rating = baseFinder("card-rating")?.children;
  const description = baseFinder("card-description");
  const descriptionContent = description ? contentEval(description) : null;

  if (!image || !link || !title) return null;

  return { image, title, rating, descriptionContent, link };
}
