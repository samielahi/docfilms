import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { ReactNode } from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

type BaseLayoutProps = {
  children?: ReactNode;
  title?: string;
  session?: Session;
};

export default function Base({ children, title, session }: BaseLayoutProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <main className="wrapper mt-[calc(100px_+_3rem)] h-full min-h-[70vh] bg-black text-white">
          {children}
        </main>
        <Footer />
      </SessionProvider>
    </>
  );
}
