import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/Altercog-32.png" sizes="32x32" />
          <link rel="icon" href="/Altercog-128.png" sizes="128x128" />
          <link rel="icon" href="/Altercog-180.png" sizes="180x180" />
          <link rel="icon" href="/Altercog-192.png" sizes="192x192" />
        </Head>
        <body>
          <Main />
          <div id="modalPortal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
