import type { movies } from "@prisma/client";
import type { ParsedUrlQuery } from "querystring";

export type DocMovie = Omit<Partial<movies>, "id" | "notes">;

export interface QParams extends ParsedUrlQuery {
  title?: string;
  director?: string;
  series?: string;
  year?: string;
}

export interface MoviePageProps {
  title: string;
  tmdbID?: number;
  year?: number;
  director?: string;
  overview?: string;
  backdrop_path?: string;
  series?: Record<string, string>;
}

export interface DirectorPageProps {
  name: string;
  biography?: string;
  movies?: DocMovie[];
  tmdbId?: number;
  movieCountByDecade?: number[][];
  profile_path?: string;
}

export interface SeriesPageProps {
  series: string;
  quarter: string;
  movies?: DocMovie[];
}

export type Page = "title" | "director" | "series";

export type PagePropsWithSWR<T> = {
  fallback: {
    docDataKey: T;
  };
};
