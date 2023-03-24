import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import MovieCard from "~/components/MovieCard";
import BarPlot from "~/components/BarPlot";
import { prisma } from "~/server/db";
import moviedb from "~/server/moviedb";
import type { GetServerSideProps } from "next";
import type { DirectorPageProps, DocMovie } from "~/types";
import type { QParams } from "~/types";

async function getDataFromDb(director: string) {
  const movies: DocMovie[] = await prisma.movies.findMany({
    select: {
      title: true,
      year: true,
      date: true,
      mid: true,
    },
    where: {
      director: {
        equals: director,
      },
    },
  });

  return movies;
}

export const getServerSideProps: GetServerSideProps<
  DirectorPageProps,
  QParams
> = async ({ params: query }) => {
  if (!query?.director) throw Error("Query has no director");
  const director = query.director;

  const docData = await getDataFromDb(director);
  let mid: number = 0;
  const movieCountByDecade: Record<number, number> = {};

  docData.forEach((movie) => {
    if (!mid) {
      mid = Number(movie.mid);
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

  const props: DirectorPageProps = {
    director: director,
    movies: docData,
    movieCountByDecade: movieCountByDecade,
  };

  let tmdbDirectorData = null;

  if (mid) {
    tmdbDirectorData = await moviedb.getDirectorData(mid);
  }

  if (!tmdbDirectorData || tmdbDirectorData.isErr) {
    return { props: props };
  }

  props.director = tmdbDirectorData.value.name;
  props.blurb = tmdbDirectorData.value.biography;
  props.profileURL = tmdbDirectorData.value.profile_path!;

  return { props: props };
};

export default function Director(props: DirectorPageProps) {
  const { director, blurb, movieCountByDecade, movies, profileURL } = props;
  const values = Object.entries(movieCountByDecade!).map((mc) => [
    parseInt(mc[0]),
    mc[1],
  ]);
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
          <Image
            className="w-[300px] border-4 border-yellow sm:w-[350px] md:w-[450px]"
            src={profileURL!}
            width={400}
            height={300}
            alt=""
          ></Image>
          <div className="my-10">
            <div className="flow flex flex-col">
              <h1 className="capitalize">{director}</h1>

              <p>{blurb}</p>

              <div className="hidden h-full flex-col md:flex">
                <h2>
                  {director} @ <span className="font-logo font-bold">doc</span>
                </h2>

                <BarPlot
                  xOffset={80}
                  yOffset={60}
                  width={525}
                  height={300}
                  data={{
                    domain: [1920, 2030],
                    range: [0, 50],
                    values: values!,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-8 mb-8 w-[100%] border-t-4 border-gray/70 border-dashed bg-transparent" />

        <div className="flow">
          <h2>
            Their Movies Shown @{" "}
            <span className="font-logo font-bold">doc</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
            {movies?.map((movie, i) => (
              <MovieCard key={i} title={movie.title!} year={movie.year!} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
