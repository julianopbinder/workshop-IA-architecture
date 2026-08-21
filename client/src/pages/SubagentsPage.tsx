// Central de Operação: narrativa editorial em azul-noite, rota coral e Nexo para explicar delegação de Subagentes sem linguagem infantil.

import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCode2,
  GitBranch,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";
import { ExpandableDiagram } from "@/components/ExpandableDiagram";

// Apresenta o módulo completo de Subagentes, com conceitos, fluxo visual e combinação prática com Skills.
export default function SubagentsPage() {
  return (
    <main className="skill-reference subagent-page">
      <LibraryNav ativo="subagentes" />

      <section className="subagent-hero hero">
        <div className="page-width hero-grid">
          <div>
            <div className="subagent-mission-kicker"><i /><p>MÓDULO 03 · SUBAGENTES</p></div>
            <h1>Uma missão complexa.<br />Especialistas <em>em paralelo.</em></h1>
            <p className="hero-text">SubAgentes são assistentes de IA especializados. O agente principal coordena a missão, distribui partes do trabalho e recebe apenas os resultados necessários para compor a entrega final.</p>
            <a className="button-link" href="#o-que-sao">Entender o fluxo <ArrowRight size={16} /></a>
          </div>

          <div className="subagent-hero-card">
            <div className="subagent-card-icon"><BriefcaseBusiness size={23} /></div>
            <p className="subagent-card-label">OPERAÇÃO COORDENADA</p>
            <h2>O principal não executa tudo.</h2>
            <p>Ele decide o objetivo, chama especialistas e consolida a resposta. Cada especialista recebe uma frente de trabalho delimitada.</p>
            <div className="subagent-hero-route"><span>DELEGAR</span><i>›</i><span>EXECUTAR</span><i>›</i><span>CONSOLIDAR</span></div>
            <div className="subagent-nexo" aria-hidden="true"><span /><span /><span /><b /></div>
          </div>
        </div>
      </section>

      <nav className="subagent-mission-rail page-width" aria-label="Etapas do módulo SubAgentes">
        <p>MISSÃO GUIADA</p>
        <ol>
          <li><span>01</span><b>Delegar</b></li>
          <li><span>02</span><b>Orquestrar</b></li>
          <li><span>03</span><b>Delimitar</b></li>
          <li><span>04</span><b>Padronizar</b></li>
          <li><span>05</span><b>Decidir</b></li>
        </ol>
      </nav>

      <section id="o-que-sao" className="chapter chapter-soft subagent-act">
        <div className="page-width">
          <div className="identificador"><span>01</span><i /><p>CAPACIDADE DESBLOQUEADA · DELEGAR</p></div>
          <div className="chapter-heading">
            <h2>Não é uma conversa maior.<br />É uma <em>operação bem dividida.</em></h2>
            <p>Quando uma demanda tem partes claras e exige bastante investigação, o agente principal pode delegar cada frente a um especialista com foco próprio.</p>
          </div>

          <div className="subagent-role-grid">
            <article className="subagent-principal-card">
              <div className="subagent-role-top"><span>TORRE DE CONTROLE</span><Bot size={21} /></div>
              <h3>Agente principal</h3>
              <p>Define a missão, separa as frentes, acompanha somente o que importa e transforma os retornos em uma resposta integrada.</p>
              <div className="subagent-role-tags"><b>prioridade</b><b>decisão</b><b>entrega final</b></div>
            </article>
            <article>
              <div className="subagent-role-top"><span>ESPECIALISTA</span><Workflow size={21} /></div>
              <h3>SubAgente</h3>
              <p>Recebe um objetivo específico, as ferramentas permitidas e um contexto próprio para executar seu recorte da tarefa.</p>
              <div className="subagent-role-tags"><b>foco</b><b>ferramentas</b><b>resultado</b></div>
            </article>
          </div>

          <div className="subagent-route-signal" aria-label="Três rotas do fluxo: missão, contexto isolado e retorno consolidado">
            <div><span>ROTA 01</span><strong>Missão enviada</strong><p>O principal distribui uma frente objetiva.</p></div>
            <i aria-hidden="true"><b /><b /><b /><em /></i>
            <div><span>ROTA 02</span><strong>Contextos separados</strong><p>Cada especialista trabalha no seu recorte.</p></div>
            <i aria-hidden="true"><b /><b /><b /><em /></i>
            <div><span>ROTA 03</span><strong>Retorno consolidado</strong><p>O principal recebe só o que precisa decidir.</p></div>
          </div>

          <div className="concept-cards subagent-concepts">
            <article><LockKeyhole size={22} /><h3>Contexto isolado</h3><p>O SubAgente começa com a informação necessária para sua missão. Ele não precisa carregar todo o histórico da conversa principal.</p></article>
            <article><ShieldCheck size={22} /><h3>Permissões definidas</h3><p>Você escolhe o que cada especialista pode fazer: só ler arquivos, pesquisar, executar testes ou atuar em uma infraestrutura.</p></article>
            <article><ClipboardCheck size={22} /><h3>Retorno resumido</h3><p>Ao terminar, ele devolve conclusões, riscos e evidências. O principal usa esse resultado para decidir o próximo passo.</p></article>
          </div>
        </div>
      </section>

      <section className="subagent-operation chapter subagent-act">
        <div className="page-width">
          <div className="identificador"><span>02</span><i /><p>CAPACIDADE DESBLOQUEADA · ORQUESTRAR</p></div>
          <div className="chapter-heading">
            <h2>Uma demanda. Três frentes.<br /><em>Uma resposta consolidada.</em></h2>
            <p>Este é o caminho visual de uma operação: a missão sai da coordenação, especialistas trabalham em paralelo e os resultados voltam de forma objetiva.</p>
          </div>

          <ExpandableDiagram label="Ampliar o diagrama de delegação e retorno dos SubAgentes">
          <div className="subagent-operation-map" aria-label="Fluxo de delegação entre agente principal e SubAgentes especializados">
            <div className="subagent-operation-head">
              <p>ROTA ATIVA · DELEGAÇÃO E RETORNO</p>
              <span><b>coral</b> missão enviada <i>·</i> <b>verde</b> resultado resumido</span>
            </div>
            <div className="subagent-main-node">
              <span>AGENTE PRINCIPAL</span>
              <strong>Coordena a missão</strong>
              <p>“Prepare o plano de publicação do serviço de pagamentos.”</p>
            </div>
            <div className="subagent-fanout" aria-hidden="true"><i /><i /><i /><b /></div>
            <div className="subagent-specialists">
              <article>
                <Search size={22} /><span>01 · PESQUISA</span><strong>Mapeia o cenário</strong><p>Consulta arquivos, dependências e informações relevantes.</p><b>somente leitura</b>
              </article>
              <article className="subagent-devops-node">
                <GitBranch size={22} /><span>02 · DEVOPS</span><strong>Prepara a operação</strong><p>Organiza deploy, configuração, escala e riscos técnicos.</p><b>execução permitida</b>
              </article>
              <article>
                <CheckCircle2 size={22} /><span>03 · QUALIDADE</span><strong>Valida o resultado</strong><p>Roda testes e aponta falhas antes da entrega final.</p><b>execução de testes</b>
              </article>
            </div>
            <div className="subagent-return-lane"><span>RETORNO AO PRINCIPAL</span><p>“Plano pronto: riscos mapeados, configuração revisada e testes aprovados.”</p><CheckCircle2 size={19} /></div>
          </div>
          </ExpandableDiagram>

          <div className="subagent-plain-reading">
            <b>LEITURA PARA QUEM ESTÁ COMEÇANDO</b>
            <p>O agente principal não precisa saber cada comando usado pelo especialista. Ele recebe o que foi concluído, o que precisa de decisão e quais riscos foram encontrados.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter-soft subagent-act">
        <div className="page-width">
          <div className="identificador"><span>03</span><i /><p>CAPACIDADE DESBLOQUEADA · DELIMITAR</p></div>
          <div className="chapter-heading">
            <h2>Um papel claro,<br /><em>limites claros.</em></h2>
            <p>Em ferramentas que oferecem SubAgentes configuráveis, a definição costuma declarar nome, missão, ferramentas e permissões. O formato exato muda conforme a ferramenta.</p>
          </div>
          <div className="subagent-definition-grid">
            <div className="skill-code subagent-definition-code">
              <div className="code-caption"><span /><p>agents/devops-platform.md</p></div>
              <pre>{`---
name: devops-platform
description: Planeja publicação segura do serviço
tools: [leitura, terminal, kubernetes]
permissions: [consultar, executar-configuracao]
---

# Missão
Prepare o plano de deploy, identifique riscos e
retorne um resumo objetivo para o agente principal.`}</pre>
            </div>
            <div className="subagent-definition-copy">
              <p><b>Nome e descrição</b> dizem qual problema aquele especialista resolve.</p>
              <p><b>Ferramentas</b> indicam os recursos disponíveis para trabalhar.</p>
              <p><b>Permissões</b> definem até onde ele pode ir com segurança.</p>
              <div className="subagent-format-note"><FileCode2 size={18} /><span>Este arquivo é um <strong>modelo conceitual</strong>. Cada plataforma pode usar uma pasta ou sintaxe diferente.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="subagent-skill-chapter chapter subagent-act">
        <div className="page-width">
          <div className="identificador"><span>04</span><i /><p>CAPACIDADE DESBLOQUEADA · PADRONIZAR</p></div>
          <div className="chapter-heading">
            <h2><em>SubAgentes + Skills</em><br />especialistas com um padrão de trabalho.</h2>
            <p>O SubAgente define <strong>quem executa a frente</strong>. A Skill define <strong>como esse trabalho deve seguir o padrão do time</strong>.</p>
          </div>

          <div className="subagent-skill-map">
            <div className="subagent-request-card"><span>PEDIDO PRINCIPAL</span><strong>“Prepare a publicação do serviço de pagamentos.”</strong></div>
            <ChevronRight className="subagent-map-arrow" size={25} />
            <div className="subagent-specialist-card"><GitBranch size={25} /><span>SUBAGENTE</span><strong>Especialista DevOps</strong><p>Planeja e executa o recorte de infraestrutura.</p></div>
            <span className="subagent-skill-connector">APLICA</span>
            <div className="subagent-skill-card"><Sparkles size={25} /><span>SKILL</span><strong>kubernetes-pipeline</strong><p>Impõe o roteiro: validações, pipeline e padrão de deploy.</p></div>
            <ChevronRight className="subagent-map-arrow" size={25} />
            <div className="subagent-output-card"><CheckCircle2 size={25} /><span>RETORNO</span><strong>Plano resumido</strong><p>Riscos, alterações e próximos passos para o agente principal.</p></div>
          </div>

          <div className="subagent-combo-summary">
            <Workflow size={22} />
            <p><strong>O ganho:</strong> você não pede apenas “faça o deploy”. Você chama um especialista DevOps que executa seguindo uma Skill com as regras de deploy que sua empresa já definiu.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter-soft subagent-when subagent-act">
        <div className="page-width">
          <div className="identificador"><span>05</span><i /><p>CAPACIDADE DESBLOQUEADA · DECIDIR</p></div>
          <div className="chapter-heading compact"><h2>Chame especialistas quando<br />a missão pede <em>divisão de trabalho.</em></h2></div>
          <div className="subagent-when-grid">
            <article><span>USE</span><strong>Tarefa extensa com frentes independentes</strong><p>Pesquisa, implementação e testes podem avançar em paralelo.</p></article>
            <article><span>USE</span><strong>Assunto que exige permissão específica</strong><p>Por exemplo: um especialista autorizado a agir na infraestrutura.</p></article>
            <article><span>EVITE</span><strong>Pergunta curta ou uma única decisão simples</strong><p>Delegar adiciona coordenação; para algo pequeno, o agente principal resolve diretamente.</p></article>
          </div>
          <div className="subagent-next-module"><Layers3Icon /><p><strong>Próximo conceito:</strong> RAG mostra como a IA busca informações externas antes de responder ou executar uma tarefa.</p><a href="/rag">Ver módulo RAG <ArrowRight size={15} /></a></div>
        </div>
      </section>
    </main>
  );
}

// Mantém o ícone da chamada final coerente com o traço visual Nexo.
function Layers3Icon() {
  return <Workflow size={22} />;
}
