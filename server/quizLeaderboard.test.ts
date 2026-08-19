import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const { clearQuizScoresMock } = vi.hoisted(() => ({
  clearQuizScoresMock: vi.fn(),
}));

vi.mock("./db", async importOriginal => {
  const original = await importOriginal<typeof import("./db")>();

  return {
    ...original,
    clearQuizScores: clearQuizScoresMock,
  };
});

import { appRouter } from "./routers";

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "presentation-owner",
      email: "organizador@example.com",
      name: "Organizador",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("quiz.clearLeaderboard", () => {
  it("permite que o organizador limpe o placar", async () => {
    clearQuizScoresMock.mockResolvedValueOnce(true);
    const caller = appRouter.createCaller(createAdminContext());

    await expect(caller.quiz.clearLeaderboard()).resolves.toEqual({ success: true });
    expect(clearQuizScoresMock).toHaveBeenCalledTimes(1);
  });
});
