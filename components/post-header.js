import Avatar from "./avatar";
import Date from "./helpers/date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <div className="post__header main-grid">
      <PostTitle>{title}</PostTitle>
      <div className="post__avatar">
        <Avatar name={author.name} picture={author.profile_image} />
      </div>
      <div className="post__cover">
        <CoverImage title={title} url={coverImage} width={2000} height={1216} />
      </div>
      <div className="post__author">
        <div className="post__author--avatar">
          <Avatar name={author.name} picture={author.profile_image} />
        </div>
        <div className="post__author--date">
          <Date dateString={date} />
        </div>
      </div>
    </div>
  );
}
