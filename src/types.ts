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
  overview?: string;
  backdropURL: string;
  genre?: string;
  series?: Record<string, string>;
}

export interface DirectorPageProps {
  director: string;
  blurb?: string;
  movies?: SerializableMovie[];
  movieCountByYear?: Record<number, number>;
  imagePath?: string;
}

export interface QParams extends ParsedUrlQuery {
  title?: string;
  director?: string;
  series?: string;
  year?: string;
}
