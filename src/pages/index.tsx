import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/components/Logo";
import Search from "~/components/Search/Search";
import Image from "next/image";

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
          <Search type="main" />
        </div>

        <Image
          draggable={false}
          priority={true}
          alt="An assortment of colored movie tickets."
          src={"/tickets.png"}
          width={1920}
          height={400}
          className="absolute top-[85%] sm:top-[80%] md:top-[75%] lg:top-[65%] xl:top-[55%]"
        ></Image>
      </main>
    </>
  );
};

export default Home;
