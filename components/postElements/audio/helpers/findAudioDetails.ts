import { ParseElement } from "../../../../addl";

export default function findAudioDetails(elem: ParseElement) {
  const audioObj = {
    imgSrc: "",
    audioSrc: "",
    audioTitle: "",
  };
  if (!elem?.children) return audioObj;
  audioObj.imgSrc =
    elem.children.find((child) => child.name == "img")?.attributes?.src || "";

  const audioContainer = elem.children.find(
    (child) => child.attributes.class == "kg-audio-player-container"
  );

  let audioSrc: string;
  let audioTitle: string;

  if (!audioContainer) return audioObj;
  audioObj.audioSrc =
    audioContainer.children?.find((child) => child.name == "audio")?.attributes
      ?.src || "";
  audioObj.audioTitle =
    audioContainer.children?.find(
      (child) => child.attributes.class == "kg-audio-title"
    )?.content || "";
  console.log(audioObj);
  return audioObj;
}
