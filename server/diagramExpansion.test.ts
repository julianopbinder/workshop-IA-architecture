import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("ampliação dos diagramas didáticos", () => {
  const component = readFileSync(resolve(process.cwd(), "client/src/components/ExpandableDiagram.tsx"), "utf8");
  const mcpPage = readFileSync(resolve(process.cwd(), "client/src/pages/McpPage.tsx"), "utf8");
  const subagentsPage = readFileSync(resolve(process.cwd(), "client/src/pages/SubagentsPage.tsx"), "utf8");
  const ragPage = readFileSync(resolve(process.cwd(), "client/src/pages/RagPage.tsx"), "utf8");
  const pipelines = readFileSync(resolve(process.cwd(), "client/src/components/RagPipelines.tsx"), "utf8");
  const pipelineStyles = readFileSync(resolve(process.cwd(), "client/src/components/RagPipelines.css"), "utf8");

  it("fornece clique, teclado e diálogo para ampliar diagramas", () => {
    expect(component).toContain('role="button"');
    expect(component).toContain('tabIndex={0}');
    expect(component).toContain('event.key === "Enter"');
    expect(component).toContain('role="dialog"');
    expect(component).toContain("CLIQUE PARA AMPLIAR");
  });

  it("aplica a ampliação aos bastidores de MCPs e à delegação de SubAgentes", () => {
    expect(mcpPage).toContain("ExpandableDiagram");
    expect(mcpPage).toContain("Do comando até a");
    expect(mcpPage).toContain("resposta.");
    expect(subagentsPage).toContain("ExpandableDiagram");
    expect(subagentsPage).toContain("ROTA ATIVA · DELEGAÇÃO E RETORNO");
  });

  it("mantém o cenário e os dois pipelines de RAG ampliáveis, com espaço adicional", () => {
    expect(ragPage).toContain("ExpandableDiagram");
    expect(ragPage).toContain("Qual é o prazo para pedir reembolso de uma despesa?");
    expect(pipelines).toContain("ExpandableDiagram");
    expect(pipelines).toContain("PIPELINE 02");
    expect(pipelineStyles).toContain("margin-top:106px");
  });
});
