import type { Movies } from "@prisma/client";
import type { ParsedUrlQuery } from "querystring";

export type Callback<T, O> = (...args: T[]) => O;

export type MoviesWithoutId = Omit<Movies, "id" | "date">;

export interface MoviePageProps {
  movies: MoviesWithoutId[];
  posterPath?: string;
  overview?: string;
}

export interface MovieDbSearchResult {
  page?: number;
  results?: Record<string, string | number | number[] | boolean | null>[];
  totalResults?: number;
  totalPages?: number;
}

export interface QParams extends ParsedUrlQuery {
  title?: string;
  director?: string;
  series?: string;
  year?: string;
}
