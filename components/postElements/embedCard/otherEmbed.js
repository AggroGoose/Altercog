import { createElement } from "react";

export default function OtherEmbed({ elem }) {
  const iFrame = elem.children.find((child) => child.name == "iframe");
  return (
    <figure class="kg-card kg-embed-card">
      {createElement("iframe", { ...iFrame.attributes })}
    </figure>
  );
}
