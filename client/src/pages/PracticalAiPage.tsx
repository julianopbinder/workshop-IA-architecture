// Página de aplicação prática: conecta os quatro conceitos a decisões reais de trabalho.
import { ArrowRight, BookOpenCheck, Boxes, Cable, UsersRound } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

// Este conjunto mantém uma linguagem única entre a pergunta inicial e o mapa de decisão.
const escolhas = [
  { icone: BookOpenCheck, titulo: "Garantir um padrão", pergunta: "A equipe precisa repetir o mesmo processo ou seguir regras?", resposta: "Use uma Skill.", apoio: "Ex.: revisão Java, criação de API ou padrão de documentação." },
  { icone: Cable, titulo: "Usar uma ferramenta", pergunta: "A IA precisa consultar ou executar algo fora da conversa?", resposta: "Use um MCP.", apoio: "Ex.: abrir uma tarefa, buscar um dado ou chamar um serviço." },
  { icone: UsersRound, titulo: "Dividir trabalho complexo", pergunta: "Há partes independentes que especialistas podem executar em paralelo?", resposta: "Use SubAgentes.", apoio: "Ex.: pesquisar, programar, testar e revisar em frentes separadas." },
  { icone: Boxes, titulo: "Encontrar conhecimento interno", pergunta: "A resposta depende de políticas, manuais ou documentos da empresa?", resposta: "Use RAG.", apoio: "Ex.: buscar a regra certa antes de responder ou tomar uma ação." },
];

// Explica o avanço de uma equipe sem sugerir que todos os níveis precisam ser adotados de uma vez.
const maturidade = [
  ["01", "Experimentar", "Usar o assistente para aprender, rascunhar e revisar pequenas tarefas."],
  ["02", "Padronizar", "Transformar regras e fluxos repetidos em Skills compartilhadas."],
  ["03", "Conectar", "Levar ferramentas e dados confiáveis para a IA por meio de MCPs e RAG."],
  ["04", "Orquestrar", "Delegar frentes maiores a SubAgentes, mantendo revisão humana na entrega."],
];

export default function PracticalAiPage() {
  return (
    <main className="skill-reference practical-ai-page">
      <LibraryNav ativo="pratica" />

      <section className="practical-hero">
        <div className="page-width">
          <p className="eyebrow">IA NA PRÁTICA HOJE</p>
          <div className="practical-hero-grid">
            <div>
              <h1>Antes do prompt, escolha a <em>peça certa</em>.</h1>
              <p>Skills, MCPs, SubAgentes e RAG não disputam espaço. Cada um resolve uma parte diferente do trabalho com IA.</p>
            </div>
            <aside className="practical-rule" aria-label="Regra simples para decidir">
              <span>REGRA SIMPLES</span>
              <strong>Primeiro identifique o problema. Depois escolha a tecnologia.</strong>
            </aside>
          </div>
        </div>
      </section>

      <section className="practical-section practical-choice-section">
        <div className="page-width">
          <div className="section-lead">
            <p className="eyebrow">MAPA DE DECISÃO</p>
            <h2>Qual situação você quer resolver?</h2>
            <p>Use esta tela como uma cola durante a apresentação ou no começo de um novo projeto.</p>
          </div>
          <div className="choice-grid">
            {escolhas.map(({ icone: Icone, titulo, pergunta, resposta, apoio }) => (
              <article key={titulo} className="choice-card">
                <Icone aria-hidden="true" />
                <p>{titulo}</p>
                <h3>{pergunta}</h3>
                <strong>{resposta}</strong>
                <span>{apoio}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="practical-section practical-before-after">
        <div className="page-width">
          <div className="section-lead compact">
            <p className="eyebrow">ANTES × DEPOIS</p>
            <h2>O mesmo pedido, com mais clareza.</h2>
          </div>
          <div className="before-after-grid">
            <article className="before-card">
              <span>SEM ESTRUTURA</span>
              <h3>“Faça uma API de pedidos.”</h3>
              <p>A IA precisa adivinhar padrões, dados disponíveis, responsáveis e como validar o resultado.</p>
              <ul>
                <li>Resposta pode variar a cada conversa.</li>
                <li>Contexto importante fica fora do pedido.</li>
                <li>Revisão acontece somente no fim.</li>
              </ul>
            </article>
            <div className="comparison-arrow" aria-hidden="true"><ArrowRight /></div>
            <article className="after-card">
              <span>COM A ARQUITETURA CERTA</span>
              <h3>“Crie a API seguindo nossa Skill; consulte as regras no RAG; use o MCP de tarefas; peça revisão ao SubAgente de testes.”</h3>
              <p>O pedido deixa explícitos os padrões, as fontes, as integrações e a forma de validação.</p>
              <ul>
                <li>O processo fica repetível para todo o time.</li>
                <li>A IA consulta o conhecimento certo.</li>
                <li>O humano continua aprovando a entrega.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="practical-section practical-flow-section">
        <div className="page-width">
          <div className="section-lead">
            <p className="eyebrow">FLUXO DE UM PROJETO</p>
            <h2>Uma visão de ponta a ponta.</h2>
            <p>Nem todos os pedidos exigem todas as peças. O fluxo abaixo mostra como elas se complementam quando o trabalho pede mais contexto e coordenação.</p>
          </div>
          <div className="project-flow" aria-label="Fluxo: pedido do time, Skill, RAG, MCPs, SubAgentes e entrega revisada">
            <article><span>01</span><b>Pedido do time</b><small>Objetivo claro</small></article><i>→</i>
            <article><span>02</span><b>Skill</b><small>Padrões e etapas</small></article><i>→</i>
            <article><span>03</span><b>RAG + MCPs</b><small>Dados e ferramentas</small></article><i>→</i>
            <article><span>04</span><b>SubAgentes</b><small>Frentes especializadas</small></article><i>→</i>
            <article className="flow-finish"><span>05</span><b>Entrega revisada</b><small>Aprovação humana</small></article>
          </div>
        </div>
      </section>

      <section className="practical-section practical-maturity-section">
        <div className="page-width">
          <div className="section-lead">
            <p className="eyebrow">RÉGUA DE MATURIDADE</p>
            <h2>Comece pequeno. Evolua quando fizer sentido.</h2>
          </div>
          <div className="maturity-grid">
            {maturidade.map(([numero, titulo, descricao], indice) => (
              <article key={numero} className={indice === 0 ? "is-start" : ""}>
                <span>{numero}</span><h3>{titulo}</h3><p>{descricao}</p>
              </article>
            ))}
          </div>
          <p className="practical-footer-note"><strong>Melhor primeiro passo para a maioria dos times:</strong> criar uma Skill simples para uma atividade que já é repetida toda semana.</p>
        </div>
      </section>
    </main>
  );
}
