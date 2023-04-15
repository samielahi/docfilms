// Prisma global
import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
import type { Fetcher } from "swr";
import type { Page, DocMovie, DirectorPageProps } from "~/types";

type PrismaQuery =
  | { title: { equals: string } }
  | { director: { equals: string } }
  | { series: { equals: string } };

type PrismaQueryOptions = {
  query: PrismaQuery;
  series?: boolean;
  title?: boolean;
  director?: boolean;
  date?: boolean;
  mid?: boolean;
  year?: boolean;
  overview?: boolean;
  times_shown?: boolean;
  quarter?: boolean;
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Utils for getting data through prisma

function buildPageQuery(whereClause: string, page: Page) {
  const query = {} as Record<typeof page, any>;

  ((page) => {
    query[page] = { equals: whereClause.toLowerCase() };
  })(page);

  const options: PrismaQueryOptions = {
    query: query,
    series: true,
    title: true,
    director: true,
    date: true,
    mid: true,
    year: true,
    times_shown: true,
    quarter: true,
  };

  switch (page) {
    case "director":
      return (({ series, director, ...rest }) => ({ ...rest }))(options);
    case "series":
      return (({ series, mid, ...rest }) => ({ ...rest }))(options);
    default:
      return options;
  }
}

// SWR Fetcher function for queries
const fetcher: Fetcher<DocMovie[], PrismaQueryOptions> = async (
  options: PrismaQueryOptions
) => {
  const query = options.query;
  // Grab only the select options
  const selectOptions = (({ query, ...rest }) => ({ ...rest }))(options);

  const movies: DocMovie[] = await prisma.movies.findMany({
    select: { ...selectOptions },
    where: { ...query },
  });

  return movies;
};

export async function useDb(whereClause: string, page: Page) {
  const queryOptions = buildPageQuery(whereClause, page);
  const docData = await fetcher(queryOptions);
  return docData;
}

export const db = (() => {
  // Helper for building movie count by decade for a director
  function buildMovieCountMap(docData: DocMovie[]) {
    // If any of the director's movies has a tmdbID, we'll use it to fetch info about the director
    let tmdbIdForDirectorData: number = 0;
    const movieCountByDecade: Record<number, number> = {};

    docData.forEach((movie) => {
      if (!tmdbIdForDirectorData) {
        tmdbIdForDirectorData = Number(movie.tmdbID);
      }

      const year = parseInt(movie.date?.toDateString().split(" ")[3]!);
      const decade = Math.floor(year / 10) * 10;

      if (Object.hasOwn(movieCountByDecade, `${decade}`)) {
        movieCountByDecade[`${decade}`] += 1;
      } else {
        movieCountByDecade[`${decade}`] = 1;
      }

      movie.date = null;
      movie.tmdbID = null;
    });
    return { tmdbIdForDirectorData, movieCountByDecade };
  }

  async function getDirectorPageProps(director: string) {
    // Fetch unique movies shown by specified director from the db
    const moviesShown = await prisma.movies.findMany({
      select: {
        title: true,
        tmdbID: true,
        year: true,
        times_shown: true,
        date: true,
      },
      where: {
        director: {
          equals: director.toLowerCase(),
        },
      },
    });

    // Build movieCountByDecade map
    const { tmdbIdForDirectorData, movieCountByDecade } =
      buildMovieCountMap(moviesShown);
    // Convert it into an array of data points for BarPlot
    const movieCountByDecadeArray = Object.entries(movieCountByDecade).map(
      (mc) => [parseInt(mc[0]), mc[1]]
    );

    const uniqueTitles = new Set(moviesShown.map((movie) => movie.title));
    const uniqueMoviesShown: DocMovie[] = [];
    moviesShown.forEach((movie) => {
      if (uniqueTitles.has(movie.title)) {
        uniqueTitles.delete(movie.title);
        uniqueMoviesShown.push(movie);
      }
    });

    const directorPageProps: DirectorPageProps = {
      name: director,
      movies: uniqueMoviesShown,
      movieCountByDecade: movieCountByDecadeArray,
      tmdbId: tmdbIdForDirectorData,
    };

    return directorPageProps;
  }

  return { getDirectorPageProps };
})();
