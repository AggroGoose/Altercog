import Head from "next/head";
import Image from "next/image";
import { getAllPostsForHome } from "../lib/ghost";
import Header from "../components/nav/Header";
import HeroSection from "../components/homePage/HeroSection";
import LatestPost from "../components/homePage/LatestPost";

export default function Home({ allPosts }) {
  const latestPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Head>
        <title>Blog Test with Next.js</title>
      </Head>

      <main className="home">
        <HeroSection>
          <Header />
        </HeroSection>
        <div className="home__divide">
          <Image
            src="/images/TheWorldIsOurs.png"
            height={423}
            width={2161}
            priority="true"
          />
        </div>
        <LatestPost post={latestPost} />
      </main>
    </>
  );
}

export async function getStaticProps({ preview }) {
  const allPosts = (await getAllPostsForHome(preview)) || [];

  return {
    props: { allPosts },
  };
}
