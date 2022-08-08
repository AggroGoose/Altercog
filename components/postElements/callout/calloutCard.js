import { createElement, Fragment } from "react";
import childBuilder from "../../../lib/childBuilder";

export default function CalloutCard({ elem }) {
  const calloutEmoji = elem.children.find((child) =>
    child.attributes.class.includes("kg-callout-emoji")
  ).content;

  const textDiv = elem.children.find((child) =>
    child.attributes.class.includes("kg-callout-text")
  );

  const calloutText = textDiv.content
    ? textDiv.content
    : createElement(Fragment, {}, ...childBuilder(textDiv.children));

  return (
    <div className={elem.attributes.class}>
      <div className="kg-callout-emoji">{calloutEmoji}</div>
      <div className="kg-callout-text">{calloutText}</div>
    </div>
  );
}
