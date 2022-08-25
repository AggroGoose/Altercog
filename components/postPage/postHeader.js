import Image from "next/future/image";
import Date from "../helpers/date";

const PostHeader = ({ post, children }) => {
  return (
    <div className="post__head">
      {children}
      <div className="main-grid">
        <div className="post__head--body">
          <div className="post__head--meta">
            <Date dateString={post.published_at} />
          </div>
          <div className="post__head--title">
            <h1>{post.title}</h1>
          </div>
          <h2 className="post__head--excerpt__title">{`TL;DR`}</h2>
          <div className="post__head--excerpt">{post.excerpt}</div>
        </div>
        <div className="post__head--feature">
          <Image src={post.feature_image} height={384} width={480} />
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
