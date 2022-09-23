import Date from "./helpers/date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  tag,
  slug,
}) {
  return (
    <div className="mstories__preview">
      <div className="mstories__preview--img">
        <CoverImage
          slug={slug}
          title={title}
          url={coverImage}
          width={2000}
          height={1216}
        />
      </div>
      <h3>
        <Link href={`/articles/${tag}/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mstories__preview--date">
        <Date dateString={date} />
      </div>
      <p className="mstories__preview--excerpt">{excerpt}</p>
    </div>
  );
}
