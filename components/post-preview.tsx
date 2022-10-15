import Date from "./helpers/date";
import CoverImage from "./cover-image";
import Link from "next/link";
import { PostOrPage } from "@tryghost/content-api";

export default function PostPreview({ post }: { post: PostOrPage }) {
  const {
    title,
    feature_image: coverImage,
    published_at: date,
    reading_time: duration,
    excerpt,
    slug,
    primary_tag: tag,
  } = post;

  return (
    <div className="mstories__preview">
      <div className="mstories__preview--img">
        <CoverImage
          slug={slug}
          title={title || ""}
          url={coverImage || ""}
          width={1080}
          height={1080}
        />
        {tag && (
          <button className="mstories__preview--img--badge">
            <Link href={`/articles/${tag.slug}`}>
              <a>{tag.name}</a>
            </Link>
          </button>
        )}
      </div>
      <h3>
        <Link href={`/articles/${tag}/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>

      <p className="mstories__preview--excerpt">{excerpt}</p>
      <div className="mstories__preview--meta">
        <Date dateString={date} />{" "}
        <span className="mstories__preview--duration">{`${duration} min read`}</span>
      </div>
    </div>
  );
}
