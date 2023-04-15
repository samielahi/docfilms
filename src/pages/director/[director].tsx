import Image from "next/image";
import MovieCard from "~/components/MovieCard";
import BarPlot from "~/components/BarPlot";
import Base from "~/layouts/Base";
import { db } from "~/server/db";
import moviedb from "~/server/moviedb";
import useSWRImmutable, { SWRConfig } from "swr";

import type { PagePropsWithSWR } from "~/types";
import type { GetServerSideProps } from "next";
import type { DirectorPageProps } from "~/types";
import type { QParams } from "~/types";
import type { NextPageWithLayout } from "../_app";
import type { Result } from "true-myth";
import type { TMDBDirectorInfo } from "~/server/moviedb";

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<DirectorPageProps>,
  QParams
> = async ({ query }) => {
  const director = query.director as string;
  // Get base page props from db
  let directorPageProps = await db.getDirectorPageProps(director);

  // If the tmdbID exists, we'll fetch additional data from tmdb
  let tmdbDirectorData: Result<TMDBDirectorInfo, Error> | null = null;
  if (directorPageProps.tmdbId) {
    tmdbDirectorData = await moviedb.getDirectorData(directorPageProps.tmdbId);
  }

  // Return base page props if fetching tmdb data fails
  if (!tmdbDirectorData || tmdbDirectorData.isErr) {
    return { props: { fallback: { docDataKey: directorPageProps } } };
  } else {
    directorPageProps = Object.assign(
      directorPageProps,
      tmdbDirectorData.value
    );
  }

  return { props: { fallback: { docDataKey: directorPageProps } } };
};

const Director: NextPageWithLayout = () => {
  const { data, error } = useSWRImmutable<DirectorPageProps, Error>(
    "docDataKey"
  );

  if (error) return <div>Something went wrong while loading this page.</div>;

  const { name, biography, movieCountByDecade, movies, profile_path } = data!;

  return (
    <>
      <div className="flex flex-col items-center md:flex-row md:gap-20">
        <Image
          className="w-[300px] sm:w-[350px] md:w-[450px]"
          src={profile_path! || "https://placekitten.com/g/300/400"}
          width={400}
          height={300}
          alt=""
        ></Image>
        <div className="my-10">
          <div className="flow flex flex-col">
            <h1 className="flex items-center gap-4 capitalize">
              <span>{name}</span>{" "}
              <svg
                className="text-orange"
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 11 18-5v12L3 14v-3z"></path>
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
              </svg>
            </h1>

            {biography ? (
              <p> {biography} </p>
            ) : (
              "Couldn't find a biography for this director. Feel free to suggest one here!"
            )}

            <div className="hidden h-full flex-col md:flex">
              <h2>
                <span className="capitalize">{name}</span> @{" "}
                <span className="font-logo font-bold">doc</span>
              </h2>

              <BarPlot
                xOffset={80}
                yOffset={60}
                width={525}
                height={350}
                data={{
                  domain: [1920, 2030],
                  range: [0, 50],
                  values: movieCountByDecade!,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col md:hidden">
        <h2>
          <span className="capitalize">{name}</span> @{" "}
          <span className="font-logo font-bold">doc</span>
        </h2>

        <BarPlot
          xOffset={80}
          yOffset={60}
          width={425}
          height={350}
          data={{
            domain: [1920, 2030],
            range: [0, 50],
            values: movieCountByDecade!,
          }}
        />
      </div>

      <hr className="mt-8 mb-8 w-[100%] border-t-4 border-dashed border-gray/70 bg-transparent" />

      <div className="flow">
        <h2>
          Their Movies Shown @ <span className="font-logo font-bold">doc</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
          {movies!.map((movie, i) => (
            <>
              <MovieCard
                key={i}
                title={movie.title!}
                count={movie.times_shown!}
                year={movie.year!}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default function DirectorPage({
  fallback,
}: PagePropsWithSWR<DirectorPageProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Base>
        <Director />
      </Base>
    </SWRConfig>
  );
}
