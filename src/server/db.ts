import { PrismaClient } from "@prisma/client";
import type { Fetcher } from "swr";
import { DocMovie } from "~/types";
import { env } from "~/env.mjs";

type PrismaQuery =
  | { title: { equals: string } }
  | { director: { equals: string } }
  | { series: { equals: string } };

type PrismaQueryOptions = {
  query: PrismaQuery;
  series?: boolean;
  title?: boolean;
  director?: boolean;
  date?: boolean;
  mid?: boolean;
  year?: boolean;
};

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Specify some default query generators to export

export const buildMoviePageQuery = (title: string) => {
  return {
    query: { title: { equals: title } },
    series: true,
    title: true,
    director: true,
    date: true,
    mid: true,
    year: true,
  } as PrismaQueryOptions;
};

export const fetcher: Fetcher<DocMovie[], PrismaQueryOptions> = async (
  options: PrismaQueryOptions
) => {
  const query = options.query;
  // Grab only the select options
  const selectOptions = (({ query, ...rest }) => ({ ...rest }))(options);

  const movies: DocMovie[] = await prisma.movies.findMany({
    select: { ...selectOptions },
    where: { ...query },
  });

  return movies;
};
