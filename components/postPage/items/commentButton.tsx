import { GoComment } from "react-icons/go";
import { useSession } from "next-auth/react";

export default function CommentButton({
  postId,
  setIsCommentOpen,
}: {
  postId: string;
  setIsCommentOpen: (value: boolean) => void;
}) {
  const { data: session } = useSession();

  const handleCommentOpen = () => {
    if (session) {
      setIsCommentOpen(true);
    }
  };

  return (
    <button className="article__comment__button" onClick={handleCommentOpen}>
      <GoComment />
      <span className="article__comment__button--badge">5</span>
    </button>
  );
}
