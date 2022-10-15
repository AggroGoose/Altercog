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

import { GetStaticProps, GetStaticPaths } from "next";
import { ParseElement } from "../../../addl";
import { PostOrPage } from "@tryghost/content-api";

export default function Post({
  post,
  content,
  morePosts,
}: {
  post: PostOrPage;
  content: ParseElement[];
  morePosts: PostOrPage[];
}) {
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
            <title>{post.meta_title || post.title}</title>
            {post.meta_description && (
              <meta name="description" content={post.meta_description} />
            )}
            {post.og_image && (
              <meta property="og:image" content={post.og_image} />
            )}
            <meta property="og:type" content="article" />
            {post.og_title && (
              <meta property="og:title" content={post.og_title} />
            )}
            {post.og_description && (
              <meta property="og:description" content={post.og_description} />
            )}
            {post.published_at && (
              <meta
                property="article:published_time"
                content={post.published_at}
              />
            )}
            {post.updated_at && (
              <meta
                property="article:modified_time"
                content={post.updated_at}
              />
            )}
            {post.tags && (
              <meta
                property="article:tag"
                content={post.tags.map((tag) => tag.name).join(", ")}
              />
            )}
            <meta name="twitter:card" content="summary_large_image" />
            {post.twitter_title && (
              <meta property="twitter:title" content={post.twitter_title} />
            )}
            {post.twitter_description && (
              <meta
                property="twitter:description"
                content={post.twitter_description}
              />
            )}
            {post.twitter_image && (
              <meta property="twitter:image" content={post.twitter_image} />
            )}
            <meta property="twitter:label1" content="Written by" />
            {post.primary_author && (
              <meta
                property="twitter:data1"
                content={post.primary_author.name}
              />
            )}
            <meta property="twitter:label2" content="Filed under" />
            {post.primary_tag && (
              <meta property="twitter:data1" content={post.primary_tag.name} />
            )}
            {post.primary_author && (
              <meta
                property="twitter:site"
                content={post.primary_author.twitter || "@TheStoicGoose"}
              />
            )}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `${params?.slug}`;
  const { post, morePosts } = await getPostAndMorePosts(slug);
  let parsedPost: ParseElement[];
  if (post?.html) {
    parsedPost = parseHTML(post.html);
  } else {
    parsedPost = [];
  }

  return {
    props: {
      post,
      content: parsedPost,
      morePosts: morePosts || [],
    },
  };
};

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || [];
  return {
    paths: allPosts.map((post) => {
      if (!post?.primary_tag || post?.slug) return;
      return `/articles/${post.primary_tag.slug}/${post.slug}`;
    }),
    fallback: true,
  };
}
