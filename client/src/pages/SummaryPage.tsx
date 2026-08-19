// Mapa de Operação: síntese editorial em azul-noite, rota coral e três capacidades complementares para iniciantes.

import { ArrowRight, Bot, Boxes, Cable, CheckCircle2, ClipboardList, Network, UsersRound, Wrench } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

// Apresenta uma visão curta e profissional de como Skills, MCPs e Subagentes trabalham juntos.
export default function SummaryPage() {
  return (
    <main className="skill-reference summary-page">
      <LibraryNav ativo="resumo" />

      <section className="summary-hero">
        <div className="page-width summary-hero-grid">
          <div>
            <div className="summary-kicker"><i /><p>VISÃO GERAL · O MAPA DA OPERAÇÃO</p></div>
            <h1>Três capacidades.<br /><em>Uma operação de IA.</em></h1>
            <p>Skills, MCPs e Subagentes resolvem problemas diferentes. Quando usados juntos, ajudam a IA a seguir o padrão do time, acessar o que precisa e dividir uma missão complexa com segurança.</p>
            <a className="summary-hero-link" href="#mapa-operacao">Ver como se conectam <ArrowRight size={17} /></a>
          </div>

          <aside className="summary-brief-card">
            <span>LEIA EM UMA FRASE</span>
            <strong>Skill orienta.<br />MCP conecta.<br />Subagente executa uma frente.</strong>
            <div className="summary-brief-route"><b>PADRÃO</b><i>›</i><b>ACESSO</b><i>›</i><b>ESPECIALIZAÇÃO</b></div>
            <div className="summary-nexo" aria-hidden="true"><i /><i /><i /><b /></div>
          </aside>
        </div>
        <nav className="summary-deck-progress page-width" aria-label="Etapas do resumo">
          <a href="#papel"><b>01</b><span>Padrão</span></a>
          <a href="#mapa-operacao"><b>02</b><span>Acesso</span></a>
          <a href="#referencia"><b>03</b><span>Execução</span></a>
          <i aria-hidden="true" />
        </nav>
      </section>

      <section id="papel" className="summary-quick-read">
        <div className="page-width">
          <div className="identificador"><span>01</span><i /><p>O PAPEL DE CADA PEÇA</p></div>
          <div className="chapter-heading">
            <h2>Não são alternativas.<br />São <em>papéis complementares.</em></h2>
            <p>Pense em uma operação de produto e tecnologia: há um padrão a seguir, recursos para consultar e executar, e especialistas para tocar frentes diferentes.</p>
          </div>

          <div className="summary-role-grid">
            <article className="summary-role-skill">
              <div className="summary-role-top"><ClipboardList size={23} /><span>SKILL</span></div>
              <h3>Instruções e fluxos reutilizáveis</h3>
              <p>Guarda a maneira como o time quer que um trabalho seja feito: regras, sequência, convenções e modelos.</p>
              <div className="summary-analogy"><b>ANALOGIA PROFISSIONAL</b><strong>Playbook operacional</strong><span>Define o padrão de execução.</span></div>
            </article>
            <article className="summary-role-mcp">
              <div className="summary-role-top"><Cable size={23} /><span>MCP</span></div>
              <h3>Conexão com ferramentas e serviços</h3>
              <p>Cria uma ponte controlada para a IA consultar dados ou agir em ferramentas externas, como APIs, bancos e sistemas.</p>
              <div className="summary-analogy"><b>ANALOGIA PROFISSIONAL</b><strong>Instrumentos conectados</strong><span>Permite acessar o ecossistema.</span></div>
            </article>
            <article className="summary-role-agent">
              <div className="summary-role-top"><UsersRound size={23} /><span>SUBAGENTE</span></div>
              <h3>Especialista com foco próprio</h3>
              <p>Recebe uma parte delimitada da missão, trabalha em contexto isolado e devolve uma conclusão objetiva ao agente principal.</p>
              <div className="summary-analogy"><b>ANALOGIA PROFISSIONAL</b><strong>Frente especializada</strong><span>Executa um recorte do trabalho.</span></div>
            </article>
          </div>
        </div>
      </section>

      <section id="mapa-operacao" className="summary-operation-section">
        <div className="page-width">
          <div className="identificador"><span>02</span><i /><p>O FLUXO INTEGRADO</p></div>
          <div className="chapter-heading">
            <h2>Uma demanda entra.<br /><em>Uma entrega confiável sai.</em></h2>
            <p>O agente principal coordena. Cada capacidade entra no momento certo: a Skill dá direção, o MCP oferece acesso e o Subagente assume uma frente especializada.</p>
          </div>

          <div className="summary-operation-map" aria-label="Fluxo integrado entre agente principal, Skill, MCP e Subagente">
            <div className="summary-operation-head"><span>MAPA DA OPERAÇÃO</span><p><b>coral</b> orientação e delegação <i>·</i> <b>verde</b> resultado confirmado</p></div>
            <div className="summary-request-node"><Bot size={23} /><span>AGENTE PRINCIPAL</span><strong>“Prepare uma publicação segura da nova API.”</strong><p>Entende o objetivo e coordena a missão.</p></div>
            <div className="summary-fanout" aria-hidden="true"><i /><i /><i /><b /></div>
            <div className="summary-capability-nodes">
              <article><ClipboardList size={22} /><span>SKILL</span><strong>Aplica o playbook</strong><p>Usa o padrão de deploy, validações e documentação do time.</p><b>como fazer</b></article>
              <article><Network size={22} /><span>MCP</span><strong>Conecta instrumentos</strong><p>Consulta repositório, monitoramento e ambiente de testes.</p><b>o que acessar</b></article>
              <article><Wrench size={22} /><span>SUBAGENTE DEVOPS</span><strong>Executa a frente</strong><p>Organiza o plano técnico em contexto isolado e com permissões definidas.</p><b>quem executa</b></article>
            </div>
            <div className="summary-result-lane"><CheckCircle2 size={20} /><div><span>RESULTADO CONSOLIDADO</span><strong>Plano pronto: padrão aplicado, informações verificadas e riscos mapeados.</strong></div></div>
          </div>

          <div className="summary-plain-note"><Boxes size={22} /><p><strong>Em termos simples:</strong> a Skill diz as regras do jogo; o MCP libera os recursos necessários; o Subagente trabalha em uma posição específica. O agente principal recebe tudo resumido e decide a próxima ação.</p></div>
        </div>
      </section>

      <section id="referencia" className="summary-reference-section">
        <div className="page-width">
          <div className="summary-reference-heading">
            <div className="identificador"><span>03</span><i /><p>O FECHAMENTO DA OPERAÇÃO</p></div>
            <h2>Uma empresa de IA.<br /><em>Três frentes coordenadas.</em></h2>
            <p>Esta é a leitura final para guardar: um playbook direciona o trabalho, uma ponte controlada libera os recursos e uma frente especializada executa seu recorte. O agente principal recebe o resultado consolidado.</p>
          </div>

          <div className="summary-native-stack" aria-label="Diagrama de operações que integra Skill, MCP e Subagente">
            <div className="summary-native-head"><span>CENTRAL DE OPERAÇÃO · VISÃO DE UMA TELA</span><p><b>coral</b> rota ativa <i>·</i> <b>verde</b> entrega consolidada</p></div>
            <div className="summary-native-request"><Bot size={21} /><div><span>AGENTE PRINCIPAL</span><strong>Recebe a demanda, divide a missão e decide a próxima ação.</strong></div></div>
            <div className="summary-native-routes" aria-hidden="true"><i /><i /><i /><b /></div>
            <div className="summary-native-cards">
              <article className="summary-native-skill"><ClipboardList size={21} /><span>SKILL · PLAYBOOK</span><strong>Define o padrão</strong><p>Regras, fluxo e qualidade esperada.</p><b>orienta</b></article>
              <article className="summary-native-mcp"><Cable size={21} /><span>MCP · PONTE DE ACESSO</span><strong>Conecta recursos</strong><p>Ferramentas, dados e serviços autorizados.</p><b>conecta</b></article>
              <article className="summary-native-agent"><UsersRound size={21} /><span>SUBAGENTE · FRENTE</span><strong>Executa um recorte</strong><p>Contexto isolado, foco e retorno resumido.</p><b>especializa</b></article>
            </div>
            <div className="summary-native-result"><CheckCircle2 size={20} /><div><span>ENTREGA CONSOLIDADA</span><strong>O padrão foi seguido, os recursos necessários foram usados e a frente especializada devolveu seu resultado.</strong></div></div>
          </div>

          <div className="summary-checklist summary-closing-checklist">
            <p><b>Skill</b><span>Você usa quando precisa repetir um padrão de trabalho.</span></p>
            <p><b>MCP</b><span>Você usa quando a IA precisa consultar ou agir em algo externo.</span></p>
            <p><b>Subagente</b><span>Você usa quando uma frente merece foco, contexto e execução próprios.</span></p>
          </div>
        </div>
      </section>
    </main>
  );
}
