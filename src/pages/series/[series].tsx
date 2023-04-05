import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import type { SeriesPageProps } from "~/types";
import type { QParams } from "~/types";
import { useDb } from "~/server/db";
import useSWRImmutable, { SWRConfig } from "swr";
import { PagePropsWithSWR } from "~/types";
import MovieCard from "~/components/MovieCard";

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<SeriesPageProps>,
  QParams
> = async ({ query }) => {
  const series = query.series as string;

  const docData = await useDb(series, "series");

  const seriesPageProps: SeriesPageProps = {
    // Pass in without date, so it becomes serializable
    movies: docData.map(({ date, ...rest }) => ({ ...rest })),
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

      <main className="wrapper h-full overflow-hidden text-black dark:text-white">
        <div className="relative mb-10 h-[350px] overflow-hidden drop-shadow-sm md:h-[550px]">
          <Image
            priority={true}
            src={"/student.png"}
            className="border-4 border-orange object-cover md:object-left-top"
            fill={true}
            sizes="(max-width: 768px) 70vw,
              (max-width: 1200px) 70vw,
              50vw"
            alt=""
          ></Image>
        </div>

        <section className="flow">
          <h1 className="capitalize italic">{data?.series}</h1>

          <div className="flow">
            <h2 className="flex  items-center gap-4 font-bold">
              <span>Movies</span>

              <span className="italic text-gray">
                (Shown {data?.movies![0]?.quarter})
              </span>
            </h2>

            <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
              {data?.movies!.map((movie, i) => (
                <>
                  <MovieCard
                    key={i}
                    count={movie.times_shown!}
                    title={movie.title!}
                    year={movie.year!}
                  />
                </>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
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
