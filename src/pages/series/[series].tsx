import Image from "next/image";
import Base from "~/layouts/Base";
import { db } from "~/server/db";
import useSWRImmutable, { SWRConfig } from "swr";
import type { GetServerSideProps } from "next";
import type { SeriesPageProps } from "~/types";
import type { QParams } from "~/types";
import type { PagePropsWithSWR } from "~/types";
import type { NextPageWithLayout } from "../_app";
import MovieCard from "~/components/MovieCard";

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
        <h1 className="capitalize italic">{series}</h1>

        <div className="flow">
          <h2 className="flex  items-center gap-4 font-bold">
            <span>Movies</span>

            <span className="italic text-gray">(Shown {quarter})</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
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
