import genElements from "../lib/genElems";
import ArticleFavorite from "./postPage/items/articleFavorite";
import ArticleLike from "./postPage/items/articleLike";
import CommentButton from "./postPage/items/commentButton";
import ShareButton from "./postPage/items/shareButton";

export default function PostBody({ content, post }) {
  return (
    <div className="article__content">
      <div className="article__content__engagement">
        <ArticleLike />
        <CommentButton />
        <ArticleFavorite />
        <ShareButton />
      </div>
      <p className="article__summary">{post.excerpt}</p>
      {content.map((elem) => genElements(elem))}
    </div>
  );
}
