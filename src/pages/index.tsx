import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/components/Logo";
import SearchBar from "~/components/SearchBar";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex h-screen flex-col items-center justify-between">
        <div className="mt-28 flex w-fit flex-col items-center gap-8">
          <Logo size="large" />
          <SearchBar />
        </div>


        {/* <Image alt="" className="-z-1 fixed top-0" src={'/tickets.png'} fill>

        </Image> */}

        {/* <span className="absolute top-[90%] left-[5%] hidden border-gray border-2 rounded-xl bg-gray/20 p-4 font-bold text-black/40 md:block">
          / to search
        </span> */}
      </main>
    </>
  );
};

export default Home;
