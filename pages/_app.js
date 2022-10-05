import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import { BannerProvider } from "../lib/context/BannerContext";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <BannerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BannerProvider>
    </SessionProvider>
  );
}

export default MyApp;
