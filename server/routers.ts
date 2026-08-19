import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { clearQuizScores, listQuizScores, saveQuizScore } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { formatParticipantName, quizScoreInputSchema } from "./quizScore";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  quiz: router({
    /** Retorna o ranking público usado na apresentação. */
    leaderboard: publicProcedure.query(async () => listQuizScores()),
    /** Salva uma pontuação consolidada, vinculada a uma chave anônima do navegador. */
    submitScore: publicProcedure.input(quizScoreInputSchema).mutation(async ({ input }) => {
      const saved = await saveQuizScore({
        ...input,
        participantName: formatParticipantName(input.participantName),
      });

      if (!saved) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "O placar não está disponível neste momento. Tente novamente em instantes.",
        });
      }

      return { success: true } as const;
    }),
    /** Reinicia a classificação; disponível somente para o organizador autenticado. */
    clearLeaderboard: adminProcedure.mutation(async () => {
      const cleared = await clearQuizScores();

      if (!cleared) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Não foi possível reiniciar o placar neste momento.",
        });
      }

      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
