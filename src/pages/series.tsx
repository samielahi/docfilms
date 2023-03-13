import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import MovieCard from "~/components/MovieCard";

const Series: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="wrapper h-full text-black dark:text-white">
        <div className="flex flex-col items-center md:flex-row md:gap-20">
          <div className="my-10">
            <div className="flow flex flex-col">
              <h1 className="italic">
                Weekend - Spring 1995 (Doc and the Maiden)
              </h1>
            </div>
          </div>
        </div>

        <div className="flow">
          <h2>Movies Shown In This Series</h2>

          <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
            <MovieCard title="Pulp Fiction" year={1994} />
            {/* <MovieCard title="Kill Bill Vol. 1" year={2003} />
            <MovieCard title="Kill Bill Vol. 2" year={2004} /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Series;
