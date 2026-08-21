// Design: navegação editorial mineral com o símbolo Nexo como marca visual de três rotas que convergem.
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModuloAtivo = "skill" | "mcps" | "subagentes" | "rag" | "pratica" | "resumo" | "panorama" | "quiz";

// Todos os módulos usam a mesma fonte de dados nos menus desktop e móvel.
const itens = [
  { id: "skill" as const, label: "Skill", href: "/skill" },
  { id: "mcps" as const, label: "MCPs", href: "/mcps" },
  { id: "subagentes" as const, label: "SubAgentes", href: "/subagentes" },
  { id: "rag" as const, label: "RAG", href: "/rag" },
  { id: "pratica" as const, label: "IA na Prática", href: "/pratica" },
  { id: "resumo" as const, label: "Resumo", href: "/resumo" },
  { id: "panorama" as const, label: "Panorama", href: "/panorama" },
  { id: "quiz" as const, label: "Quiz", href: "/quiz" },
];

// As quatro leituras apresentam os mesmos indicadores do Panorama em formatos diferentes.
const visoesPanorama = [
  { label: "Painel Circular", href: "/panorama" },
  { label: "Barras Comparativas", href: "/panorama?visao=barras" },
  { label: "Linha de Indicadores", href: "/panorama?visao=linha" },
  { label: "Colunas de Adoção", href: "/panorama?visao=colunas" },
];

// Cabeçalho preparado para crescer com módulos adicionais, mantendo o item atual em destaque.
export function LibraryNav({ ativo }: { ativo: ModuloAtivo }) {
  // O painel existe apenas para a navegação em telas pequenas.
  const [menuMovelAberto, setMenuMovelAberto] = useState(false);
  // Panorama revela quatro visualizações sem retirar o usuário da navegação principal.
  const [panoramaSubmenuAberto, setPanoramaSubmenuAberto] = useState(false);

  // Fecha com Escape e impede a rolagem da página enquanto o painel está aberto.
  useEffect(() => {
    if (!menuMovelAberto) return;

    const overflowAnterior = document.body.style.overflow;
    const fecharComEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setMenuMovelAberto(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", fecharComEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", fecharComEscape);
    };
  }, [menuMovelAberto]);

  const classeAtiva = (id: ModuloAtivo) => (ativo === id ? "active" : "");

  // O portal impede que o backdrop-filter do cabeçalho limite a camada fixa do menu no celular.
  const painelMovel = (
    <>
      {/* A área externa cobre a viewport inteira e fecha o menu antes de qualquer clique atingir o conteúdo. */}
      <div
        className={`mobile-nav-scrim ${menuMovelAberto ? "is-open" : ""}`}
        aria-hidden="true"
        onPointerDown={() => setMenuMovelAberto(false)}
      />
      {/* O painel é irmão da área externa: um toque nele não dispara o fechamento do menu. */}
      <aside id="menu-navegacao-movel" className={`mobile-side-nav ${menuMovelAberto ? "is-open" : ""}`} aria-label="Navegação móvel">
        {/* O cabeçalho simples mantém o contraste pedido: fundo branco e tipografia preta. */}
        <div className="mobile-side-nav-top">
          <span>Menu</span>
          <button type="button" className="mobile-menu-close" aria-label="Fechar menu de navegação" onClick={() => setMenuMovelAberto(false)}>×</button>
        </div>
        {/* Cada módulo permanece visível no painel e fecha a navegação ao ser selecionado. */}
        <nav className="mobile-nav-links" aria-label="Módulos da biblioteca no celular">
          {itens.map((item) => item.id === "panorama" ? (
            <div key={item.id} className={`mobile-panorama-menu ${classeAtiva(item.id)}`}>
              <button
                type="button"
                className="mobile-panorama-trigger"
                aria-expanded={panoramaSubmenuAberto}
                aria-controls="submenu-panorama-movel"
                onClick={() => setPanoramaSubmenuAberto((aberto) => !aberto)}
              >
                <span>Panorama</span>
                <b aria-hidden="true">{panoramaSubmenuAberto ? "−" : "+"}</b>
              </button>
              <div
                id="submenu-panorama-movel"
                className={`mobile-panorama-submenu ${panoramaSubmenuAberto ? "is-open" : ""}`}
                aria-label="Visualizações do Panorama"
                aria-hidden={!panoramaSubmenuAberto}
              >
                {visoesPanorama.map((visao) => (
                  <a key={visao.href} href={visao.href} tabIndex={panoramaSubmenuAberto ? 0 : -1} onClick={() => { setMenuMovelAberto(false); setPanoramaSubmenuAberto(false); }}>
                    {visao.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a key={item.id} className={classeAtiva(item.id)} href={item.href} onClick={() => setMenuMovelAberto(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );

  // Na página real, o painel é anexado ao body; na renderização estática, preserva a marcação para os testes.
  const navegacaoMovel = typeof document === "undefined" ? painelMovel : createPortal(painelMovel, document.body);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-brand">
          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label="Abrir menu de navegação"
            aria-expanded={menuMovelAberto}
            aria-controls="menu-navegacao-movel"
            onClick={() => setMenuMovelAberto(true)}
          >
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
          <a className="marca" href="/resumo" aria-label="Nexo — Resumo de IA">
            <span className="nexo-mark" aria-hidden="true"><i /><i /><i /><b /></span>
          </a>
        </div>
        <nav className="nav-modulos" aria-label="Módulos da biblioteca">
          {itens.slice(0, 5).map((item) => <a key={item.id} className={classeAtiva(item.id)} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className={`header-tag ${classeAtiva("resumo")}`} href="/resumo">Resumo</a>
          <div className={`panorama-menu ${classeAtiva("panorama")}`}>
            <button
              type="button"
              className="header-tag panorama-menu-trigger"
              aria-expanded={panoramaSubmenuAberto}
              aria-controls="submenu-panorama-desktop"
              onClick={() => setPanoramaSubmenuAberto((aberto) => !aberto)}
            >
              Panorama <span aria-hidden="true">⌄</span>
            </button>
            <div
              id="submenu-panorama-desktop"
              className={`panorama-submenu ${panoramaSubmenuAberto ? "is-open" : ""}`}
              aria-label="Visualizações do Panorama"
              aria-hidden={!panoramaSubmenuAberto}
            >
              <p>Visualizações do Panorama</p>
              {visoesPanorama.map((visao) => (
                <a key={visao.href} href={visao.href} tabIndex={panoramaSubmenuAberto ? 0 : -1} onClick={() => setPanoramaSubmenuAberto(false)}>{visao.label}</a>
              ))}
            </div>
          </div>
          <a className={`header-tag ${classeAtiva("quiz")}`} href="/quiz">Quiz</a>
        </div>
      </div>

      {navegacaoMovel}
    </header>
  );
}
