import { useEffect, useRef, useState } from "react";
import AudioPBSelector from "./audioPBSelector";
import { AudioVolume } from "./audioVolume";
import calculateTime from "./helpers/calculateTime";

import { AudioPauseIcon, AudioPlayIcon } from "./SVG";

export default function AudioControls({
  audioRef,
  audioContainer,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  audioContainer: React.RefObject<HTMLDivElement>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const audioSeekBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>(0);

  function timeIsNumber(num: any) {
    if (num && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const seconds = audioRef.current?.duration || 0;
    setAudioDuration(seconds);
    if (!audioSeekBar?.current?.max) {
      return;
    }
    audioSeekBar.current.max = seconds.toString();
  }, [audioRef, audioSeekBar]);

  function togglePlayPause() {
    if (isPlaying) {
      cancelAnimationFrame(animationRef.current);
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      animationRef.current = requestAnimationFrame(whilePlaying);
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }

  function whilePlaying() {
    if (!audioSeekBar?.current) return;
    audioSeekBar.current.value =
      audioRef.current?.currentTime.toString() || "0";
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  function seekChangeHandler() {
    if (!audioSeekBar?.current || !audioRef.current) return;
    audioRef.current.currentTime = +audioSeekBar.current.value;
    changePlayerCurrentTime();
  }

  function changePlayerCurrentTime() {
    if (!audioContainer.current || !audioRef.current) return;
    audioContainer.current.style.setProperty(
      "--seek-before-width",
      `${
        audioSeekBar?.current
          ? (+audioSeekBar.current.value / audioDuration) * 100
          : 0
      }%`
    );
    audioContainer.current.style.setProperty(
      "--buffered-width",
      `${
        (audioRef.current.buffered.end(audioRef.current.buffered.length - 1) /
          audioDuration) *
        100
      }%`
    );
    audioSeekBar?.current
      ? setCurrentTime(+audioSeekBar.current.value)
      : setCurrentTime(0);
  }

  return (
    <div className="kg-audio-player">
      <button
        className="kg-audio-play-icon"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={togglePlayPause}
      >
        {isPlaying ? <AudioPauseIcon /> : <AudioPlayIcon />}
      </button>

      <span className="kg-audio-current-time">
        {timeIsNumber(currentTime) ? calculateTime(currentTime) : `0:00`}
      </span>
      <div className="kg-audio-time">
        /
        <span className="kg-audio-duration">
          {timeIsNumber(audioDuration) ? calculateTime(audioDuration) : `0:00`}
        </span>
      </div>

      <input
        type="range"
        className="kg-audio-seek-slider"
        ref={audioSeekBar}
        defaultValue={currentTime}
        onChange={seekChangeHandler}
      />

      <AudioPBSelector audioRef={audioRef} />

      <AudioVolume audioRef={audioRef} audioContainer={audioContainer} />
    </div>
  );
}
