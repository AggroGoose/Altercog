import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <section className="mstories">
      <h2>More Stories</h2>
      <div className="mstories--posts">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.feature_image}
            date={post.published_at}
            author={post.primary_author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
