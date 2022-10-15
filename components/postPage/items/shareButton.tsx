import { useState } from "react";
import { IoArrowRedoOutline } from "react-icons/io5";

export default function ShareButton() {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(!isSharing);
  };

  return (
    <button className="article__comment__button" onClick={handleShare}>
      <IoArrowRedoOutline />
      <span className="article__comment__button--badge">Share</span>
    </button>
  );
}
