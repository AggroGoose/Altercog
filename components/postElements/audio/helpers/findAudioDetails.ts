import { ParseElement } from "../../../../addl";

export default function findAudioDetails(elem: ParseElement) {
  if (!elem?.children) return null;
  const imgSrc =
    elem.children.find((child) => child.name == "img")?.attributes?.src || "";

  const audioContainer = elem.children.find(
    (child) => child.attributes.class == "kg-audio-player-container"
  );

  let audioSrc: string;
  let audioTitle: string;

  if (!audioContainer) {
    audioSrc = "";
    audioTitle = "";
  } else {
    audioSrc =
      audioContainer.children?.find((child) => child.name == "audio")
        ?.attributes?.src || "";
    audioTitle =
      audioContainer.children?.find((child) => child.name == "figcaption")
        ?.content || "";
  }

  return { imgSrc, audioSrc, audioTitle };
}
