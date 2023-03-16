// Utility functions for working with data from TMBD

import { Result } from "true-myth";
import z from "zod";

const TBMDMovieSchema = z.object({
  title: z.string(),
  overview: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  genre: z.array(z.object({ id: z.number(), name: z.string() })),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
});

const TMBDCreditSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
  profile_path: z.string().nullable(),
});

const TBMDCreditsSchema = z.object({
  crew: z.array(TMBDCreditSchema),
});

const TMDBDirectorSchema = z.object({
  name: z.string(),
  profile_path: z.string().nullable(),
  biography: z.string(),
});

type TBMDDirectorInfo = z.infer<typeof TMDBDirectorSchema>;
type TBMDMovie = z.infer<typeof TBMDMovieSchema>;

const moviedb = (() => {
  async function getMovieData(
    movieId: number
  ): Promise<Result<TBMDMovie, Error>> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);

    if (!response.ok) {
      return Result.err(new Error("Unable to fetch movie from TMBD API."));
    }

    const movieJson = await response.json();
    const movie = TBMDMovieSchema.parse(movieJson);

    return Result.ok(movie);
  }

  async function getDirectorId(
    movieId: number
  ): Promise<Result<number, Error>> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);

    if (!response.ok) {
      return Result.err(
        new Error("Unable to fetch movie credits from TMBD API.")
      );
    }

    const creditsJson = await response.json();
    const credits = TBMDCreditsSchema.parse(creditsJson);
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
  ): Promise<Result<TBMDDirectorInfo, Error>> {
    const id = await getDirectorId(movieId);

    if (id.isErr) {
      return Result.err(id.error);
    }

    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);

    const directorJson = response.json();
    const director = TMDBDirectorSchema.parse(directorJson);

    return Result.ok(director);
  }

  return { getMovieData, getDirectorData };
})();

export default moviedb;
