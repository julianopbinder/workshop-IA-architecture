// Design: navegação editorial mineral com o símbolo Nexo como marca visual de três rotas que convergem.

type ModuloAtivo = "skill" | "mcps" | "subagentes" | "rag";

// Cabeçalho preparado para crescer com módulos adicionais, mantendo o item atual em destaque.
export function LibraryNav({ ativo }: { ativo: ModuloAtivo }) {
  const itens = [
    { id: "skill" as const, label: "Skill", href: "/skill" },
    { id: "mcps" as const, label: "MCPs", href: "/mcps" },
    { id: "subagentes" as const, label: "Subagentes", href: "/subagentes" },
    { id: "rag" as const, label: "RAG", href: "/rag" },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="marca" href="/skill" aria-label="Nexo — Biblioteca de IA">
          <span className="nexo-mark" aria-hidden="true"><i /><i /><i /><b /></span>
        </a>
        <nav className="nav-modulos" aria-label="Módulos da biblioteca">
          {itens.map((item) => <a key={item.id} className={ativo === item.id ? "active" : ""} href={item.href}>{item.label}</a>)}
        </nav>
        <span className="header-tag">Biblioteca</span>
      </div>
    </header>
  );
}
