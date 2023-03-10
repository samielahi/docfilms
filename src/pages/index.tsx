import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/core/Logo";
import SearchBar from "~/components/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center">
        <div className="mt-20 flex w-fit flex-col items-center gap-8">
          <Logo size="large" />
          <SearchBar />
        </div>
      </main>
    </>
  );
};

export default Home;
