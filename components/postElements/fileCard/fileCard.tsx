import React from "react";
import { ParseElement } from "../../../addl";
import parseFileData from "./helpers/parseFileData";
import DownloadIcon from "./SVG/downloadIcon";

export default function FileCard({ elem }: { elem: ParseElement }) {
  const { fileSource, fileTitle, fileName, fileSize } = parseFileData(
    elem.children
  );
  return (
    <div className="kg-card kg-file-card kg-file-card-medium">
      <a
        className="kg-file-card-container"
        href={fileSource}
        title="Download"
        download
      >
        <div className="kg-file-card-contents">
          <div className="kg-file-card-title">{fileTitle}</div>
          <div className="kg-file-card-metadata">
            <div className="kg-file-card-filename">{fileName}</div>
            <div className="kg-file-card-filesize">{fileSize}</div>
          </div>
        </div>
        <div className="kg-file-card-icon">
          <DownloadIcon />
        </div>
      </a>
    </div>
  );
}
