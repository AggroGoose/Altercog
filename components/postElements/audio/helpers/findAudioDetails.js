export default function findAudioDetails(elem) {
  const audioSrc =
    elem.children
      .find((child) => child.attributes.class == "kg-audio-player-container")
      .children.find((child) => child.name == "audio").attributes.src || "";

  const imgSrc =
    elem.children.find((child) => child.name == "img").attributes.src || "";

  const audioTitle = elem.children
    .find((child) => child.attributes.class == "kg-audio-player-container")
    .children.find(
      (child) => child.attributes.class == "kg-audio-title"
    ).content;

  return { audioSrc, imgSrc, audioTitle };
}
