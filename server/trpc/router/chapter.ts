import { z } from "zod";
import { adminProcedure, router } from "../trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";

export const chapterRouter = router({
  createChapter: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        courseId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const course = await db.chapter.create({
          data: {
            title: input.title,
            courseId: input.courseId,
          },
        });

        return course;
      } catch (error) {
        console.log("[CREATE COURSE TRPC]", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  chapterReorder: adminProcedure
    .input(
      z.object({
        list: z.array(
          z.object({
            chapterId: z.string(),
            position: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { list } = input;

      try {
        for (let item of list) {
          await db.chapter.update({
            where: {
              id: item.chapterId,
            },
            data: {
              position: item.position,
            },
          });
        }

        return "Reordered successfully";
      } catch (error) {
        throw new TRPCError({
          code: "NOT_IMPLEMENTED",
          message: "Reorder unsuccessfull",
        });
      }
    }),
});
