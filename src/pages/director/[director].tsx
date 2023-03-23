import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import MovieCard from "~/components/MovieCard";
import LinePlot from "~/components/LinePlot";
import { prisma } from "~/server/db";
import moviedb from "~/server/moviedb";
import type { GetServerSideProps } from "next";
import type { DirectorPageProps, DocMovie } from "~/types";
import type { QParams } from "~/types";

// Can optimize with better sql queries

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
  const movieCountByYear: Record<number, number> = {};

  docData.forEach((movie) => {
    if (!mid) {
      mid = Number(movie.mid);
    }

    const year = parseInt(movie.date?.toDateString().split(" ")[3]!);

    if (Object.hasOwn(movieCountByYear, `${year}`)) {
      movieCountByYear[`${year}`] += 1;
    } else {
      movieCountByYear[`${year}`] = 1;
    }

    movie.date = null;
    movie.mid = null;
  });

  const props: DirectorPageProps = {
    director: director,
    movies: docData,
    movieCountByYear: movieCountByYear,
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
  const { director, blurb, movieCountByYear, movies, profileURL } = props;
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
            className="w-[300px] sm:w-[350px] md:w-[400px]"
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

                <LinePlot
                  xOffset={40}
                  yOffset={60}
                  width={400}
                  height={200}
                  domain={[40, 400]}
                  range={[140, 60]}
                  dataDomain={[1930, 2023]}
                  dataRange={[0, 20]}
                  data={[
                    [1939, 8],
                    [1942, 1],
                    [2001, 2],
                    [2010, 1],
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10" />

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
