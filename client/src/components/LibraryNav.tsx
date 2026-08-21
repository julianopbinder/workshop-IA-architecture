// Design: navegação editorial mineral com o símbolo Nexo como marca visual de três rotas que convergem.
import React, { useEffect, useState } from "react";

type ModuloAtivo = "skill" | "mcps" | "subagentes" | "rag" | "resumo" | "quiz";

// Todos os módulos usam a mesma fonte de dados nos menus desktop e móvel.
const itens = [
  { id: "skill" as const, label: "Skill", href: "/skill" },
  { id: "mcps" as const, label: "MCPs", href: "/mcps" },
  { id: "subagentes" as const, label: "SubAgentes", href: "/subagentes" },
  { id: "rag" as const, label: "RAG", href: "/rag" },
  { id: "resumo" as const, label: "Resumo", href: "/resumo" },
  { id: "quiz" as const, label: "Quiz", href: "/quiz" },
];

// Cabeçalho preparado para crescer com módulos adicionais, mantendo o item atual em destaque.
export function LibraryNav({ ativo }: { ativo: ModuloAtivo }) {
  // O painel existe apenas para a navegação em telas pequenas.
  const [menuMovelAberto, setMenuMovelAberto] = useState(false);

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
          {itens.slice(0, 4).map((item) => <a key={item.id} className={classeAtiva(item.id)} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          {itens.slice(4).map((item) => <a key={item.id} className={`header-tag ${classeAtiva(item.id)}`} href={item.href}>{item.label}</a>)}
        </div>
      </div>

      <div className={`mobile-nav-scrim ${menuMovelAberto ? "is-open" : ""}`} aria-hidden="true" onClick={() => setMenuMovelAberto(false)} />
      <aside id="menu-navegacao-movel" className={`mobile-side-nav ${menuMovelAberto ? "is-open" : ""}`} aria-label="Navegação móvel">
        <div className="mobile-side-nav-top">
          <span>Biblioteca</span>
          <button type="button" className="mobile-menu-close" onClick={() => setMenuMovelAberto(false)}>Fechar</button>
        </div>
        <nav className="mobile-nav-links" aria-label="Módulos da biblioteca no celular">
          {itens.map((item) => (
            <a key={item.id} className={classeAtiva(item.id)} href={item.href} onClick={() => setMenuMovelAberto(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </header>
  );
}
