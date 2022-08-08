import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import PostHeader from "../../components/post-header";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/ghost";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import parseHTML from "../../lib/parseHTML";

export default function Post({ post, content, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <main>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.meta_title}</title>
              <meta property="og:image" content={post.feature_image} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.feature_image}
              date={post.published_at}
              author={post.primary_author}
            />
            <PostBody content={content} />
          </article>
          <hr className="separator" />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </main>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, preview);
  const parsedPost = parseHTML(post.html);

  console.log(parsedPost[41]);

  return {
    props: {
      post,
      content: parsedPost,
      morePosts: morePosts || [],
    },
  };
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || [];
  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`),
    fallback: true,
  };
}
