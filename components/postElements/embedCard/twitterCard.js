import { TwitterEmbed } from "react-social-media-embed";

export default function TwitterCard({ elem }) {
  const tlink = elem.children
    .find((child) => child.name == "blockquote")
    .children.find((child) => child.name == "a").attributes.href;
  const tweetSrc = tlink.substring(0, tlink.indexOf("?ref_src"));
  return (
    <figure class="kg-card kg-embed-card kg-width">
      <TwitterEmbed url={tweetSrc} />
    </figure>
  );
}
