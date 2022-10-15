import { useState } from "react";

export default function AudioPBSelector({
  audioRef,
}: {
  audioRef: HTMLAudioElement;
}) {
  const [audioPlaybackRate, setAudioPlaybackRate] = useState(1.0);

  const playBackRates = [0.5, 0.8, 1.0, 1.2, 1.5, 1.7, 2.0, 2.5, 3.0];

  const changePlayBackRate = () => {
    const currentIndex = playBackRates.indexOf(audioPlaybackRate);

    let newIndex;

    if (currentIndex === playBackRates.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }

    audioRef.playbackRate = playBackRates[newIndex];

    setAudioPlaybackRate(playBackRates[newIndex]);
  };

  return (
    <>
      <button
        className="kg-audio-playback-rate"
        onClick={changePlayBackRate}
      >{`${audioPlaybackRate}x`}</button>
    </>
  );
}
