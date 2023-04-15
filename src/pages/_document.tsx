import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="selection:bg-yellow selection:text-black">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=erode@600,401,400&f[]=satoshi@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
