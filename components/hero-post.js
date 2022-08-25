import Avatar from "./avatar";
import Date from "./helpers/date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className="hcover">
        <CoverImage
          title={title}
          url={coverImage}
          slug={slug}
          width={2000}
          height={1216}
        />
      </div>
      <div className="hpost">
        <div className="hpost__linkdate">
          <h3>
            <Link href={`/posts/${slug}`}>
              <a className="hpost__linkdate--link">{title}</a>
            </Link>
          </h3>
          <div className="hpost__linkdate--date">
            <Date dateString={date} />
          </div>
        </div>
        <div className="hpost__excerpt">
          <p>{excerpt}</p>
          <Avatar name={author.name} picture={author.profile_image} />
        </div>
      </div>
    </section>
  );
}
