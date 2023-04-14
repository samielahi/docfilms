import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="selection:bg-yellow selection:text-black">
      <Head />
      <body className=" bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
