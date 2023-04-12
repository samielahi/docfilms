// Utility functions for working with data from TMBD
import { Result } from "true-myth";
import z from "zod";

const TMDBMovieSchema = z.object({
  title: z.string(),
  overview: z.string().nullable(),
  backdrop_path: z.string().nullable(),
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

type TMDBMovie = z.infer<typeof TMDBMovieSchema>;
type TMDBDirectorInfo = z.infer<typeof TMDBDirectorSchema>;
type TMDBCredits = z.infer<typeof TMDBCreditsSchema>;

const moviedb = (() => {
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

    if (movie.backdrop_path) {
      movie.backdrop_path = getImageUrl(movie.backdrop_path);
    }

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
    const truncatedBiography = `${splitBiography[0]!}. ${splitBiography[1]!}`;
    director.biography = truncatedBiography;

    if (director.profile_path) {
      director.profile_path = getImageUrl(director.profile_path);
    }

    return Result.ok(director);
  }

  function getImageUrl(path: string) {
    return "https://image.tmdb.org/t/p/original" + path;
  }

  return { getMovieData, getDirectorData };
})();

export default moviedb;
