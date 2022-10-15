import Image from "next/future/image";
import Link from "next/link";
import Date from "../helpers/date";

import {
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsReddit,
  BsPinterest,
} from "react-icons/bs";
import { ImTumblr2 } from "react-icons/im";
import { PostOrPage } from "@tryghost/content-api";

const PostHeader = ({ post }: { post: PostOrPage }) => {
  return (
    <div className="post__head">
      <div className="post__head--bread">
        <Link href="/articles">Articles</Link>/
        <Link href={`/articles/${post?.primary_tag?.slug}`}>
          {post?.primary_tag?.name}
        </Link>
      </div>
      <div className="post__head--title">
        <h1>{post.title}</h1>
      </div>
      <div className="post__head--body">
        <div className="post__head--feature">
          <Image
            src={post.feature_image || ""}
            height={1080}
            width={1080}
            alt={
              post.feature_image_alt ||
              `Feature image for article "${post.title}".`
            }
          />
        </div>
        <div className="post__head--content">
          <div className="post__head--meta">
            <div className="post__head--author">
              By:{" "}
              <Link href={`/authors/${post?.primary_author?.slug}`}>
                <a>{post?.primary_author?.name}</a>
              </Link>
              {` // `}
              {post?.primary_author?.twitter && (
                <a href={`https://twitter.com/${post.primary_author.twitter}`}>
                  {post.primary_author.twitter}
                </a>
              )}
            </div>
            <div className="post__head--secondary">
              <Date dateString={post.published_at} />
              {` - `}
              <span className="post__head--secondary--readtime">{`${post.reading_time} Minute Read`}</span>
            </div>
          </div>
          <div className="post__head--tags">
            {post?.tags?.map((tag) => (
              <Link href={`/articles/${tag.slug}`} key={tag.id}>
                <button className="post__head--tags--button">{tag.name}</button>
              </Link>
            ))}
          </div>

          <div className="post__head--share">
            <p>Share this article:</p>
            <div className="post__head--share--icons">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://www.altercog.com/articles/${post?.primary_tag?.slug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=https://www.altercog.com/articles/${post?.primary_tag?.slug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.altercog.com/articles/${post?.primary_tag?.slug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin />
              </a>
              <a
                href={`https://www.reddit.com/submit?url=https://www.altercog.com/articles/${post?.primary_tag?.slug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsReddit />
              </a>
              <a
                href={`https://www.pinterest.com/pin/create/button/?url=https://www.altercog.com/articles/${post?.primary_tag?.slug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsPinterest />
              </a>
              <a
                href={`https://www.tumblr.com/widgets/share/tool?canonicalUrl=https://www.altercog.com/articles/${post?.primary_tag?.slug}/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImTumblr2 />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
