import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="notranslate" translate="no">
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
