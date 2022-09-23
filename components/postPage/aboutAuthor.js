import Image from "next/future/image";
import Link from "next/link";

export default function AboutAuthor({ author }) {
  return (
    <div className="article__post-author">
      <div className="article__post-author__header">
        <h2>About the Author</h2>
      </div>
      <div className="article__post-author__body">
        <div className="article__post-author__avatar">
          <Image
            src={author.profile_image}
            alt={author.name}
            width={400}
            height={400}
          />
        </div>
        <div className="article__post-author__content">
          <h3 className="article__post-author__content--name">
            <Link href={`/authors/${author.slug}`}>
              <a>{author.name}</a>
            </Link>
          </h3>
          <p className="article__post-author__content--bio">{author.bio}</p>
        </div>
      </div>
    </div>
  );
}
