import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "~/components/Header";
import DateBlock from "~/components/DateBlock";
import moviedb from "~/server/moviedb";
import useSWRImmutable, { SWRConfig } from "swr";
import { useDb } from "~/server/db";
import type { GetServerSideProps } from "next";
import type { DocMovie, MoviePageProps } from "~/types";
import type { QParams } from "~/types";
import type { PagePropsWithSWR } from "~/types";

function buildSeriesObject(docData: DocMovie[]) {
  const series: Record<string, string> = {};
  docData.forEach((movie) => {
    const dateString = movie.date?.toDateString() || "";
    if (movie.series && dateString !== "") {
      series[`${dateString}`] = movie.series;
    }
  });
  return series;
}

export const getServerSideProps: GetServerSideProps<
  PagePropsWithSWR<MoviePageProps>,
  QParams
> = async ({ query }) => {
  const title = query.title as string;
  const year = query.year as string;

  const docData = await useDb(title, "title");

  if (!docData) {
    return {
      props: {
        fallback: { docDataKey: { title: title, year: parseInt(year) } },
      },
    };
  }

  const { director, mid } = docData[0]!;
  const series = buildSeriesObject(docData);

  let moviePageProps: MoviePageProps = {
    title: title,
    year: parseInt(year),
    director: director!,
    series: series,
  };

  // Fetch additional data for the movie from TMDB API
  const tmdbMovieData = await moviedb.getMovieData(Number(mid));

  if (tmdbMovieData.isErr) {
    return { props: { fallback: { docDataKey: moviePageProps } } };
  } else {
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

function Movie() {
  const { data, error } = useSWRImmutable<MoviePageProps, Error>("docDataKey");

  if (error) return <div>Something went wrong while loading this page.</div>;

  const { backdrop_path, title, director, year, series, overview } = data!;

  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="wrapper h-full overflow-hidden text-black dark:text-white">
        <div className="relative mb-10 h-[350px] overflow-hidden drop-shadow-sm  md:h-[550px]">
          <Image
            priority={true}
            src={backdrop_path! || '/student.png'}
            className="border-4 border-orange object-cover md:object-left-top"
            fill={true}
            sizes="(max-width: 768px) 70vw,
              (max-width: 1200px) 70vw,
              50vw"
            alt=""
          ></Image>
        </div>

        <section className="mb-10">
          <div className="flow flex flex-col">
            <div className="flex items-center gap-6 capitalize">
              <h1>
                <i>{title} </i>{" "}
                <span className="text-2xl">{year ? `(${year})` : ""}</span>
              </h1>
            </div>

            <Link
              className="w-fit"
              href={{
                pathname: `/director/${director}`,
              }}
            >
              <p className="capitalize underline decoration-orange decoration-4 underline-offset-4">
                {director}
              </p>
            </Link>

            {overview ? (
              <p>{overview}</p>
            ) : (
              <p>
                Could not find a description for this movie. Feel free to
                suggest one here.
              </p>
            )}
          </div>

          <hr className="mt-8 mb-8 w-[100%] border-t-4 border-dashed border-gray/70 bg-transparent" />
          <div className="flow flex flex-col">
            <h2>
              Shown @ <span className="font-logo font-bold">doc</span> :
            </h2>

            {Object.entries(series!).map(([date, series], key) => (
              <div key={key} className="flex items-center gap-6">
                <DateBlock date={date} />
                <p className="hidden sm:block">as part of series</p>
                <Link href={"/series"}>
                  <p className="capitalize italic underline decoration-orange decoration-4 underline-offset-4">
                    {series}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default function MoviePage({
  fallback,
}: PagePropsWithSWR<MoviePageProps>) {
  return (
    <SWRConfig value={{ fallback }}>
      <Movie />
    </SWRConfig>
  );
}
