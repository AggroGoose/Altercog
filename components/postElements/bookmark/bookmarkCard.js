import React, { createElement, Fragment } from "react";
import parseBookmark from "./helpers/parseBookmark";

export default function BookmarkCard({ elem }) {
  const {
    url,
    title,
    descContent,
    metaIcon,
    metaIconAlt,
    metaAuthor,
    captionContent,
    imgSrc,
    imgAlt,
  } = parseBookmark(elem);

  return (
    <figure className="kg-card kg-bookmark-card kg-card-hascaption">
      <a className="kg-bookmark-container" href={url}>
        <div className="kg-bookmark-content">
          <div className="kg-bookmark-title">{title}</div>
          <div className="kg-bookmark-description">
            {createElement(Fragment, {}, ...descContent)}
          </div>
          <div className="kg-bookmark-metadata">
            <img
              className="kg-bookmark-icon"
              src={metaIcon}
              alt={metaIconAlt}
            />
            <span className="kg-bookmark-author">{metaAuthor}</span>
          </div>
        </div>
        <div className="kg-bookmark-thumbnail">
          <img src={imgSrc} alt={imgAlt} />
        </div>
      </a>
      <figcaption>{captionContent}</figcaption>
    </figure>
  );
}
