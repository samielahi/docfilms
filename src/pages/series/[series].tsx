import Head from "next/head";
import Header from "~/components/Header";
import type { GetServerSideProps } from "next";
import type { SeriesPageProps } from "~/types";
import type { QParams } from "~/types";
import { useDb } from "~/server/db";
import useSWRImmutable, { SWRConfig } from "swr";
import { PagePropsWithSWR } from "~/types";

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<SeriesPageProps>,
  QParams
> = async ({ query }) => {
  const series = query.series as string;

  const docData = await useDb(series, "series");

  const seriesPageProps: SeriesPageProps = {
    movies: docData,
    series: series,
  };
  return { props: { fallback: { docDataKey: seriesPageProps } } };
};

function Series() {
  const { data, error } = useSWRImmutable<SeriesPageProps, Error>("docDataKey");
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

export default function DirectorPage({
  fallback,
}: PagePropsWithSWR<SeriesPageProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Series />
    </SWRConfig>
  );
}
