import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className=" selection:bg-yellow selection:text-black">
      <Head />
      <body className="text-black bg-white dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
