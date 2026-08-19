import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const { finishCurrentQuizRoundMock, getCurrentQuizRoundMock, markQuizParticipantCompletedMock, registerQuizParticipantMock, saveQuizScoreMock, startNextQuizRoundMock } = vi.hoisted(() => ({
  finishCurrentQuizRoundMock: vi.fn(),
  getCurrentQuizRoundMock: vi.fn(),
  markQuizParticipantCompletedMock: vi.fn(),
  registerQuizParticipantMock: vi.fn(),
  saveQuizScoreMock: vi.fn(),
  startNextQuizRoundMock: vi.fn(),
}));

vi.mock("./db", async importOriginal => {
  const original = await importOriginal<typeof import("./db")>();
  return {
    ...original,
    finishCurrentQuizRound: finishCurrentQuizRoundMock,
    getCurrentQuizRound: getCurrentQuizRoundMock,
    markQuizParticipantCompleted: markQuizParticipantCompletedMock,
    registerQuizParticipant: registerQuizParticipantMock,
    saveQuizScore: saveQuizScoreMock,
    startNextQuizRound: startNextQuizRoundMock,
  };
});

import { appRouter } from "./routers";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const now = Date.now();
const activeRound = {
  id: 2,
  status: "active" as const,
  startedAt: new Date(now - 60_000),
  startedByParticipantKey: "a55db342-5c91-4d37-93cc-c87aec58b6b2",
  endsAt: new Date(now + 9 * 60_000),
  endedAt: null,
  createdAt: new Date(now - 60_000),
  updatedAt: new Date(now - 60_000),
};

describe("quiz rounds", () => {
  it("permite que um visitante comece uma nova rodada de dez minutos sem login", async () => {
    startNextQuizRoundMock.mockResolvedValueOnce(activeRound);
    const caller = appRouter.createCaller(createPublicContext());
    const participantKey = "a55db342-5c91-4d37-93cc-c87aec58b6b2";

    await expect(caller.quiz.startNextRound({ participantKey })).resolves.toEqual({ round: activeRound });
    expect(startNextQuizRoundMock).toHaveBeenCalledWith(participantKey);
  });

  it("permite que quem iniciou a rodada a finalize antes do prazo sem login", async () => {
    const closedRound = { ...activeRound, status: "closed" as const, endedAt: new Date(now) };
    getCurrentQuizRoundMock.mockResolvedValueOnce(activeRound);
    finishCurrentQuizRoundMock.mockResolvedValueOnce(closedRound);
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.quiz.finishRound({ participantKey: activeRound.startedByParticipantKey })).resolves.toEqual({ round: closedRound });
    expect(finishCurrentQuizRoundMock).toHaveBeenCalledWith(activeRound.startedByParticipantKey);
  });

  it("impede que outro navegador finalize a rodada iniciada por outra pessoa", async () => {
    getCurrentQuizRoundMock.mockResolvedValueOnce(activeRound);
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.quiz.finishRound({ participantKey: "995db342-5c91-4d37-93cc-c87aec58b6b2" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(finishCurrentQuizRoundMock).not.toHaveBeenCalledWith("995db342-5c91-4d37-93cc-c87aec58b6b2");
  });

  it("permite a entrada de uma pessoa pelo primeiro nome durante a rodada pública", async () => {
    getCurrentQuizRoundMock.mockResolvedValueOnce(activeRound);
    const joinedAt = new Date(now);
    registerQuizParticipantMock.mockResolvedValueOnce({ participantName: "Andre", joinedAt });
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.quiz.joinRound({ participantName: "Andre", participantKey: "a55db342-5c91-4d37-93cc-c87aec58b6b2" })).resolves.toEqual({ round: activeRound, joinedAt });
    expect(registerQuizParticipantMock).toHaveBeenCalledWith(activeRound.id, "Andre", "a55db342-5c91-4d37-93cc-c87aec58b6b2");
  });

  it("recusa nova entrada quando a rodada já foi finalizada", async () => {
    getCurrentQuizRoundMock.mockResolvedValueOnce({ ...activeRound, status: "closed" as const, endedAt: activeRound.endsAt });
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.quiz.joinRound({ participantName: "Maria", participantKey: "995db342-5c91-4d37-93cc-c87aec58b6b2" })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("marca como concluído somente quem enviou as vinte respostas", async () => {
    const participantKey = "a55db342-5c91-4d37-93cc-c87aec58b6b2";
    getCurrentQuizRoundMock.mockResolvedValueOnce(activeRound);
    saveQuizScoreMock.mockResolvedValueOnce(true);
    markQuizParticipantCompletedMock.mockResolvedValueOnce(true);
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.quiz.submitScore({ participantName: "Andre", participantKey, totalScore: 20, skillScore: 5, mcpScore: 5, subagentsScore: 5, ragScore: 5 })).resolves.toEqual({ success: true });
    expect(markQuizParticipantCompletedMock).toHaveBeenCalledWith(activeRound.id, participantKey);
  });

  it("rejeita o envio depois que a rodada foi encerrada", async () => {
    getCurrentQuizRoundMock.mockResolvedValueOnce({ ...activeRound, status: "closed" as const, endedAt: activeRound.endsAt });
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.quiz.submitScore({ participantName: "Ana", participantKey: "c3563eef-0ca0-4731-b4f0-24de58c14dce", totalScore: 20, skillScore: 5, mcpScore: 5, subagentsScore: 5, ragScore: 5 })).rejects.toMatchObject({ code: "CONFLICT" });
  });
});
