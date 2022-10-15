import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import BannerProvider from "../lib/context/BannerContext";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <BannerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BannerProvider>
    </SessionProvider>
  );
}

export default MyApp;
