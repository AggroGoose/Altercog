import { createElement, Fragment } from "react";
import childBuilder from "../../../lib/childBuilder";
import contentEval from "../../../lib/contentEval";

export default function CalloutCard({ elem }) {
  const textDiv = elem.children.find((child) =>
    child.attributes.class.includes("kg-callout-text")
  );

  return (
    <div className="article__callout">
      <CallOut elem={textDiv} />
    </div>
  );
}

const CallOut = ({ elem }) => {
  const innerText = contentEval(elem);
  return createElement("p", {}, ...innerText);
};
