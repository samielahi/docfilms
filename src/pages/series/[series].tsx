import Head from "next/head";
import { prisma } from "~/server/db";
import Header from "~/components/Header";
import type { GetServerSideProps } from "next";
import type { DocMovie, SeriesPageProps } from "~/types";
import type { QueryParams } from "~/types";

// Can optimize with better sql queries

async function getDataFromDb(series: string) {
  const movies: DocMovie[] = await prisma.movies.findMany({
    select: {
      title: true,
      director: true,
      year: true,
      date: true,
    },
    where: {
      series: {
        equals: series,
      },
    },
  });

  return movies;
}

export const getServerSideProps: GetServerSideProps<
  SeriesPageProps,
  QueryParams
> = async ({ params }) => {
  if (!params?.series) throw Error("Query has no series");

  const docData = await getDataFromDb(params.series);

  const props: SeriesPageProps = {
    movies: docData,
    series: params.series,
  };

  return {
    props: props,
  };
};

export default function Director(props: SeriesPageProps) {
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
