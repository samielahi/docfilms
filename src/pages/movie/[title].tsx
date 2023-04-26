import Link from "next/link";
import Image from "next/image";
import DateBlock from "~/components/DateBlock";
import Base from "~/layouts/Base";
import { db } from "~/server/db";
import moviedb from "~/server/moviedb";
import useSWRImmutable, { SWRConfig } from "swr";
import type { GetServerSideProps } from "next";
import type { MoviePageProps } from "~/types";
import type { QParams } from "~/types";
import type { PagePropsWithSWR } from "~/types";
import type { NextPageWithLayout } from "../_app";
import type { TMDBMovie } from "~/server/moviedb";
import type { Result } from "true-myth";

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<MoviePageProps>,
  QParams
> = async ({ query }) => {
  const title = query.title as string;
  let moviePageProps = await db.getMoviePageProps(title);

  let tmdbMovieData: Result<TMDBMovie, Error> | null = null;
  // Fetch additional data for the movie from TMDB API
  if (moviePageProps.tmdbID) {
    tmdbMovieData = await moviedb.getMovieData(moviePageProps.tmdbID);
  }

  // Return base page props if fetching tmdb data fails
  if (!tmdbMovieData || tmdbMovieData.isErr) {
    return { props: { fallback: { docDataKey: moviePageProps } } };
  } else {
    // Merge db data with data from the api
    moviePageProps = Object.assign(moviePageProps, tmdbMovieData.value);
  }

  return {
    props: {
      fallback: {
        docDataKey: moviePageProps,
      },
    },
  };
};

const Movie: NextPageWithLayout = () => {
  const { data, error } = useSWRImmutable<MoviePageProps, Error>("docDataKey");

  if (error) return <div>Something went wrong while loading this page.</div>;
  const { backdrop_path, title, director, year, series, overview } = data!;
  const backdropURL =
    backdrop_path !== "/student.png"
      ? moviedb.getImageUrl(backdrop_path!)
      : backdrop_path;

  return (
    <>
      <div className="relative flex justify-center">
        <Image
          src={backdropURL}
          width={600}
          height={400}
          className="h-auto w-full rounded-3xl opacity-70 grayscale"
          sizes="(max-width: 768px) 70vw,
          (max-width: 1200px) 100vw,
          50vw"
          alt=""
        />
      </div>
      <section className="relative">
        <div className="flow flex w-fit flex-col  border-[0px] pt-12">
          <div className="flex items-center gap-6 capitalize">
            <h1 className="text-4xl font-black md:text-7xl">
              {title}
              <span className="ml-4 text-2xl"> {year ? `(${year})` : ""}</span>
            </h1>
          </div>

          <Link
            className="w-fit font-bold"
            href={{
              pathname: `/director/${director!}`,
            }}
          >
            <p className="link capitalize">{director}</p>
          </Link>

          <p>
            {overview
              ? overview
              : "Could not find a description for this movie."}
          </p>
        </div>

        <hr className="mt-8 mb-8 w-[100%] border-t-[1px] border-gray/20 bg-transparent" />
        <div className="flow flex flex-col">
          <h2 className="font-bold md:text-5xl">Shown @ doc :</h2>

          {Object.entries(series!).map(([date, series], key) => (
            <div key={key} className="flex items-center gap-6">
              <DateBlock date={date} />
              <p className="hidden sm:block">as part of series</p>
              <Link href={`/series/${series}`}>
                <p className="link capitalize italic">{series}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default function MoviePage({
  fallback,
}: PagePropsWithSWR<MoviePageProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Base>
        <Movie />
      </Base>
    </SWRConfig>
  );
}
