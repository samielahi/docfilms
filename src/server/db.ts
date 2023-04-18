// Prisma global
import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
import moviedb from "./moviedb";
import type {
  DocMovie,
  DirectorPageProps,
  MoviePageProps,
  SeriesPageProps,
} from "~/types";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Utils for working with db data
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

  async function getMoviePageProps(title: string) {
    const movies = await prisma.movies.findMany({
      select: {
        title: true,
        director: true,
        tmdbID: true,
        year: true,
        series: true,
        times_shown: true,
        date: true,
        overview: true,
        backdrop_path: true,
      },
      where: {
        title: {
          equals: title.toLowerCase(),
        },
      },
    });

    const { year, director, backdrop_path } = movies[0]!;
    const series = buildSeriesObject(movies);
    const moviePageProps: MoviePageProps = {
      title: title,
      year: year!,
      director: director!,
      series: series,
      backdrop_path: backdrop_path
        ? moviedb.getImageUrl(backdrop_path)
        : "/student.png",
      tmdbID: Number(movies[0]?.tmdbID!),
    };

    return moviePageProps;
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

  async function getSeriesPageProps(series: string) {
    const movies = await prisma.movies.findMany({
      select: {
        title: true,
        year: true,
        times_shown: true,
        quarter: true,
        backdrop_path: true,
      },
      where: {
        series: {
          equals: series.toLowerCase(),
        },
      },
    });

    const seriesPageProps: SeriesPageProps = {
      series: series,
      quarter: movies[0]?.quarter!,
      movies: movies,
    };

    return seriesPageProps;
  }

  /*
  TODO:
    - Update records based on where clause
    - Uploading capsule csv
      - Create records and update affected
    - Checking if index needs to be added to and updating
    - Delete?
  */

  return { getDirectorPageProps, getMoviePageProps, getSeriesPageProps };
})();
