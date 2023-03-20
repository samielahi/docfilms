import Head from "next/head";
import { prisma } from "~/server/db";
import Header from "~/components/Header";
import moviedb from "~/server/moviedb";
import type { GetServerSideProps } from "next";
import type { DirectorPageProps, DocMovie } from "~/types";
import type { QueryParams } from "~/types";

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
  QueryParams
> = async ({ params }) => {
  if (!params?.director) throw Error("Query has no director");
  const director = params.director;

  const docData = await getDataFromDb(director);
  let mid: number = 0;
  const movieCountByYear = new Map<string, number>();

  docData.forEach((movie) => {
    if (!mid) {
      mid = Number(movie.mid);
    }

    const year = movie.date?.toDateString().split(" ")[3]!;
    const currentCount = movieCountByYear.get(year);
    if (year && currentCount) {
      movieCountByYear.set(year, currentCount + 1);
    } else {
      movieCountByYear.set(year, 1);
    }
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
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
