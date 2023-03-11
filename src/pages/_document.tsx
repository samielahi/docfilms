import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark selection:bg-yellow selection:text-black">
      <Head />
      <body className="dark:bg-black  text-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
