import { z } from "zod";
import { QUIZ_DEFAULT_ROUND_DURATION_MINUTES, QUIZ_MAX_ROUND_DURATION_MINUTES, QUIZ_MIN_ROUND_DURATION_MINUTES } from "../shared/quizRound";

/** Valida a identificação simples usada para entrar em uma rodada pública. */
export const quizParticipantInputSchema = z.object({
  participantName: z
    .string()
    .trim()
    .min(2, "Informe pelo menos dois caracteres no nome.")
    .max(60)
    .refine((name) => !/\s/.test(name), "Use somente o primeiro nome no placar."),
  participantKey: z.string().uuid("Não foi possível identificar este navegador."),
});

/** Valida a chave anônima que identifica o navegador que controla a rodada. */
export const quizRoundStarterInputSchema = z.object({
  participantKey: z.string().uuid("Não foi possível identificar este navegador."),
});

/** Valida a duração já normalizada para minutos antes de abrir uma rodada pública. */
export const quizRoundStartInputSchema = quizRoundStarterInputSchema.extend({
  durationMinutes: z
    .number()
    .int()
    .min(QUIZ_MIN_ROUND_DURATION_MINUTES, "A duração mínima é de 1 minuto.")
    .max(QUIZ_MAX_ROUND_DURATION_MINUTES, "A duração máxima é de 12 horas.")
    .default(QUIZ_DEFAULT_ROUND_DURATION_MINUTES),
});

/**
 * Valida o resultado consolidado enviado pelo navegador ao terminar o Quiz.
 * A soma das quatro frentes precisa corresponder à pontuação total.
 */
export const quizScoreInputSchema = z
  .object({
    totalScore: z.number().int().min(0).max(20),
    skillScore: z.number().int().min(0).max(5),
    mcpScore: z.number().int().min(0).max(5),
    subagentsScore: z.number().int().min(0).max(5),
    ragScore: z.number().int().min(0).max(5),
  })
  .and(quizParticipantInputSchema)
  .superRefine((score, context) => {
    const scorePorFrente = score.skillScore + score.mcpScore + score.subagentsScore + score.ragScore;

    if (score.totalScore !== scorePorFrente) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A pontuação total precisa ser igual à soma das quatro frentes.",
        path: ["totalScore"],
      });
    }
  });

export type QuizScoreInput = z.infer<typeof quizScoreInputSchema>;

/** Normaliza o primeiro nome informado para manter o placar legível. */
export function formatParticipantName(name: string) {
  return name.trim();
}

/** Prepara a entrada de uma pessoa e fixa o instante em que ela começou o Quiz. */
export function buildQuizParticipantJoin(roundId: number, participantName: string, participantKey: string, joinedAt: Date) {
  return { roundId, participantName, participantKey, joinedAt };
}

/**
 * Separa os campos usados na inserção e na atualização. A chave do navegador
 * identifica a mesma pessoa apenas dentro da rodada recebida, permitindo que
 * ela participe novamente em uma nova rodada da apresentação.
 */
export function buildQuizScoreUpsert(score: QuizScoreInput, roundId: number, completedAt: Date) {
  return {
    insert: { ...score, roundId, completedAt },
    update: {
      participantName: score.participantName,
      totalScore: score.totalScore,
      skillScore: score.skillScore,
      mcpScore: score.mcpScore,
      subagentsScore: score.subagentsScore,
      ragScore: score.ragScore,
      completedAt,
    },
  };
}
