import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <section className="mstories">
      <h2>More Articles</h2>
      <div className="mstories--posts">
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
