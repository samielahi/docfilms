import { type NextPage } from "next";
import Head from "next/head";
import SearchBar from "~/components/SearchBar";

// import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <SearchBar />
      </main>
    </>
  );
};

export default Home;
