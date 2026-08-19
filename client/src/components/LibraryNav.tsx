// Design: navegação editorial mineral com o símbolo Nexo como marca visual de três rotas que convergem.

type ModuloAtivo = "skill" | "mcps" | "subagentes" | "rag" | "resumo";

// Cabeçalho preparado para crescer com módulos adicionais, mantendo o item atual em destaque.
export function LibraryNav({ ativo }: { ativo: ModuloAtivo }) {
  const itens = [
    { id: "skill" as const, label: "Skill", href: "/skill" },
    { id: "mcps" as const, label: "MCPs", href: "/mcps" },
    { id: "subagentes" as const, label: "SubAgentes", href: "/subagentes" },
    { id: "rag" as const, label: "RAG", href: "/rag" },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="marca" href="/resumo" aria-label="Nexo — Resumo de IA">
          <span className="nexo-mark" aria-hidden="true"><i /><i /><i /><b /></span>
        </a>
        <nav className="nav-modulos" aria-label="Módulos da biblioteca">
          {itens.map((item) => <a key={item.id} className={ativo === item.id ? "active" : ""} href={item.href}>{item.label}</a>)}
        </nav>
        <a className={`header-tag ${ativo === "resumo" ? "active" : ""}`} href="/resumo">Resumo</a>
      </div>
    </header>
  );
}
