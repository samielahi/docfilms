import Image from "next/image";
import Base from "~/layouts/Base";
import MovieCard from "~/components/MovieCard";
import useSWRImmutable, { SWRConfig } from "swr";
import { db } from "~/server/db";
import type { GetServerSideProps } from "next";
import type { SeriesPageProps } from "~/types";
import type { QParams } from "~/types";
import type { PagePropsWithSWR } from "~/types";
import type { NextPageWithLayout } from "../_app";

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<SeriesPageProps>,
  QParams
> = async ({ query }) => {
  const series = query.series as string;

  const seriesPageProps = await db.getSeriesPageProps(series);
  return { props: { fallback: { docDataKey: seriesPageProps } } };
};

const Series: NextPageWithLayout = () => {
  const { data, error } = useSWRImmutable<SeriesPageProps, Error>("docDataKey");
  if (error) return <div>An error occurred.</div>;

  const { series, quarter, movies } = data!;
  return (
    <>
      <div className="relative mb-10 h-[350px] overflow-hidden drop-shadow-sm md:h-[550px]">
        <Image
          priority={true}
          src={"/student.png"}
          className="object-cover md:object-left-top"
          fill={true}
          sizes="(max-width: 768px) 70vw,
              (max-width: 1200px) 70vw,
              50vw"
          alt=""
        ></Image>
      </div>

      <section className="flow">
        <h1 className="text-4xl font-bold capitalize md:text-7xl">{series}</h1>

        <div className="flex flex-wrap justify-center gap-10 py-10 text-center md:justify-start">
          {movies!.map((movie, i) => (
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
      </section>
    </>
  );
};

export default function DirectorPage({
  fallback,
}: PagePropsWithSWR<SeriesPageProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Base>
        <Series />
      </Base>
    </SWRConfig>
  );
}
