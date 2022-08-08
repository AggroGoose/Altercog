import Link from "next/link";
import Image from "next/image";

export default function CoverImage({ title, url, slug, width, height }) {
  const image = (
    <Image
      src={url}
      alt={`Cover Image for ${title}`}
      className="hcover--img"
      layout="responsive"
      priority="true"
      width={width}
      height={height}
    />
  );
  return (
    <div className="hcover--link">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
