import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import type { GetServerSideProps } from "next";
import type {
  MovieDbSearchResponse,
  MovieDbSearchResult,
  MoviePageProps,
  SerializableMovie,
} from "~/types";
import type { QParams } from "~/types";

const prisma = new PrismaClient();

async function getDataFromDb(title: string) {
  const movies = await prisma.movies.findMany({
    where: {
      title: {
        equals: title,
      },
    },
  });

  // Leave out id because bigint cannot be serialized and convert Date to string
  const serializableMovies: SerializableMovie[] = movies.map(
    ({ id, date, ...rest }) => {
      return {
        date: date?.toDateString() || "",
        ...rest,
      };
    }
  );

  return serializableMovies;
}

async function getSupplementaryData(title: string, year: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env
      .MOVIEDB_API_KEY!}&query=${title}&year=${year}`
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = (await response.json()) as MovieDbSearchResponse;
  return data.results || ([] as MovieDbSearchResult[]);
}

function createPageProps(
  data: SerializableMovie[],
  supplementaryData: MovieDbSearchResult[]
): MoviePageProps {
  if (!data) throw Error("Unable to create movie page props, no 'data' found");

  const seriesList = [];
  const dates = [];

  for (let i = 0; i < data.length; i++) {
    const { series, date } = data[i]!;
    seriesList.push(series!);
    dates.push(date);
  }

  const props: MoviePageProps = {
    title: data[0]?.title!,
    series: seriesList,
    dates: dates,
    year: data[0]?.year!,
    director: data[0]?.director!,
    backdrop_path: "",
    overview: "",
  };

  if (!supplementaryData.length) {
    return props;
  }

  props.backdrop_path = supplementaryData[0]?.backdrop_path!;
  props.overview = supplementaryData[0]?.overview;

  return props;
}

export const getServerSideProps: GetServerSideProps<
  MoviePageProps,
  QParams
> = async ({ params }) => {
  if (!params?.title) throw Error("Query has no title");

  const title = params.title;
  const year = parseInt(params?.year!);

  const data = await getDataFromDb(title);
  let supplementaryData: MovieDbSearchResult[] = [];

  if (isNaN(year)) {
    supplementaryData = await getSupplementaryData(title, year);
  }

  const props = createPageProps(data, supplementaryData);

  return {
    props: props,
  };
};

export default function Movie(props: MoviePageProps) {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen h-screen overflow-hidden">
        <section className="relative flex h-1/2 items-center justify-center">
          <div className="absolute h-full w-full bg-cover opacity-20 bg-blend-screen grayscale">
            <img
              src={`https://image.tmdb.org/t/p/original${props.backdrop_path}`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="text-center text-white">
            <h1 className="text-6xl capitalize">{props.title}</h1>
            <span className="text-xl font-bold text-orange">
              {props.year ? `(${props.year})` : ""}
            </span>
          </div>
        </section>

        <section className="flex h-1/2">
          <div className="flex h-full w-1/3  bg-orange p-12">
            <p className="text-lg text-black">{props.overview}</p>
          </div>
          <div className="h-full w-1/3 bg-pink"></div>
          <div className="h-full w-1/3 bg-yellow"></div>
        </section>
      </main>
    </>
  );
}
