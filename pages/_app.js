import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
