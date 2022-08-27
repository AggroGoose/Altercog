import { createElement } from "react";
import childBuilder from "./childBuilder";

import AudioCard from "../components/postElements/audio/audioCard";
import CalloutCard from "../components/postElements/callout/calloutCard";
import ImageCard from "../components/postElements/images/imageCard";
import ToggleCard from "../components/postElements/toggleCard/toggleCard";
import FileCard from "../components/postElements/fileCard/fileCard";
import HeaderCard from "../components/postElements/headerCard/headerCard";
import ProductCard from "../components/postElements/productCard/productCard";
import BookmarkCard from "../components/postElements/bookmark/bookmarkCard";
import EmbedCard from "../components/postElements/embedCard/embedCard";
import GalleryCard from "../components/postElements/images/galleryCard";
import contentEval from "./contentEval";

export default function genElements(elem) {
  switch (elem.name) {
    case "h2":
      const headContent = contentEval(elem);
      const headObj = { key: elem.id };
      if (elem.attributes?.id) {
        headObj.id = elem.attributes.id;
        headObj.className = "article__heading";
      }
      return createElement(elem.name, headObj, ...headContent);

    case "p":
    case "blockquote":
    case "h3":
      const textContent = elem.content
        ? [elem.content]
        : childBuilder(elem.children);
      const textObj = { key: elem.id };
      if (elem.attributes?.class) {
        textObj.className = elem.attributes.class;
      }
      if (elem.attributes?.id) {
        textObj.id = elem.attributes.id;
      }
      return createElement(elem.name, textObj, ...textContent);
    case "ul":
    case "ol":
      return createElement(
        elem.name,
        { key: elem.id },
        ...listArray(elem.children)
      );
    case "hr":
      return createElement("hr", { key: elem.id });
    case "figure":
      if (elem.attributes?.class) {
        const figCom = elem.attributes.class;
        switch (true) {
          case figCom.includes("kg-image-card"):
            return specComp(ImageCard, elem);
          case figCom.includes("kg-gallery-card"):
            return specComp(GalleryCard, elem);
          case figCom.includes("kg-bookmark-card"):
            return specComp(BookmarkCard, elem);
          case figCom.includes("kg-embed-card"):
            return specComp(EmbedCard, elem);
        }
      }
    case "div":
      if (elem.attributes.class) {
        const divCom = elem.attributes.class;
        switch (true) {
          case divCom.includes("kg-audio-card"):
            return specComp(AudioCard, elem);
          case divCom.includes("kg-callout-card"):
            return specComp(CalloutCard, elem);
          case divCom.includes("kg-toggle-card"):
            return specComp(ToggleCard, elem);
          case divCom.includes("kg-file-card"):
            return createElement(FileCard, { elem, key: elem.id });
          case divCom.includes("kg-button-card"):
            return createElement(
              "div",
              { ...elem.attributes, key: elem.id },
              ...childBuilder(elem.children)
            );
          case divCom.includes("kg-header-card"):
            return specComp(HeaderCard, elem);
          case divCom.includes("kg-product-card"):
            return specComp(ProductCard, elem);
          default:
            const divTent = elem.content
              ? [elem.content]
              : elem.children
              ? childBuilder(elem.children)
              : [];
            const divObjent = elem.attributes
              ? { ...elem.attributes, key: elem.id }
              : { key: elem.id };
            return createElement("div", divObjent, ...divTent);
        }
      }
  }
}

function listArray(children) {
  const arr = [];
  children.forEach((child) => {
    if (child.name == "li") {
      if (child.content) {
        arr.push(createElement("li", {}, child.content));
      }

      if (child.children) {
        arr.push(createElement("li", {}, ...childBuilder(child.children)));
      }
    }
  });

  return arr;
}

function specComp(component, elem) {
  return createElement(component, { elem, key: elem.id });
}
