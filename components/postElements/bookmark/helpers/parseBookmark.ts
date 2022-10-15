import { ParseElement } from "../../../../addl";
import contentEval from "../../../../lib/contentEval";

export default function parseBookmark(elem: ParseElement) {
  const bookmarkObj: {
    url: string;
    title: string;
    descContent: any[];
    metaIcon: string;
    metaIconAlt: string;
    metaAuthor: string;
    captionContent: any[];
    imgSrc: string;
    imgAlt: string;
  } = {
    url: "",
    title: "",
    descContent: [],
    metaIcon: "",
    metaIconAlt: "",
    metaAuthor: "",
    captionContent: [],
    imgSrc: "",
    imgAlt: "",
  };
  if (!elem.children) return bookmarkObj;
  const base = elem.children.find((child) => child.name == "a");
  const caption = elem.children.find((child) => child.name == "figcaption");

  const baseFinder = (string: string) => {
    if (!base?.children) return null;
    return base.children.find((child) =>
      child.attributes?.class?.includes(string)
    );
  };

  const contentFinder = (string: string) => {
    const origin = baseFinder("bookmark-content")?.children;
    if (!origin) return null;
    const results = origin.find((child) =>
      child.attributes?.class?.includes(string)
    );
    if (!results) return null;
    return results;
  };

  const metaFinder = (string: string) => {
    const origin = contentFinder("bookmark-meta")?.children;
    if (!origin) return null;
    const results = origin.find((child) =>
      child.attributes?.class?.includes(string)
    );
    if (!results) return null;
    return results;
  };

  if (!base) return bookmarkObj;

  const url = base.attributes.href || "";
  const title = contentFinder("bookmark-title")?.content || "";
  const desc = contentFinder("bookmark-description");
  const descContent = contentEval(desc);
  const metaIcon = metaFinder("bookmark-icon")?.attributes.src || "";
  const metaIconAlt = metaFinder("bookmark-icon")?.attributes.src || "";
  const metaAuthor = metaFinder("bookmark-author")?.content || "";
  const captionContent = contentEval(caption);

  const thumbnail = baseFinder("bookmark-thumbnail")?.children?.find(
    (child) => (child.name = "img")
  );
  const imgSrc = thumbnail?.attributes.src || "";
  const imgAlt = thumbnail?.attributes.alt || "";

  bookmarkObj.url = url;
  bookmarkObj.title = title;
  bookmarkObj.descContent = descContent;
  bookmarkObj.metaIcon = metaIcon;
  bookmarkObj.metaIconAlt = metaIconAlt;
  bookmarkObj.metaAuthor = metaAuthor;
  bookmarkObj.captionContent = captionContent;
  bookmarkObj.imgSrc = imgSrc;
  bookmarkObj.imgAlt = imgAlt;

  return bookmarkObj;
}
