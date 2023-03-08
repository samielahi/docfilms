import type { GetServerSideProps } from "next";
import type { MoviePageProps } from "~/types";
import type { QParams } from "~/types";
import type { MovieDbSearchResult } from "~/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getSupplementaryData(title: string, year: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d48a88ab647709f0a54d9e2656133657&query=${title}&year=${year}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = (await response.json()) as MovieDbSearchResult;

  // Type guard for MovieDB api results
  if (
    typeof data === "object" &&
    data !== null &&
    data.hasOwnProperty("results")
  ) {
    return data.results;
  }
}

export const getServerSideProps: GetServerSideProps<
  MoviePageProps,
  QParams
> = async ({ params }) => {
  const title = params?.title!;
  const year = parseInt(params?.year!);

  const moviesFromDb = await prisma.movies.findMany({
    where: {
      title: {
        equals: title,
      },
    },
  });

  const moviesWithoutId = moviesFromDb.map(({ id, date, ...rest }) => rest);

  const supplement = await getSupplementaryData(title, year);

  const props: MoviePageProps = {
    movies: moviesWithoutId,
    posterPath: supplement![0]!["poster_path"] as string,
    overview: supplement![0]!["overview"] as string,
  };

  return {
    props: props,
  };
};

export default function Movie(props: MoviePageProps) {
  return (
    <>
      <h3>{props.movies[0]?.title}</h3>
      <p>{props.overview}</p>
    </>
  );
}
