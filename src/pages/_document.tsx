import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark selection:bg-yellow selection:text-black">
      <Head />
      <body className="text-black  dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
