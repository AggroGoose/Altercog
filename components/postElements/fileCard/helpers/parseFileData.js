export default function parseFileData(children) {
  const childA = children.find((child) => child.name == "a");
  const childB = childA.children.find((child) =>
    child.attributes?.class?.includes("file-card-contents")
  );
  const childC = childB.children.find((child) =>
    child.attributes?.class?.includes("file-card-metadata")
  );

  const fileSource = childA.attributes.href;
  const fileTitle = childB.children.find((child) =>
    child.attributes?.class?.includes("file-card-title")
  ).content;
  const fileName = childC.children.find((child) =>
    child.attributes?.class?.includes("file-card-filename")
  ).content;
  const fileSize = childC.children.find((child) =>
    child.attributes?.class?.includes("file-card-filesize")
  ).content;

  return { fileSource, fileTitle, fileName, fileSize };
}
