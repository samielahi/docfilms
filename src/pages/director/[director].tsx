import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import MovieCard from "~/components/MovieCard";
import BarPlot from "~/components/BarPlot";
import moviedb from "~/server/moviedb";
import useSWRImmutable, { SWRConfig } from "swr";
import { useDb } from "~/server/db";
import type { PagePropsWithSWR } from "~/types";
import type { GetServerSideProps } from "next";
import type { DirectorPageProps, DocMovie } from "~/types";
import type { QParams } from "~/types";
import Footer from "~/components/Footer";

function buildMovieCountObject(docData: DocMovie[]) {
  let midForDirectorData: number = 0;
  const movieCountByDecade: Record<number, number> = {};

  docData.forEach((movie) => {
    if (!midForDirectorData) {
      midForDirectorData = Number(movie.mid);
    }

    const year = parseInt(movie.date?.toDateString().split(" ")[3]!);
    const decade = Math.floor(year / 10) * 10;

    if (Object.hasOwn(movieCountByDecade, `${decade}`)) {
      movieCountByDecade[`${decade}`] += 1;
    } else {
      movieCountByDecade[`${decade}`] = 1;
    }

    movie.date = null;
    movie.mid = null;
  });
  return { midForDirectorData, movieCountByDecade };
}

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<DirectorPageProps>,
  QParams
> = async ({ query }) => {
  const director = query.director as string;
  const docData = await useDb(director, "director");

  const { midForDirectorData, movieCountByDecade } =
    buildMovieCountObject(docData);

  let directorPageProps: DirectorPageProps = {
    name: director,
    movies: docData,
    movieCountByDecade: movieCountByDecade,
  };

  let tmdbDirectorData = null;

  if (midForDirectorData) {
    tmdbDirectorData = await moviedb.getDirectorData(midForDirectorData);
  }

  if (!tmdbDirectorData || tmdbDirectorData.isErr) {
    return { props: { fallback: { docDataKey: directorPageProps } } };
  } else {
    directorPageProps = Object.assign(
      directorPageProps,
      tmdbDirectorData.value
    );
  }

  return { props: { fallback: { docDataKey: directorPageProps } } };
};

function Director() {
  const { data, error } = useSWRImmutable<DirectorPageProps, Error>(
    "docDataKey"
  );

  if (error) return <div>Something went wrong while loading this page.</div>;

  const {
    name: director,
    biography,
    movieCountByDecade,
    movies,
    profile_path,
  } = data!;

  const numMoviesShownByDecade = Object.entries(movieCountByDecade!).map(
    (mc) => [parseInt(mc[0]), mc[1]]
  );

  const movieCountMap = new Map<string, Record<string, number>>();

  movies?.forEach((movie) => {
    const currentKey = movie.title!;
    const currentValue = movieCountMap.get(currentKey);
    if (!currentValue) {
      movieCountMap.set(currentKey, { year: movie.year!, count: 1 });
    } else {
      movieCountMap.set(currentKey, {
        count: currentValue.count! + 1,
        year: currentValue.year!,
      });
    }
  });

  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="wrapper mt-[calc(100px_+_3rem)] h-full text-white">
        <div className="flex flex-col items-center md:flex-row md:gap-20">
          <Image
            className="w-[300px] sm:w-[350px] md:w-[450px]"
            src={profile_path! || "https://placekitten.com/g/300/400"}
            width={400}
            height={300}
            alt=""
          ></Image>
          <div className="my-10">
            <div className="flow flex flex-col">
              <h1 className="flex items-center gap-4 capitalize">
                <span>{director}</span>{" "}
                <svg
                  className="text-orange"
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 11 18-5v12L3 14v-3z"></path>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                </svg>
              </h1>

              {biography ? (
                <p> {biography} </p>
              ) : (
                "Couldn't find a biography for this director. Feel free to suggest one here!"
              )}

              <div className="hidden h-full flex-col md:flex">
                <h2>
                  <span className="capitalize">{director}</span> @{" "}
                  <span className="font-logo font-bold">doc</span>
                </h2>

                <BarPlot
                  xOffset={80}
                  yOffset={60}
                  width={525}
                  height={350}
                  data={{
                    domain: [1920, 2030],
                    range: [0, 50],
                    values: numMoviesShownByDecade!,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col md:hidden">
          <h2>
            <span className="capitalize">{director}</span> @{" "}
            <span className="font-logo font-bold">doc</span>
          </h2>

          <BarPlot
            xOffset={80}
            yOffset={60}
            width={425}
            height={350}
            data={{
              domain: [1920, 2030],
              range: [0, 50],
              values: numMoviesShownByDecade!,
            }}
          />
        </div>

        <hr className="mt-8 mb-8 w-[100%] border-t-4 border-dashed border-gray/70 bg-transparent" />

        <div className="flow">
          <h2>
            Their Movies Shown @{" "}
            <span className="font-logo font-bold">doc</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
            {Array.from(movieCountMap.entries()).map(([key, value], i) => (
              <>
                <MovieCard
                  key={i}
                  title={key}
                  count={value.count!}
                  year={value.year!}
                />
              </>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function DirectorPage({
  fallback,
}: PagePropsWithSWR<DirectorPageProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Director />
    </SWRConfig>
  );
}
