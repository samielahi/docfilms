import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "~/components/Header";
import DateBlock from "~/components/DateBlock";
import { prisma } from "~/server/db";
import moviedb from "~/server/moviedb";
import type { GetServerSideProps } from "next";
import type { MoviePageProps, DocMovie } from "~/types";
import type { QParams } from "~/types";

async function getDataFromDb(title: string) {
  const movies: DocMovie[] = await prisma.movies.findMany({
    select: {
      title: true,
      director: true,
      date: true,
      series: true,
      year: true,
      mid: true,
    },
    where: {
      title: {
        equals: title,
      },
    },
  });

  return movies;
}

export const getServerSideProps: GetServerSideProps<
  MoviePageProps,
  QParams
> = async ({ query }) => {
  if (!query?.title) throw Error("Query has no title");
  // Fetch docfilms data
  const title = query.title as string;
  const year = query.year as string;
  const docData = await getDataFromDb(title as string);
  const { director, mid } = docData[0]!;
  const series: Record<string, string> = {};

  docData.forEach((movie) => {
    const dateString = movie.date?.toDateString() || "";
    if (movie.series && dateString !== "") {
      series[`${dateString}`] = movie.series;
    }
  });

  const props: MoviePageProps = {
    title: title,
    year: parseInt(year),
    director: director!,
    series: series,
  };

  // Fetch additional data from TMDB
  const tmdbMovieData = await moviedb.getMovieData(Number(mid));

  if (tmdbMovieData.isErr) {
    return { props: props };
  } else {
    // Unwrap the tmdb movie data
    const data = tmdbMovieData.value;
    props.backdropURL = data.backdrop_path!;
    props.overview = data.overview!;
  }

  return { props: props };
};

export default function Movie(props: MoviePageProps) {
  const { title, year, director, backdropURL, overview, series } = props;
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="wrapper h-full overflow-hidden text-black dark:text-white">
        <div className="relative mb-10 h-[300px] overflow-hidden drop-shadow-sm  md:h-[500px]">
          <Image
            src={backdropURL!}
            unoptimized={true}
            className="object-cover object-top"
            fill={true}
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
              href={{
                pathname: `/director/${props.director}`,
              }}
            >
              <p className="w-fit capitalize underline decoration-orange decoration-4 underline-offset-4">
                {director}
              </p>
            </Link>

            <p>{overview}</p>
          </div>

          <hr className="mt-8 mb-8 w-[100%]" />
          <div className="flow flex flex-col">
            <h2>
              Shown @ <span className="font-logo font-bold">doc</span>:
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
