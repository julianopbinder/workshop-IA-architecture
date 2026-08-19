import { z } from "zod";

/**
 * Valida o resultado consolidado enviado pelo navegador ao terminar o Quiz.
 * A soma das quatro frentes precisa corresponder à pontuação total.
 */
export const quizScoreInputSchema = z
  .object({
    participantName: z
      .string()
      .trim()
      .min(2, "Informe pelo menos dois caracteres no nome.")
      .max(60)
      .refine((name) => !/\s/.test(name), "Use somente o primeiro nome no placar."),
    participantKey: z.string().uuid("Não foi possível identificar este navegador."),
    totalScore: z.number().int().min(0).max(20),
    skillScore: z.number().int().min(0).max(5),
    mcpScore: z.number().int().min(0).max(5),
    subagentsScore: z.number().int().min(0).max(5),
    ragScore: z.number().int().min(0).max(5),
  })
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

/**
 * Separa os campos usados na inserção e na atualização. A chave do navegador
 * entra apenas na inserção: por ser única no banco, ela identifica a mesma
 * linha quando uma pessoa envia novamente sua pontuação.
 */
export function buildQuizScoreUpsert(score: QuizScoreInput, completedAt: Date) {
  return {
    insert: { ...score, completedAt },
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
