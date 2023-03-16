import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "~/components/Header";
import DateBlock from "~/components/DateBlock";
import { prisma } from "~/server/db";
import type { GetServerSideProps } from "next";
import type { MoviePageProps, SerializableMovie } from "~/types";
import type { QParams } from "~/types";
import dither from "~/server/dither";

// async function getDataFromDb(title: string) {
//   const movies = await prisma.movies.findMany({
//     where: {
//       title: {
//         equals: title,
//       },
//     },
//   });

//   // Leave out id because bigint cannot be serialized and convert Date to string
//   const serializableMovies: SerializableMovie[] = movies.map(
//     ({ id, date, ...rest }) => {
//       return {
//         date: date?.toDateString() || "",
//         ...rest,
//       };
//     }
//   );

//   return serializableMovies;
// }

// async function getSupplementaryData(title: string, year: number) {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=${process.env
//       .MOVIEDB_API_KEY!}&query=${title}&year=${year}`
//   );

//   if (!response.ok) {
//     const message = `An error has occured: ${response.status}`;
//     throw new Error(message);
//   }

//   const data = (await response.json()) as MovieDbSearchResponse;
//   const backdropPath = data.results![0]?.backdrop_path;
//   let backdropURL = "";
//   if (backdropPath) {
//     backdropURL = "https://image.tmdb.org/t/p/w500" + backdropPath;
//     const ditheredBackdrop = await dither(backdropURL);
//     data.results![0]!.backdrop_path = ditheredBackdrop;
//   }

//   return data.results || ([] as MovieDbSearchResult[]);
// }

// function createPageProps(
//   data: SerializableMovie[],
//   supplementaryData: MovieDbSearchResult[]
// ): MoviePageProps {
//   if (!data) throw Error("Unable to create movie page props, no 'data' found");

//   const seriesMap: Record<string, string> = {};

//   for (let i = 0; i < data.length; i++) {
//     const { series, date } = data[i]!;
//     seriesMap[`${date}`] = series!;
//   }

//   const props: MoviePageProps = {
//     title: data[0]?.title!,
//     year: data[0]?.year!,
//     series: seriesMap,
//     director: data[0]?.director!,
//     backdrop_path: "",
//     overview: "",
//   };

//   if (!supplementaryData.length) {
//     return props;
//   }

//   // props.backdrop_path =
//   //   "https://image.tmdb.org/t/p/w500" + supplementaryData[0]?.backdrop_path!;
//   props.backdrop_path = supplementaryData[0]?.backdrop_path!;
//   props.overview = supplementaryData[0]?.overview;

//   return props;
// }

// export const getServerSideProps: GetServerSideProps<
//   MoviePageProps,
//   QParams
// > = async ({ params }) => {
//   if (!params?.title) throw Error("Query has no title");

//   const title = params.title;
//   const year = parseInt(params?.year!);

//   const data = await getDataFromDb(title);
//   let supplementaryData: MovieDbSearchResult[] = [];

//   if (isNaN(year)) {
//     supplementaryData = await getSupplementaryData(title, year);
//   }

//   const props = createPageProps(data, supplementaryData);

//   return {
//     props: props,
//   };
// };

export default function Movie(props: MoviePageProps) {
  // const { title, year, director, backdrop_path, overview, series } = props;
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* <main className="wrapper h-full overflow-hidden text-black dark:text-white">
        <div className="relative mb-10 h-[300px] overflow-hidden drop-shadow-sm  md:h-[500px]">
          <Image
            // style={{ imageRendering: "pixelated" }}
            // unoptimized={true}
            src={backdrop_path}
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

            <Link href={"/director"}>
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
      </main> */}
    </>
  );
}
