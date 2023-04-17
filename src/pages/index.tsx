import Head from "next/head";
import Logo from "~/components/Logo";
import Search from "~/components/Search/Search";
import Header from "~/components/Header";
import type { NextPage } from "next";
import MovieCard from "~/components/MovieCard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex h-screen flex-col items-center justify-between overflow-hidden">
        <div className="mt-28 flex w-fit flex-col items-center gap-8">
          <Logo size="large" />
          <Search fullSize />
        </div>
      </main>
    </>
  );
};

export default Home;
