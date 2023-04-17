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
    // Merge db data with data from the api
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
          className="w-[300px] rounded-full  grayscale sm:w-[350px] md:w-[450px]"
          src={profile_path! || "https://placekitten.com/g/300/400"}
          width={400}
          height={300}
          alt=""
        ></Image>
        <div className="my-10">
          <div className="flow flex flex-col">
            <h1 className="flex items-center gap-4 text-4xl font-bold capitalize md:text-7xl">
              <span>{name}</span>{" "}
              <Image
                src={"/megaphone.svg"}
                width={45}
                height={45}
                role="presentation"
                alt=""
              ></Image>
            </h1>

            <p>
              {biography
                ? biography
                : "Couldn't find a biography for this director. Feel free to suggest one here!"}{" "}
            </p>

            <div className="hidden h-full flex-col md:flex">
              <h2 className="font-bold md:text-5xl">
                <span className="capitalize">{name}</span> @ <span>doc</span>
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
        <h2 className="font-bold md:text-5xl">
          <span className="capitalize">{name}</span> @ <span>doc</span>
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

      <hr className="mt-8 mb-8 w-[100%] border-t-[1px] border-gray/20 bg-transparent" />

      <div className="">
        <h2 className="my-12 text-5xl font-bold">Their Movies Shown @ doc</h2>

        <div className="flex flex-wrap justify-center gap-8 pb-10 text-center md:justify-start">
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
