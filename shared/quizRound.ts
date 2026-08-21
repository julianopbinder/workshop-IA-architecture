/** Duração padrão usada quando o apresentador não altera o campo de início. */
export const QUIZ_DEFAULT_ROUND_DURATION_MINUTES = 10;

/** Limites seguros para impedir rodadas acidentalmente curtas ou longas demais. */
export const QUIZ_MIN_ROUND_DURATION_MINUTES = 1;
export const QUIZ_MAX_ROUND_DURATION_MINUTES = 12 * 60;

/** Duração padrão em milissegundos, mantida para compatibilidade com os cálculos existentes. */
export const QUIZ_ROUND_DURATION_MS = QUIZ_DEFAULT_ROUND_DURATION_MINUTES * 60 * 1_000;

/** Dados mínimos necessários para calcular o estado temporal de uma rodada. */
export type QuizRoundClock = {
  status: "active" | "closed";
  endsAt: Date | string;
};

/** Converte um campo de minutos ou HH:MM em uma duração validada para a rodada. */
export function parseQuizRoundDuration(value: string): { durationMinutes?: number; error?: string } {
  const normalizedValue = value.trim();
  let durationMinutes: number | undefined;

  if (/^\d+$/.test(normalizedValue)) {
    durationMinutes = Number(normalizedValue);
  } else {
    const timeParts = normalizedValue.match(/^(\d{1,2}):([0-5]\d)$/);
    if (timeParts) durationMinutes = Number(timeParts[1]) * 60 + Number(timeParts[2]);
  }

  if (!durationMinutes || durationMinutes < QUIZ_MIN_ROUND_DURATION_MINUTES || durationMinutes > QUIZ_MAX_ROUND_DURATION_MINUTES) {
    return { error: "Informe de 1 a 720 minutos, usando somente minutos ou HH:MM." };
  }

  return { durationMinutes };
}

/** Calcula o término persistido de uma nova rodada a partir do seu início e da duração escolhida. */
export function getQuizRoundEndAt(startedAt: Date, durationMinutes = QUIZ_DEFAULT_ROUND_DURATION_MINUTES): Date {
  return new Date(startedAt.getTime() + durationMinutes * 60 * 1_000);
}

/** Calcula a diferença entre o relógio local e o horário informado pelo servidor. */
export function getQuizServerClockOffset(serverNow: Date | string, clientReceivedAt = Date.now()): number {
  return new Date(serverNow).getTime() - clientReceivedAt;
}

/** Converte o horário local para a referência do servidor usada pela rodada. */
export function getSynchronizedQuizNow(serverClockOffset: number, localNow = Date.now()): number {
  return localNow + serverClockOffset;
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
