import childBuilder from "../../../../lib/childBuilder";

export default function productParse(elem) {
  const base = elem.children[0];

  const baseFinder = (string) => {
    return base.children.find((child) =>
      child.attributes?.class?.includes(string)
    );
  };

  const image = base.children.find((child) => (child.name = "img"));
  const link = base.children.find((child) => (child.name = "a")).attributes
    .href;
  const title = baseFinder("title-container").children[0].content;
  const rating = baseFinder("card-rating").children;
  const description = baseFinder("card-description");
  const descriptionContent = description.content
    ? [description.content]
    : description.children
    ? childBuilder(description.children)
    : [];

  return { image, title, rating, descriptionContent, link };
}
