import childBuilder from "../../../../lib/childBuilder";

export default function parseBookmark(elem) {
  const base = elem.children.find((child) => child.name == "a");
  const caption = elem.children.find((child) => child.name == "figcaption");

  const baseFinder = (string) => {
    return base.children.find((child) =>
      child.attributes?.class?.includes(string)
    );
  };

  const contentFinder = (string) => {
    return baseFinder("bookmark-content").children.find((child) =>
      child.attributes?.class?.includes(string)
    );
  };

  const metaFinder = (string) => {
    return contentFinder("bookmark-metadata").children.find((child) =>
      child.attributes?.class?.includes(string)
    );
  };

  const url = base.attributes.href;
  const title = contentFinder("bookmark-title").content;
  const desc = contentFinder("bookmark-description");
  const descContent = desc.content
    ? [desc.content]
    : desc.children
    ? childBuilder(desc.children)
    : [];
  const metaIcon = metaFinder("bookmark-icon").attributes.src;
  const metaIconAlt = metaFinder("bookmark-icon").attributes.src || "";
  const metaAuthor = metaFinder("bookmark-author").content;
  const captionContent = caption.content
    ? [caption.content]
    : caption.children
    ? childBuilder(caption.children)
    : [];

  const thumbnail = baseFinder("bookmark-thumbnail").children.find(
    (child) => (child.name = "img")
  );
  const imgSrc = thumbnail.attributes.src;
  const imgAlt = thumbnail.attributes.alt || "";

  return {
    url,
    title,
    descContent,
    metaIcon,
    metaIconAlt,
    metaAuthor,
    captionContent,
    imgSrc,
    imgAlt,
  };
}
