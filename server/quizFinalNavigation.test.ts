import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("encerramento do questionário", () => {
  it("mostra um indicador final desabilitado após o tema RAG", () => {
    // A leitura protege a condição visual contra regressões ao alterar o Quiz.
    const source = readFileSync("client/src/pages/QuizPage.tsx", "utf8");

    expect(source).toContain("isFinalQuizTheme(tema)");
    expect(source).toContain("FIM DO QUESTIONÁRIO");
    expect(source).toContain("disabled aria-label=\"Fim do questionário\"");
  });
});

