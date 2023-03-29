// Prisma global
import { PrismaClient } from "@prisma/client";
import type { Fetcher } from "swr";
import { DocMovie } from "~/types";
import { env } from "~/env.mjs";
import { Page } from "~/types";

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

// Utils for getting data through prisma

function buildPageQuery(whereClause: string, page: Page) {
  const query = {} as Record<typeof page, any>;

  ((page) => {
    query[page] = { equals: whereClause.toLowerCase() };
  })(page);

  const options: PrismaQueryOptions = {
    query: query,
    series: true,
    title: true,
    director: true,
    date: true,
    mid: true,
    year: true,
  };

  switch (page) {
    case "director":
      return (({ series, director, ...rest }) => ({ ...rest }))(options);
    case "series":
      return (({ series, mid, ...rest }) => ({ ...rest }))(options);
    default:
      return options;
  }
}

// SWR Fetcher function for queries
const fetcher: Fetcher<DocMovie[], PrismaQueryOptions> = async (
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

export async function useDb(whereClause: string, page: Page) {
  const queryOptions = buildPageQuery(whereClause, page);
  const docData = await fetcher(queryOptions);
  return docData;
}
