import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { finishCurrentQuizRound, getCurrentQuizRound, listQuizScores, saveQuizScore, startNextQuizRound } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
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
    /** Retorna a rodada atual e seu ranking público para a apresentação. */
    leaderboard: publicProcedure.query(async () => {
      const round = await getCurrentQuizRound();
      if (!round) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "A rodada do Quiz não está disponível neste momento." });
      }

      return { round, scores: await listQuizScores(round.id) };
    }),
    /** Salva uma pontuação apenas enquanto a rodada corrente estiver aberta. */
    submitScore: publicProcedure.input(quizScoreInputSchema).mutation(async ({ input }) => {
      const round = await getCurrentQuizRound();
      if (!round || round.status !== "active" || new Date() >= round.endsAt) {
        throw new TRPCError({ code: "CONFLICT", message: "Esta rodada já foi encerrada. Aguarde o organizador iniciar a próxima." });
      }

      const saved = await saveQuizScore(round.id, {
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
    /** Fecha publicamente a rodada antes do prazo solicitado pela equipe. */
    finishRound: publicProcedure.mutation(async () => {
      const round = await finishCurrentQuizRound();
      if (!round) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível encerrar a rodada agora." });
      return { round };
    }),
    /** Inicia publicamente uma nova rodada de dez minutos e preserva os resultados anteriores. */
    startNextRound: publicProcedure.mutation(async () => {
      const round = await startNextQuizRound();
      if (!round) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Não foi possível iniciar uma nova rodada agora." });
      return { round };
    }),
  }),
});

export type AppRouter = typeof appRouter;
