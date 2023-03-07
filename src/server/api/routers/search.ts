import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  byTitle: publicProcedure.input(z.string().min(3)).query(({ ctx, input }) => {
    return ctx.prisma.movies.findMany({
      distinct: ["title"],
      select: {
        title: true,
        year: true,
        director: true,
      },
      where: {
        title: {
          search: input,
        },
      },
    });
  }),

  byDirector: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.movies.findMany({
      distinct: ["title"],
      select: {
        title: true,
        year: true,
        director: true,
      },
      where: {
        director: {
          contains: input,
        },
      },
    });
  }),
});
