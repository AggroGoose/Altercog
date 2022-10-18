import { useState, useRef } from "react";
import { AudioMuteIcon, AudioUnmuteIcon } from "./SVG";

export const AudioVolume = ({
  audioRef,
  audioContainer,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  audioContainer: React.RefObject<HTMLDivElement>;
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(100);

  const volumeBar = useRef<HTMLInputElement>(null);

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  function volumeChangeHandler() {
    if (!audioRef.current || !audioContainer.current) return;
    if (!volumeBar?.current) return;
    const newValue = +volumeBar.current.value;
    const parsedValue = newValue / 100;
    audioRef.current.volume = parsedValue;
    audioContainer.current.style.setProperty(
      "--volume-before-width",
      `${newValue}%`
    );
    setVolumeLevel(newValue);
  }

  return (
    <>
      <button
        className="kg-audio-mute-icon"
        aria-label={isMuted ? "Unmute" : "Mute"}
        onClick={toggleMute}
      >
        {isMuted ? <AudioMuteIcon /> : <AudioUnmuteIcon />}
      </button>

      <input
        type="range"
        className="kg-audio-volume-slider"
        ref={volumeBar}
        defaultValue={volumeLevel}
        onChange={volumeChangeHandler}
      />
    </>
  );
};
