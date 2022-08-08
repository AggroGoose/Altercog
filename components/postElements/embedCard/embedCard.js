import React, { createElement } from "react";
import OtherEmbed from "./otherEmbed";
import TikTokCard from "./tikTokCard";
import TwitterCard from "./twitterCard";
import YoutubeCard from "./youtubeCard";

export default function EmbedCard({ elem }) {
  return <>{identifyElem(elem, elem.id)}</>;
}

function identifyElem(elem, key) {
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
