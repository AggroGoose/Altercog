import { useEffect, useRef, useState } from "react";
import AudioPBSelector from "./audioPBSelector";
import { AudioVolume } from "./audioVolume";
import calculateTime from "./helpers/calculateTime";

import { AudioPauseIcon, AudioPlayIcon } from "./SVG";

export default function AudioControls({ audioRef, audioContainer }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const audioSeekBar = useRef();
  const animationRef = useRef();

  function timeIsNumber(num) {
    if (num && !isNaN(num)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const seconds = audioRef.current.duration;
    setAudioDuration(seconds);
    audioSeekBar.current.max = seconds;
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);

  function togglePlayPause() {
    if (isPlaying) {
      cancelAnimationFrame(animationRef.current);
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      animationRef.current = requestAnimationFrame(whilePlaying);
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function whilePlaying() {
    audioSeekBar.current.value = audioRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  function seekChangeHandler() {
    audioRef.current.currentTime = audioSeekBar.current.value;
    changePlayerCurrentTime();
  }

  function changePlayerCurrentTime() {
    audioContainer.current.style.setProperty(
      "--seek-before-width",
      `${(audioSeekBar.current.value / audioDuration) * 100}%`
    );
    audioContainer.current.style.setProperty(
      "--buffered-width",
      `${
        (audioRef.current.buffered.end(audioRef.current.buffered.length - 1) /
          audioDuration) *
        100
      }%`
    );
    setCurrentTime(audioSeekBar.current.value);
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
