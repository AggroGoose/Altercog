import GhostContentAPI from "@tryghost/content-api";

const GHOST_API_URL = process.env.GHOST_API_URL || "";
const GHOST_CONTENT_API = process.env.GHOST_CONTENT_API || "";

const api = new GhostContentAPI({
  url: GHOST_API_URL,
  key: GHOST_CONTENT_API,
  version: "v5.0",
});

const is404 = (error: Error) => /not found/i.test(error.message);

export async function getAllPostsWithSlug() {
  const posts = await api.posts.browse({
    include: ["tags"],
    fields: ["slug", "primary_tag"],
    limit: "all",
  });
  return posts;
}

export async function getAllPostsForHome() {
  const posts = await api.posts.browse({
    limit: "all",
    include: ["tags", "authors"],
    order: "published_at DESC",
  });
  return posts;
}

export async function getPostAndMorePosts(slug: string) {
  const singleObjectParams = {
    slug,
    include: "authors,tags",
  };
  const post = await api.posts.read(singleObjectParams).catch((error) => {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return;
    throw error;
  });
  const morePosts = (
    await api.posts.browse({ include: ["tags", "authors"], limit: 4 })
  )
    ?.filter(({ slug }) => post?.slug !== slug)
    .slice(0, 3);

  return {
    post,
    morePosts,
  };
}

export async function getTestPost() {
  const posts = await api.posts.read(
    { slug: "test-article" },
    { include: ["authors", "tags"] }
  );
  return posts;
}

export async function getAllTags() {
  const tags = await api.tags.browse();
  return tags;
}
