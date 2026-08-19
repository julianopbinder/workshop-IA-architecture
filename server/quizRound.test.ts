import { describe, expect, it } from "vitest";
import { getQuizRoundEndAt, getQuizRoundRemainingMilliseconds, getQuizServerClockOffset, getSynchronizedQuizNow, isQuizRoundOpen, QUIZ_ROUND_DURATION_MS } from "../shared/quizRound";

describe("relógio compartilhado da rodada", () => {
  it("abre com exatamente dez minutos e passa a decrescer a partir do fim persistido", () => {
    const startedAt = new Date("2026-08-19T12:00:00.000Z");
    const endsAt = getQuizRoundEndAt(startedAt);
    const round = { status: "active" as const, endsAt };

    expect(endsAt.getTime() - startedAt.getTime()).toBe(QUIZ_ROUND_DURATION_MS);
    expect(getQuizRoundRemainingMilliseconds(round, startedAt.getTime())).toBe(600_000);
    expect(getQuizRoundRemainingMilliseconds(round, startedAt.getTime() + 75_000)).toBe(525_000);
    expect(isQuizRoundOpen(round, startedAt.getTime() + 75_000)).toBe(true);
  });

  it("entrega o mesmo tempo restante a participantes em sessões distintas e zera quando a rodada fecha", () => {
    const endsAt = new Date("2026-08-19T12:10:00.000Z");
    const activeRound = { status: "active" as const, endsAt };
    const checkedAt = new Date("2026-08-19T12:04:12.000Z").getTime();

    const participantOne = getQuizRoundRemainingMilliseconds(activeRound, checkedAt);
    const participantTwo = getQuizRoundRemainingMilliseconds(activeRound, checkedAt);

    expect(participantOne).toBe(348_000);
    expect(participantTwo).toBe(participantOne);
    expect(getQuizRoundRemainingMilliseconds({ status: "closed" as const, endsAt }, checkedAt)).toBe(0);
  });

  it("compensa relógios locais diferentes pela referência recebida do servidor", () => {
    const serverNow = new Date("2026-08-19T12:04:12.000Z");
    const endsAt = new Date("2026-08-19T12:10:00.000Z");
    const activeRound = { status: "active" as const, endsAt };
    const localClockAhead = serverNow.getTime() + 60_000;
    const localClockBehind = serverNow.getTime() - 45_000;

    const firstParticipantNow = getSynchronizedQuizNow(getQuizServerClockOffset(serverNow, localClockAhead), localClockAhead);
    const secondParticipantNow = getSynchronizedQuizNow(getQuizServerClockOffset(serverNow, localClockBehind), localClockBehind);

    expect(firstParticipantNow).toBe(serverNow.getTime());
    expect(secondParticipantNow).toBe(serverNow.getTime());
    expect(getQuizRoundRemainingMilliseconds(activeRound, firstParticipantNow)).toBe(348_000);
    expect(getQuizRoundRemainingMilliseconds(activeRound, secondParticipantNow)).toBe(348_000);
  });
});
