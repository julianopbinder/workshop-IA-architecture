// Página Resumo: composição mínima, neutra e focada somente na imagem e nas três definições essenciais.

import { useState } from "react";
import { LibraryNav } from "@/components/LibraryNav";

// Mantém a imagem enviada pelo usuário disponível para visualização ampliada.
const imagemResumo = "/manus-storage/resumo-stack-simples_718874af.png";

// Resume, sem elementos decorativos extras, a relação entre Skills, MCPs e SubAgentes.
export default function SummaryPage() {
  // Controla a abertura da imagem em tamanho ampliado.
  const [imagemAberta, setImagemAberta] = useState(false);

  return (
    <main className="skill-reference summary-simple-page">
      <LibraryNav ativo="resumo" />

      <section className="summary-simple">
        <div className="summary-simple-inner">
          <header className="summary-simple-header">
            <p>RESUMINDO</p>
            <h1>Skills, MCPs e SubAgentes</h1>
            <span>Três recursos diferentes que se complementam no trabalho com IA.</span>
          </header>

          <figure className="summary-simple-figure">
            <button
              type="button"
              className="summary-simple-image-button"
              onClick={() => setImagemAberta(true)}
              aria-label="Ampliar imagem de resumo"
            >
              <img src={imagemResumo} alt="Diagrama que mostra Skills, MCPs e SubAgentes como partes complementares" />
              <span>CLIQUE PARA AMPLIAR</span>
            </button>
          </figure>

          <div className="summary-simple-definitions" aria-label="Definições resumidas">
            <p><strong>Skills</strong><span>Instruções e fluxos reutilizáveis.</span></p>
            <p><strong>MCP</strong><span>Conecta o agente a ferramentas e serviços externos.</span></p>
            <p><strong>SubAgentes</strong><span>Agentes com contextos isolados que podem ser executados em paralelo.</span></p>
          </div>

          <p className="summary-simple-conclusion">Cada um resolve uma parte do trabalho: a Skill orienta, o MCP dá acesso e o Subagente executa uma frente com foco próprio.</p>
        </div>
      </section>

      {imagemAberta && (
        <div className="image-lightbox" onClick={() => setImagemAberta(false)} role="dialog" aria-modal="true" aria-label="Imagem de resumo ampliada">
          <button type="button" className="lightbox-close" onClick={() => setImagemAberta(false)} aria-label="Fechar imagem ampliada">×</button>
          <img src={imagemResumo} alt="Diagrama ampliado de Skills, MCPs e SubAgentes" onClick={(evento) => evento.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
