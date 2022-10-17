import { PostOrPage } from "@tryghost/content-api";
import { ParseElement } from "../addl";
import genElements from "../lib/genElems";
import ArticleFavorite from "./postPage/items/articleFavorite";
import ArticleLike from "./postPage/items/articleLike";
import CommentButton from "./postPage/items/commentButton";
import ShareButton from "./postPage/items/shareButton";

export default function PostBody({
  content,
  post,
  setIsCommentOpen,
}: {
  content: ParseElement[];
  post: PostOrPage;
  setIsCommentOpen: (value: boolean) => void;
}) {
  return (
    <div className="article__content">
      <div className="article__content__engagement">
        <ArticleLike articleId={post.id} />
        <CommentButton postId={post.id} setIsCommentOpen={setIsCommentOpen} />
        <ArticleFavorite articleId={post.id} />
        <ShareButton />
      </div>
      <p className="article__summary">{post.excerpt}</p>
      <>{content.map((elem) => genElements(elem))}</>
    </div>
  );
}
