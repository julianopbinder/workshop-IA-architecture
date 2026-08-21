import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("dashboard executivo Panorama", () => {
  const page = readFileSync(resolve(process.cwd(), "client/src/pages/UsagePanoramaPage.tsx"), "utf8");
  const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
  const navigation = readFileSync(resolve(process.cwd(), "client/src/components/LibraryNav.tsx"), "utf8");

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

  it("usa gráficos de pizza e rosca também na comparação arquitetural", () => {
    expect(page).toContain("PieChart");
    expect(page).toContain("GraficoRosca");
    expect(page).toContain("architecture-pie-card");
    expect(page).toContain("não representa percentual de adoção");
  });

  it("mantém a escala ampliada dos gráficos e tipografia para leitura sem zoom", () => {
    expect(page).toContain("pie-scale-expanded");
    expect(styles).toContain(".pie-scale-expanded .trust-large-pie");
    expect(styles).toContain("width: 255px");
    expect(styles).toContain("grid-template-columns: repeat(2, 1fr)");
  });

  it("mantém os quatro indicadores superiores contidos no espaço disponível", () => {
    expect(styles).toContain("grid-template-columns: 132px minmax(0, 1fr)");
    expect(styles).toContain("min-height: 228px");
  });

  it("abre diretamente o painel principal sem abas de escolha de gráfico", () => {
    expect(page).toContain("<PainelCircular />");
    expect(page).not.toContain("panorama-view-tabs");
    expect(page).not.toContain("selecionarVisao");
    expect(page).not.toContain('get("visao")');
  });

  it("mantém somente o link principal de Panorama na navegação", () => {
    expect(navigation).toContain('href="/panorama"');
    expect(navigation).not.toContain("panorama-submenu");
    expect(navigation).not.toContain("mobile-panorama-submenu");
  });

  it("repete todos os blocos analíticos e fontes nas três leituras alternativas", () => {
    expect(page).toContain("alternative-detail-grid");
    expect(page).toContain("Da adoção ao valor");
    expect(page).toContain("O controle continua humano");
    expect(page).toContain("Onde a IA aparece primeiro");
    expect(page).toContain("Onde começar");
    expect(page).toContain("ArquiteturaAlternativa");
    expect(page).toContain("McKinsey Global Survey 2025");
    expect(page).toContain("DORA, análise qualitativa de 2025");
    expect(page).toContain("Roteiro recomendado para times iniciantes");
  });

  it("mantém os cartões de arquitetura em fundo branco e contraste escuro", () => {
    expect(styles).toContain(".architecture-pie-card { display: flex");
    expect(styles).toContain("background: #ffffff");
    expect(styles).toContain(".architecture-pie-card h3 { margin: 4px 0 0; color: #1a2a38");
  });
});
