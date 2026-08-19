import { describe, expect, it } from "vitest";
import { buildQuizScoreUpsert, formatParticipantName, quizScoreInputSchema } from "./quizScore";

describe("quizScoreInputSchema", () => {
  it("aceita uma pontuação cuja soma das frentes corresponde ao total", () => {
    const resultado = quizScoreInputSchema.safeParse({
      participantName: "Ana",
      participantKey: "c3563eef-0ca0-4731-b4f0-24de58c14dce",
      totalScore: 16,
      skillScore: 5,
      mcpScore: 4,
      subagentsScore: 4,
      ragScore: 3,
    });

    expect(resultado.success).toBe(true);
  });

  it("rejeita um total diferente da soma das quatro frentes", () => {
    const resultado = quizScoreInputSchema.safeParse({
      participantName: "Bruno",
      participantKey: "4970fa1e-9704-411c-92db-51944c3e8b43",
      totalScore: 20,
      skillScore: 5,
      mcpScore: 4,
      subagentsScore: 4,
      ragScore: 3,
    });

    expect(resultado.success).toBe(false);
  });

  it("rejeita nome composto para solicitar somente o primeiro nome", () => {
    const resultado = quizScoreInputSchema.safeParse({
      participantName: "Ana Silva",
      participantKey: "c3563eef-0ca0-4731-b4f0-24de58c14dce",
      totalScore: 16,
      skillScore: 5,
      mcpScore: 4,
      subagentsScore: 4,
      ragScore: 3,
    });

    expect(resultado.success).toBe(false);
    expect(formatParticipantName("  Ana  ")).toBe("Ana");
  });

  it("mantém a chave do navegador na inserção e atualiza a mesma linha no reenvio da mesma rodada", () => {
    const participantKey = "c3563eef-0ca0-4731-b4f0-24de58c14dce";
    const primeiraTentativa = quizScoreInputSchema.parse({
      participantName: "Ana",
      participantKey,
      totalScore: 16,
      skillScore: 5,
      mcpScore: 4,
      subagentsScore: 4,
      ragScore: 3,
    });
    const reenvio = quizScoreInputSchema.parse({
      ...primeiraTentativa,
      totalScore: 17,
      skillScore: 5,
      mcpScore: 5,
    });

    const primeiroUpsert = buildQuizScoreUpsert(primeiraTentativa, 7, new Date("2026-08-19T10:00:00Z"));
    const segundoUpsert = buildQuizScoreUpsert(reenvio, 7, new Date("2026-08-19T10:01:00Z"));

    expect(primeiroUpsert.insert.participantKey).toBe(participantKey);
    expect(segundoUpsert.insert.participantKey).toBe(participantKey);
    expect(segundoUpsert.update).not.toHaveProperty("participantKey");
    expect(segundoUpsert.update.totalScore).toBe(17);
  });

  it("prepara uma nova linha quando a mesma pessoa participa de outra rodada", () => {
    const score = quizScoreInputSchema.parse({
      participantName: "Ana",
      participantKey: "c3563eef-0ca0-4731-b4f0-24de58c14dce",
      totalScore: 20,
      skillScore: 5,
      mcpScore: 5,
      subagentsScore: 5,
      ragScore: 5,
    });

    const primeiraRodada = buildQuizScoreUpsert(score, 7, new Date("2026-08-19T10:00:00Z"));
    const segundaRodada = buildQuizScoreUpsert(score, 8, new Date("2026-08-19T10:15:00Z"));

    expect(primeiraRodada.insert.roundId).toBe(7);
    expect(segundaRodada.insert.roundId).toBe(8);
  });
});
