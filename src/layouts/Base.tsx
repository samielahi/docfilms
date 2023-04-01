import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { ReactNode } from "react";
import Head from "next/head";

type BaseLayoutProps = {
  children?: ReactNode;
  title?: string;
};

export default function Base({ children, title }: BaseLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="wrapper h-full bg-white text-black dark:bg-black dark:text-white">
        {children}
      </main>
      <Footer />
    </>
  );
}
