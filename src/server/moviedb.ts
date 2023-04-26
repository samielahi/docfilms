// Utility functions for working with data from TMBD
import { Result } from "true-myth";
import z from "zod";
import type { Row } from "~/components/Archiver/types";
import type { DocMovie } from "~/types";

// Modeling API responses
const TMDBMovieSchema = z.object({
  title: z.string(),
  overview: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  id: z.number(),
});

const TMBDCreditSchema = z.object({
  id: z.number(),
  job: z.string(),
});

const TMDBCreditsSchema = z.object({
  crew: z.array(TMBDCreditSchema),
});

const TMDBDirectorSchema = z.object({
  name: z.string(),
  profile_path: z.string().nullable(),
  biography: z.string(),
});

const TMDBSearchSchema = z.object({
  results: z.array(TMDBMovieSchema),
});

type TMBDSearchResult = z.infer<typeof TMDBSearchSchema>;
export type TMDBMovie = z.infer<typeof TMDBMovieSchema>;
export type TMDBDirectorInfo = z.infer<typeof TMDBDirectorSchema>;
type TMDBCredits = z.infer<typeof TMDBCreditsSchema>;

const moviedb = (() => {
  function getQuarter(date: string) {
    const splitDate = date.split("-");
    const year = splitDate[0]!;
    const month = parseInt(splitDate[1]!);
    let season = null;

    if (month <= 3) {
      season = "Winter";
    } else if (month > 3 && month <= 6) {
      season = "Spring";
    } else if (month > 6 && month <= 9) {
      season = "Summer";
    } else {
      season = "Fall";
    }

    return season + year;
  }

  async function getMovieSearchData(
    title: string,
    year: number
  ): Promise<Result<TMDBMovie, Error>> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env
      .MOVIEDB_API_KEY!}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`;
    const response = await fetch(url);

    if (!response.ok) {
      return Result.err(new Error("Unable to find movie on TMBD."));
    }

    const searchResultsJson = (await response.json()) as TMBDSearchResult;
    const movie = TMDBSearchSchema.parse(searchResultsJson).results[0]!;

    Object.defineProperty(movie, "tmdbID", { value: movie.id, writable: true });
    // @ts-ignore
    delete movie.id;

    return Result.ok(movie);
  }

  async function getMovieData(
    movieId: number
  ): Promise<Result<TMDBMovie, Error>> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process
      .env.MOVIEDB_API_KEY!}&language=en-US`;
    const response = await fetch(url);

    if (!response.ok) {
      return Result.err(new Error("Unable to fetch movie from TMBD API."));
    }

    const movieJson = (await response.json()) as TMDBMovie;
    const movie = TMDBMovieSchema.parse(movieJson);

    return Result.ok(movie);
  }

  async function getDirectorId(
    movieId: number
  ): Promise<Result<number, Error>> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process
      .env.MOVIEDB_API_KEY!}&language=en-US`;
    const response = await fetch(url);

    if (!response.ok) {
      return Result.err(
        new Error("Unable to fetch movie credits from TMBD API.")
      );
    }

    const creditsJson = (await response.json()) as TMDBCredits;
    const credits = TMDBCreditsSchema.parse(creditsJson);
    const director = credits.crew.filter((person) => person.job === "Director");
    let directorId: number;

    if (director.length && director[0]) {
      directorId = director[0].id;
    } else {
      return Result.err(new Error("Unable to find director in movie credits."));
    }

    return Result.ok(directorId);
  }

  async function getDirectorData(
    movieId: number
  ): Promise<Result<TMDBDirectorInfo, Error>> {
    const id = await getDirectorId(movieId);

    if (id.isErr) {
      return Result.err(id.error);
    }

    const url = `https://api.themoviedb.org/3/person/${
      id.value
    }?api_key=${process.env.MOVIEDB_API_KEY!}&language=en-US`;

    const response = await fetch(url);

    const directorJson = (await response.json()) as TMDBDirectorInfo;
    const director = TMDBDirectorSchema.parse(directorJson);

    const splitBiography = director.biography.split(".");
    const truncatedBiography = `${splitBiography[0]!}. ${splitBiography[1]!}.`;
    director.biography = truncatedBiography;

    if (director.profile_path) {
      director.profile_path = getImageUrl(director.profile_path);
    }

    return Result.ok(director);
  }

  function getImageUrl(path: string, original: boolean = true) {
    if (original) {
      return "https://image.tmdb.org/t/p/original" + path;
    } else {
      return "https://image.tmdb.org/t/p/w500" + path;
    }
  }

  async function enrichCapsuleData(rows: Row[]) {
    const queriesForTMDBData = rows.map((row) => {
      return getMovieSearchData(row.title!, row.year!);
    });

    const tmdbData = await Promise.all(queriesForTMDBData);

    const enrichedData: DocMovie[] = [];

    for (let i = 0; i < rows.length; i++) {
      const { title, year, director, date, series } = rows[i]!;
      const docData = {
        title: title?.toLowerCase(),
        year: year,
        director: director?.toLowerCase(),
        date: new Date(date!),
        series: series?.toLowerCase(),
        overview: "",
        backdrop_path: "",
        quarter: getQuarter(date! as string),
        times_shown: 1,
        tmdbID: -1,
      };

      const additionalInfo = tmdbData[i];

      if (additionalInfo?.isErr) {
        enrichedData.push(docData);
      } else {
        enrichedData.push(Object.assign(docData, additionalInfo?.value));
      }
    }

    return enrichedData;
  }

  return { getMovieData, getDirectorData, getImageUrl, enrichCapsuleData };
})();

export default moviedb;
