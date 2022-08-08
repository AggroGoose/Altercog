import { useEffect, useState } from "react";
import contentEval from "../../../lib/contentEval";
import { TikTokEmbed } from "react-social-media-embed";

export default function TikTokCard({ elem }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const base = elem.children.find((child) => child.name == "blockquote");
  const src = base.attributes.cite;

  return (
    <figure class="kg-card kg-embed-card">
      <TikTokEmbed url={src} />
    </figure>
  );
}
