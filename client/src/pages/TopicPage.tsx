// Página de preparação para módulos futuros da biblioteca de IA.

import { ArrowRight, BookOpen } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

// Exibe uma página própria para o tema selecionado, sem misturá-lo ao conteúdo de Skills.
export default function TopicPage({ tema, descricao, ativo }: { tema: string; descricao: string; ativo: "mcps" | "subagentes" | "rag" }) {
  return (
    <main className="skill-reference topic-page">
      <LibraryNav ativo={ativo} />
      <section className="topic-hero page-width">
        <p className="eyebrow">BIBLIOTECA DE CONHECIMENTO</p>
        <h1>{tema}</h1>
        <p>{descricao}</p>
        <div className="topic-panel"><BookOpen size={22} /><div><strong>Em construção com intenção.</strong><span>Este módulo terá sua própria explicação, exemplos e referências — sem misturar os assuntos na página de Skill.</span></div></div>
        <a className="button-link" href="/skill">Voltar para Skill <ArrowRight size={16} /></a>
      </section>
    </main>
  );
}
