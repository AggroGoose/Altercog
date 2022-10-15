import React, { createElement } from "react";
import { ParseElement } from "../../../addl";
import OtherEmbed from "./otherEmbed";
import TikTokCard from "./tikTokCard";
import TwitterCard from "./twitterCard";
import YoutubeCard from "./youtubeCard";

export default function EmbedCard({ elem }: { elem: ParseElement }) {
  return <>{identifyElem(elem, elem.id || 0)}</>;
}

function identifyElem(elem: ParseElement, key: string | number) {
  if (!elem.children) return null;
  const child1 = elem.children[0];
  if (child1.name == "blockquote") {
    if (child1.attributes.class == "tiktok-embed") {
      return createElement(TikTokCard, { elem, key });
    } else if (child1.attributes.class == "twitter-tweet") {
      return createElement(TwitterCard, { elem, key });
    }
  }
  if (child1.name == "iframe") {
    if (child1.attributes?.src?.includes("youtube")) {
      return createElement(YoutubeCard, { elem, key });
    } else {
      return createElement(OtherEmbed, { elem, key });
    }
  }
}
