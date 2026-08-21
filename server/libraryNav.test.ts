import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LibraryNav } from "../client/src/components/LibraryNav";

describe("LibraryNav", () => {
  it("mantém o acionador móvel, o painel de fundo branco e todos os módulos", () => {
    const html = renderToStaticMarkup(createElement(LibraryNav, { ativo: "quiz" }));

    expect(html).toContain('aria-label="Abrir menu de navegação"');
    expect(html).toContain('aria-label="Fechar menu de navegação"');
    expect(html).toContain('id="menu-navegacao-movel"');
    expect(html).toContain(">Menu<");
    expect(html).toContain('href="/skill"');
    expect(html).toContain('href="/mcps"');
    expect(html).toContain('href="/subagentes"');
    expect(html).toContain('href="/rag"');
    expect(html).toContain('href="/resumo"');
    expect(html).toContain('href="/quiz"');
  });
});
