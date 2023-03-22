import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/components/Logo";
import Image from "next/image";
import SearchBar from "~/components/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-between">
        <div className="mt-28 flex w-fit flex-col items-center gap-8">
          <Logo size="large" />
          <SearchBar />
        </div>
        {/* <div className="relative h-[300px] md:h-[650px] w-full overflow-hidden">
          <Image
            quality={100}
            alt=""
            src={"/tickets.png"}
            fill={true}
            className="object-cover object-top md:mt-20"
          ></Image>
        </div> */}
      </main>
    </>
  );
};

export default Home;
