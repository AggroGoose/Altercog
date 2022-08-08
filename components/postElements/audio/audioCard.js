import { useRef, useState } from "react";
import findAudioDetails from "./helpers/findAudioDetails";
import Image from "next/image";

import AudioControls from "./audioControls";
import { AudioPlaceholderThumb } from "./SVG";

export default function AudioCard(props) {
  const audioContainer = useRef();
  const audioRef = useRef();

  const { imgSrc, audioSrc, audioTitle } = findAudioDetails(props.elem);

  return (
    <div className="kg-card kg-audio-card">
      <div className={`kg-audio-thumbnail ${imgSrc ? "" : "placeholder"}`}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={`Audio clip thumbnail for ${audioTitle}`}
            className="kg-audio-thumbnail"
            layout="responsive"
            priority="true"
            width={80}
            height={80}
          />
        ) : (
          <AudioPlaceholderThumb />
        )}
      </div>

      <div className="kg-audio-player-container" ref={audioContainer}>
        <audio src={audioSrc} ref={audioRef} preload="metadata" />
        <div className="kg-audio-title">{audioTitle}</div>

        <AudioControls audioContainer={audioContainer} audioRef={audioRef} />
      </div>
    </div>
  );
}
