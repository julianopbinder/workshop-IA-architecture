import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("dashboard executivo Panorama", () => {
  const page = readFileSync(resolve(process.cwd(), "client/src/pages/UsagePanoramaPage.tsx"), "utf8");

  it("mantém os indicadores corporativos e suas fontes explícitas", () => {
    expect(page).toContain("78");
    expect(page).toContain("51");
    expect(page).toContain("McKinsey 2025");
    expect(page).toContain("Stack Overflow 2025");
    expect(page).toContain("DORA");
  });

  it("distingue a avaliação didática de arquitetura de estatística externa", () => {
    expect(page).toContain("avaliação orientativa");
    expect(page).toContain("não um ranking estatístico");
    expect(page).toContain("Skills");
    expect(page).toContain("MCPs");
    expect(page).toContain("RAG");
    expect(page).toContain("SubAgentes");
  });
});
