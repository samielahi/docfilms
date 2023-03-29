import type { Movies } from "@prisma/client";
import type { ParsedUrlQuery } from "querystring";

export type DocMovie = Omit<Partial<Movies>, "id" | "notes">;

export interface QParams extends ParsedUrlQuery {
  title?: string;
  director?: string;
  series?: string;
  year?: string;
}

export interface MoviePageProps {
  title: string;
  mid?: string;
  year?: number;
  director?: string;
  overview?: string;
  backdrop_path?: string;
  series?: Record<string, string>;
}

export interface DirectorPageProps {
  director: string;
  blurb?: string;
  movies?: DocMovie[];
  movieCountByDecade?: Record<number, number>;
  profileURL?: string;
}

export interface SeriesPageProps {
  series: string;
  movies: DocMovie[];
}

export type Page = "title" | "director" | "series";

export type PagePropsWithSWR<T> = {
  fallback: {
    docDataKey: T;
  };
};
