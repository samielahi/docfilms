import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  byTitle: publicProcedure.input(z.string().min(3)).query(({ ctx, input }) => {
    return ctx.prisma.movies.findMany({
      take: 5,
      distinct: ["title"],
      select: {
        title: true,
        year: true,
        director: true,
      },
      where: {
        title: {
          contains: input.toLowerCase(),
        },
      },
    });
  }),
});
