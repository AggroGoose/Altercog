import Head from "next/head";
import Image from "next/image";
import { getAllPostsForHome } from "../lib/ghost";
import HeroSection from "../components/homePage/HeroSection";
import LatestPost from "../components/homePage/LatestPost";
import { PostOrPage } from "@tryghost/content-api";

export default function Home({ allPosts }: { allPosts: Array<PostOrPage> }) {
  const latestPost: PostOrPage = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Head>
        <title>Blog Test with Next.js</title>
      </Head>

      <main className="home">
        <HeroSection />

        <div className="home__divide">
          <Image
            src="/images/TheWorldIsOurs.png"
            height={423}
            width={2161}
            priority={true}
            alt="The World Is Ours"
          />
        </div>
        <LatestPost post={latestPost} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPosts: Array<PostOrPage> = (await getAllPostsForHome()) || [];

  return {
    props: { allPosts },
  };
}
