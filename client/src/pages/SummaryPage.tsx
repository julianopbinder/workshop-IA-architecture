// Sala de Controle Editorial: encerramento em três atos, com cada recurso apresentado como uma função operacional clara.
import { ArrowRight, BookOpenCheck, Bot, Cable, Database, ShieldCheck } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";
import "./SummaryPage.css";

// Fecha a apresentação explicando os papéis, os momentos de uso e a colaboração entre os quatro recursos.
export default function SummaryPage() {
  return (
    <main className="skill-reference summary-control">
      <LibraryNav ativo="resumo" />

      <section className="summary-hero">
        <div className="page-width summary-hero-grid">
          <div>
            <p className="summary-kicker"><span>ENCERRAMENTO · CENTRAL DE OPERAÇÃO</span><i />QUEM FAZ O QUÊ</p>
            <h1>Não decore siglas. <em>Entenda os papéis.</em></h1>
            <p className="summary-hero-copy">Skills, MCPs, SubAgentes e RAG não competem. Cada um cobre uma parte do trabalho: orientar, acessar, executar e consultar conhecimento confiável.</p>
          </div>
          <aside className="summary-nexo-board" aria-label="Diagrama Nexo: quatro recursos convergem para uma resposta operacional">
            <p>SISTEMA NEXO · QUATRO FRENTES</p>
            <div className="summary-nexo-node"><span className="summary-nexo-path">PLAYBOOK<i /></span><span className="summary-nexo-path">PONTE<i /></span><span className="summary-nexo-path">CONSULTA<i /></span><span className="summary-nexo-path">EXECUÇÃO<i /></span><strong>IA<br />EM AÇÃO</strong></div>
            <span>Quatro funções diferentes. Uma operação coordenada.</span>
          </aside>
        </div>
        <nav className="page-width summary-progress" aria-label="Rota de encerramento da apresentação"><a href="#padrao"><b>01</b>PADRÃO</a><i /><a href="#acesso"><b>02</b>ACESSO E CONSULTA</a><i /><a href="#execucao"><b>03</b>EXECUÇÃO</a><i /><a href="#fecho"><b>04</b>SÍNTESE</a></nav>
      </section>

      <section id="padrao" className="summary-act">
        <div className="page-width summary-act-layout">
          <header className="summary-act-label"><p><span>ATO 01</span><i />PADRÃO</p><h2>Quem mantém o trabalho <em>consistente?</em></h2><span>Quando o time quer repetir um jeito aprovado de trabalhar, a resposta é uma Skill.</span></header>
          <article className="summary-operational-card"><header><BookOpenCheck size={25} /><div><p>SKILL · PLAYBOOK</p><h3>Uma instrução reutilizável.</h3></div></header><p>Uma Skill registra regras, convenções, passos e materiais que a IA deve seguir em tarefas repetidas. Ela dá padrão ao trabalho antes da execução.</p><div className="summary-facts"><p><b>USE QUANDO</b><span>O fluxo é conhecido e deve sair sempre do mesmo jeito.</span></p><p><b>ENTREGA</b><span>Direção clara para revisão de código, documentação ou processo técnico.</span></p></div></article>
        </div>
      </section>

      <section id="acesso" className="summary-act">
        <div className="page-width summary-act-layout">
          <header className="summary-act-label"><p><span>ATO 02</span><i />ACESSO E CONSULTA</p><h2>Quem abre a ponte e quem acha a <em>resposta?</em></h2><span>Um MCP conecta recursos externos. Um RAG transforma uma base de conhecimento em contexto verificável.</span></header>
          <div><div className="summary-access-grid"><article className="summary-mini-card"><Cable size={24} /><p>MCP · PONTE DE ACESSO</p><h3>Conecta a IA a ferramentas.</h3><span>Permite chamar serviços, sistemas e dados externos com uma interface organizada.</span><div className="summary-facts"><p><b>EXEMPLO</b><span>Consultar uma ferramenta de RH ou criar um registro em um sistema.</span></p></div></article><article className="summary-mini-card"><Database size={24} /><p>RAG · ESTAÇÃO DE CONSULTA</p><h3>Busca antes de responder.</h3><span>Recupera trechos de fontes confiáveis e os envia como contexto para o modelo.</span><div className="summary-facts"><p><b>EXEMPLO</b><span>Localizar a regra de reembolso em um manual interno atualizado.</span></p></div></article></div><p className="summary-rag-note"><ShieldCheck size={18} /><span><b>RAG não é um agente.</b> A ingestão organiza documentos antes; a consulta encontra o trecho relevante durante a pergunta. Um agente pode usar RAG para se informar.</span></p></div>
        </div>
      </section>

      <section id="execucao" className="summary-act summary-execution">
        <div className="page-width summary-act-layout">
          <header className="summary-act-label"><p><span>ATO 03</span><i />EXECUÇÃO</p><h2>Quem assume uma frente de <em>trabalho?</em></h2><span>Quando a missão exige especialistas ou tarefas paralelas, entram os SubAgentes.</span></header>
          <article className="summary-execution-card"><header><Bot size={25} /><p>SUBAGENTE · FRENTE ESPECIALIZADA</p></header><h3>Trabalha em contexto próprio e devolve um resultado.</h3><p>O agente principal pode delegar uma frente de pesquisa, qualidade ou DevOps. Cada SubAgente recebe a missão e as permissões necessárias, sem carregar toda a conversa principal.</p><div className="summary-execution-route"><span>AGENTE PRINCIPAL</span><i>→</i><b>SUBAGENTE ESPECIALISTA</b><i>→</i><span>RESULTADO CONSOLIDADO</span></div></article>
        </div>
      </section>

      <section id="fecho" className="summary-final">
        <div className="page-width summary-final-inner"><div><p>FECHAMENTO · USE A FUNÇÃO CERTA</p><h2>Playbook para orientar. Ponte para acessar. Especialista para executar. <em>Consulta para responder.</em></h2></div><a href="/skill">Recomeçar pela Skill <ArrowRight size={16} /></a></div>
      </section>
    </main>
  );
}
