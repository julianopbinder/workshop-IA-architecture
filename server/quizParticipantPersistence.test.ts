import { describe, expect, it, vi } from "vitest";
import { registerQuizParticipant } from "./db";

describe("persistência da entrada no Quiz", () => {
  it("grava joinedAt e devolve o mesmo horário consultado no registro do participante", async () => {
    const persistedJoinedAt = new Date("2026-08-19T10:02:03Z");
    const insertChain = {
      values: vi.fn().mockReturnThis(),
      onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
    };
    const selectChain = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([{ participantName: "Andre", joinedAt: persistedJoinedAt }]),
    };
    const database = {
      insert: vi.fn().mockReturnValue(insertChain),
      select: vi.fn().mockReturnValue(selectChain),
    };

    const participant = await registerQuizParticipant(12, "Andre", "a55db342-5c91-4d37-93cc-c87aec58b6b2", database);

    expect(insertChain.values).toHaveBeenCalledWith(expect.objectContaining({
      roundId: 12,
      participantName: "Andre",
      participantKey: "a55db342-5c91-4d37-93cc-c87aec58b6b2",
      joinedAt: expect.any(Date),
    }));
    expect(participant).toEqual({ participantName: "Andre", joinedAt: persistedJoinedAt });
    expect(selectChain.limit).toHaveBeenCalledWith(1);
  });
});
