import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const { finishCurrentQuizRoundMock, getCurrentQuizRoundMock, startNextQuizRoundMock } = vi.hoisted(() => ({
  finishCurrentQuizRoundMock: vi.fn(),
  getCurrentQuizRoundMock: vi.fn(),
  startNextQuizRoundMock: vi.fn(),
}));

vi.mock("./db", async importOriginal => {
  const original = await importOriginal<typeof import("./db")>();
  return {
    ...original,
    finishCurrentQuizRound: finishCurrentQuizRoundMock,
    getCurrentQuizRound: getCurrentQuizRoundMock,
    startNextQuizRound: startNextQuizRoundMock,
  };
});

import { appRouter } from "./routers";

function createContext(role: "admin" | "user" = "admin"): TrpcContext {
  return {
    user: { id: 1, openId: "presentation-owner", email: "organizador@example.com", name: "Organizador", loginMethod: "manus", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const activeRound = {
  id: 2,
  status: "active" as const,
  startedAt: new Date("2026-08-19T10:00:00Z"),
  endsAt: new Date("2026-08-19T10:10:00Z"),
  endedAt: null,
  createdAt: new Date("2026-08-19T10:00:00Z"),
  updatedAt: new Date("2026-08-19T10:00:00Z"),
};

describe("quiz rounds", () => {
  it("permite que o organizador abra uma nova rodada de dez minutos", async () => {
    startNextQuizRoundMock.mockResolvedValueOnce(activeRound);
    const caller = appRouter.createCaller(createContext());

    await expect(caller.quiz.startNextRound()).resolves.toEqual({ round: activeRound });
    expect(startNextQuizRoundMock).toHaveBeenCalledTimes(1);
  });

  it("permite que o organizador encerre a rodada antes do prazo", async () => {
    const closedRound = { ...activeRound, status: "closed" as const, endedAt: new Date("2026-08-19T10:04:00Z") };
    finishCurrentQuizRoundMock.mockResolvedValueOnce(closedRound);
    const caller = appRouter.createCaller(createContext());

    await expect(caller.quiz.finishRound()).resolves.toEqual({ round: closedRound });
    expect(finishCurrentQuizRoundMock).toHaveBeenCalledTimes(1);
  });

  it("rejeita o envio depois que a rodada foi encerrada", async () => {
    getCurrentQuizRoundMock.mockResolvedValueOnce({ ...activeRound, status: "closed" as const, endedAt: activeRound.endsAt });
    const caller = appRouter.createCaller({ ...createContext(), user: null });

    await expect(caller.quiz.submitScore({ participantName: "Ana", participantKey: "c3563eef-0ca0-4731-b4f0-24de58c14dce", totalScore: 20, skillScore: 5, mcpScore: 5, subagentsScore: 5, ragScore: 5 })).rejects.toMatchObject({ code: "CONFLICT" });
  });
});
