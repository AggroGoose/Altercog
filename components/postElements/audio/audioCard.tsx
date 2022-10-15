import { useEffect, useRef, useState } from "react";
import findAudioDetails from "./helpers/findAudioDetails";
import Image from "next/image";

import AudioControls from "./audioControls";
import { AudioPlaceholderThumb } from "./SVG";
import { ParseElement } from "../../../addl";

export default function AudioCard({ elem }: { elem: ParseElement }) {
  const [audioDetails, setAudioDetails] = useState({
    audioLoad: false,
    imgSrc: "",
    audioTitle: "",
    audioSrc: "",
  });
  const audioContainer = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioData = findAudioDetails(elem);
    setAudioDetails({
      audioLoad: true,
      imgSrc: audioData?.imgSrc || "",
      audioTitle: audioData?.audioTitle || "",
      audioSrc: audioData?.audioSrc || "",
    });
  }, [elem]);

  const { audioLoad, imgSrc, audioSrc, audioTitle } = audioDetails;

  return (
    <>
      {audioLoad && (
        <div className="kg-card kg-audio-card">
          <div className={`kg-audio-thumbnail ${imgSrc ? "" : "placeholder"}`}>
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={`Audio clip thumbnail for ${audioTitle}`}
                className="kg-audio-thumbnail"
                layout="responsive"
                priority={true}
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

            {audioContainer?.current && audioRef?.current && (
              <AudioControls
                audioContainer={audioContainer.current}
                audioRef={audioRef.current}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
