import type { Movies } from "@prisma/client";
import type { ParsedUrlQuery } from "querystring";

export type Callback<T, O> = (...args: T[]) => O;

export interface SerializableMovie extends Omit<Movies, "id" | "date"> {
  date: string;
}

export interface MoviePageProps {
  title: string;
  year?: number;
  director?: string;
  dates?: string[];
  series?: string[];
  backdrop_path: string;
  overview?: string;
}

export interface MovieDbSearchResponse {
  page?: number;
  results?: MovieDbSearchResult[];
  totalResults?: number;
  totalPages?: number;
}

export interface MovieDbSearchResult {
  posterPath: string | null;
  adult: boolean;
  overview: string;
  releaseDate: string;
  id: number;
  backdrop_path: string;
  video: boolean;
  voteAvg: number;
  popularity: number;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  voteCount: number;
  genreIds: number[];
}

export interface QParams extends ParsedUrlQuery {
  title?: string;
  director?: string;
  series?: string;
  year?: string;
}
