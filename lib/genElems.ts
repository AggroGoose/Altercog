import {
  ComponentClass,
  createElement,
  DetailedReactHTMLElement,
  FunctionComponent,
} from "react";
import { ParseElement } from "../addl";
import childBuilder from "./childBuilder";

import AudioCard from "../components/postElements/audio/audioCard";
import BlockQuote from "../components/postElements/generalElems/BlockQuote";
import BookmarkCard from "../components/postElements/bookmark/bookmarkCard";
import CalloutCard from "../components/postElements/callout/calloutCard";
import FileCard from "../components/postElements/fileCard/fileCard";
import GalleryCard from "../components/postElements/images/galleryCard";
import Header from "../components/postElements/generalElems/Header";
import SectionHeaderCard from "../components/postElements/sectionHeader/sectionHeaderCard";
import ImageCard from "../components/postElements/images/imageCard";
import ProductCard from "../components/postElements/productCard/productCard";
import ToggleCard from "../components/postElements/toggleCard/toggleCard";
import contentEval from "./contentEval";
import PostButtonCard from "../components/postElements/generalElems/PostButtonCard";
import TwitterCard from "../components/postElements/embedCard/twitterCard";
import YoutubeCard from "../components/postElements/embedCard/youtubeCard";
import OtherEmbed from "../components/postElements/embedCard/otherEmbed";
import TikTokCard from "../components/postElements/embedCard/tikTokCard";
import findAudioDetails from "../components/postElements/audio/helpers/findAudioDetails";

export default function genElements(elem: ParseElement) {
  switch (elem.name) {
    case "h2":
      return specComp(Header, elem);
    case "blockquote":
      if (!elem.attributes?.class || !elem.attributes?.id)
        return specComp(BlockQuote, elem);
    case "p":
    case "h3":
      const textContent = contentEval(elem);
      return createElement(elem.name, { key: elem.id }, ...textContent);
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
            if (!elem.children) return;
            const child1 = elem.children[0];
            if (child1.name == "blockquote") {
              if (child1.attributes.class == "tiktok-embed") {
                return specComp(TikTokCard, elem);
              } else if (child1.attributes.class == "twitter-tweet") {
                return specComp(TwitterCard, elem);
              }
            }
            if (child1.name == "iframe") {
              if (child1.attributes?.src?.includes("youtube")) {
                return specComp(YoutubeCard, elem);
              } else {
                return specComp(OtherEmbed, elem);
              }
            }
        }
      }
    case "div":
      if (elem.attributes.class) {
        const divCom = elem.attributes.class;
        switch (true) {
          case divCom.includes("kg-audio-card"):
            const audioElem = elem;
            audioElem.additional = { audio: findAudioDetails(elem) };
            return specComp(AudioCard, elem);
          case divCom.includes("kg-callout-card"):
            return specComp(CalloutCard, elem);
          case divCom.includes("kg-toggle-card"):
            return specComp(ToggleCard, elem);
          case divCom.includes("kg-file-card"):
            return specComp(FileCard, elem);
          case divCom.includes("kg-button-card"):
            return specComp(PostButtonCard, elem);
          case divCom.includes("kg-header-card"):
            return specComp(SectionHeaderCard, elem);
          case divCom.includes("kg-product-card"):
            return specComp(ProductCard, elem);
          default:
            const divTent = contentEval(elem);
            return createElement("div", { key: elem.id }, ...divTent);
        }
      }
  }
}

function listArray(children: ParseElement[] | undefined) {
  const arr: Array<DetailedReactHTMLElement<{}, HTMLElement>> = [];
  if (!children) return arr;
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

function specComp(
  component:
    | string
    | FunctionComponent<{ elem: any }>
    | ComponentClass<{ elem: any }, any>,
  elem: ParseElement
) {
  return createElement(component, { elem, key: elem.id });
}
