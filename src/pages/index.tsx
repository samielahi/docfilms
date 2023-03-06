import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const movies = api.movieSearch.byTitle.useQuery("irds");

  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        {movies.data?.map((movie, i) => (
          <div
            key={i}
            className="flex w-[300px] flex-col gap-4 rounded bg-slate-200 p-8"
          >
            <h3>
              {movie.title} ({movie.year})
            </h3>
            <span>{movie.director}</span>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
