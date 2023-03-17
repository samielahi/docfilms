import Head from "next/head";

import Header from "~/components/Header";
import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps } from "next";
import type {
  MovieDbSearchResponse,
  MovieDbSearchResult,
  DirectorPageProps,
  DocMovie,
} from "~/types";
import type { QueryParams } from "~/types";

const prisma = new PrismaClient();

async function getDataFromDb(director: string) {
  const movies = await prisma.movies.findMany({
    where: {
      director: {
        equals: director,
      },
    },
  });

  // Leave out id because bigint cannot be serialized and convert Date to string
  const serializableMovies: DocMovie[] = movies.map(({ id, date, ...rest }) => {
    return {
      date: date?.toDateString() || "",
      ...rest,
    };
  });

  return serializableMovies;
}

async function getSupplementaryData(title: string, year: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env
      .MOVIEDB_API_KEY!}&query=${title}&year=${year}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = (await response.json()) as MovieDbSearchResponse;
  return data.results || ([] as MovieDbSearchResult[]);
}

export const getServerSideProps: GetServerSideProps<
  DirectorPageProps,
  QueryParams
> = async ({ params }) => {
  if (!params?.director) throw Error("Query has no title");

  const director = params.director;

  const props = {};

  return {
    props: props,
  };
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
