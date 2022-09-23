import genElements from "../lib/genElems";
import ArticleLike from "./postPage/items/articleLike";
import CommentButton from "./postPage/items/commentButton";

export default function PostBody({ content, post }) {
  return (
    <div className="article__content">
      <div className="article__content__engagement">
        <ArticleLike />
        <CommentButton />
      </div>
      <p className="article__summary">{post.excerpt}</p>
      {content.map((elem) => genElements(elem))}
    </div>
  );
}
