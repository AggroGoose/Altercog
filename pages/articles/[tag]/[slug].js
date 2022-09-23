import { useState } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../../components/post-body";
import MoreStories from "../../../components/more-stories";
import PostHeader from "../../../components/postPage/postHeader";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../../lib/ghost";
import Head from "next/head";
import parseHTML from "../../../lib/parseHTML";
import AboutAuthor from "../../../components/postPage/aboutAuthor";
import ArticleComments from "../../../components/postPage/items/articleComments";

export default function Post({ post, content, morePosts }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <main>
      {router.isFallback ? (
        <h1 className="post__title">Loading…</h1>
      ) : (
        <>
          <Head>
            <title>{post.meta_title}</title>
            <meta name="description" content={post.meta_description} />
            <meta property="og:image" content={post.og_image} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.og_title} />
            <meta property="og:description" content={post.og_description} />
            <meta
              property="article:published_time"
              content={post.published_at}
            />
            <meta property="article:modified_time" content={post.updated_at} />
            <meta property="article:tag" content={post.primary_tag.name} />
            <meta property="twitter:card" content={post.primary_tag.name} />
            <meta property="twitter:title" content={post.twitter_title} />
            <meta
              property="twitter:description"
              content={post.twitter_description}
            />
            <meta property="twitter:image" content={post.twitter_image} />
            <meta property="twitter:label1" content="Written by" />
            <meta property="twitter:data1" content={post.primary_author.name} />
            <meta property="twitter:label2" content="Filed under" />
            <meta property="twitter:data1" content={post.primary_tag.name} />
            <meta
              property="twitter:site"
              content={post.primary_author.twitter || "@TheStoicGoose"}
            />
          </Head>
          <article className="article">
            <PostHeader post={post} />
            <PostBody
              content={content}
              post={post}
              setIsCommentOpen={setIsCommentOpen}
            />
            {isCommentOpen && (
              <ArticleComments
                commentId={post.comment_id}
                isCommentOpen={isCommentOpen}
              />
            )}
          </article>
          <AboutAuthor author={post.primary_author} />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </>
      )}
    </main>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const { post, morePosts } = await getPostAndMorePosts(params.slug, preview);
  const parsedPost = parseHTML(post.html);

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
    paths: allPosts.map(
      (post) => `/articles/${post.primary_tag.slug}/${post.slug}`
    ),
    fallback: true,
  };
}
