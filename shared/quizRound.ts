/** Duração fixa de uma rodada do Quiz: dez minutos em milissegundos. */
export const QUIZ_ROUND_DURATION_MS = 10 * 60 * 1_000;

/** Dados mínimos necessários para calcular o estado temporal de uma rodada. */
export type QuizRoundClock = {
  status: "active" | "closed";
  endsAt: Date | string;
};

/** Calcula o término persistido de uma nova rodada a partir do seu início. */
export function getQuizRoundEndAt(startedAt: Date): Date {
  return new Date(startedAt.getTime() + QUIZ_ROUND_DURATION_MS);
}

/** Retorna zero para rodadas encerradas e o tempo restante para rodadas abertas. */
export function getQuizRoundRemainingMilliseconds(round: QuizRoundClock | null | undefined, now = Date.now()): number {
  if (!round || round.status !== "active") return 0;
  return Math.max(0, new Date(round.endsAt).getTime() - now);
}

/** Informa se ainda há uma janela aberta para entrada e respostas no Quiz. */
export function isQuizRoundOpen(round: QuizRoundClock | null | undefined, now = Date.now()): boolean {
  return getQuizRoundRemainingMilliseconds(round, now) > 0;
}
