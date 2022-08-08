import { Fragment, createElement, useState } from "react";
import childBuilder from "../../../lib/childBuilder";
import ToggleArrow from "./SVG/toggleArrow";

export default function toggleCard({ elem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const heading = elem.children
    .find((child) => child.attributes.class.includes("toggle-heading"))
    .children.find((child) => child.name == "h4").content;

  const textDiv = elem.children.find((child) =>
    child.attributes.class.includes("toggle-content")
  );

  const toggleChildren = textDiv.content
    ? [textDiv.content]
    : childBuilder(textDiv.children);

  const toggleContent = createElement(Fragment, {}, ...toggleChildren);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div
      className="kg-card kg-toggle-card"
      data-kg-toggle-state={isExpanded ? "open" : "close"}
    >
      <div className="kg-toggle-heading" onClick={toggleExpand}>
        <h4 className="kg-toggle-heading-text">{heading}</h4>
        <button className="kg-toggle-card-icon" onClick={toggleExpand}>
          <ToggleArrow />
        </button>
      </div>
      <div className="kg-toggle-content">{toggleContent}</div>
    </div>
  );
}
