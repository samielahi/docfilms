import type { Movies } from "@prisma/client";
import type { ParsedUrlQuery } from "querystring";

export type Callback<T, O> = (...args: T[]) => O;
export type DocMovie = Omit<Partial<Movies>, "id" | "notes">;

export interface QueryParams extends ParsedUrlQuery {
  title?: string;
  director?: string;
  series?: string;
  year?: string;
}

export interface MoviePageProps {
  title: string;
  year?: number;
  director?: string;
  overview?: string;
  backdropURL?: string;
  series?: Record<string, string>;
}

export interface DirectorPageProps {
  director: string;
  blurb?: string;
  movies?: DocMovie[];
  movieCountByYear?: Map<string, number>;
  profileURL?: string;
}
