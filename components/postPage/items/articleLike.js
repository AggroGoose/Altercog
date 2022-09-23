import { useState } from "react";
import { useSession } from "next-auth/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

export default function ArticleLike({ postId }) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (session) {
      setLiked(!liked);
    }
  };
  return (
    <button className="article__like" onClick={handleLike}>
      {liked ? <IoMdHeart /> : <IoMdHeartEmpty />}
      <span className="article__like--badge">14</span>
    </button>
  );
}
