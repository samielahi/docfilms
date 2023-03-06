import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  byTitle: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.movies.findMany({
      distinct: ["title"],
      select: {
        title: true,
        year: true,
        director: true,
      },
      where: {
        title: {
          contains: input,
        },
      },
    });
  }),

  // byDirector: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return ctx.prisma.movies.findMany({
  //     // take: 3,
  //     where: {
  //       director: {
  //         contains: input,
  //       },
  //     },
  //   });
  // }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
