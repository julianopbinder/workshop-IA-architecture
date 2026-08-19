// Sala de Controle Editorial: estações que separam RAG, agente, ingestão e consulta com linguagem direta para iniciantes.
import { useState } from "react";
import { Archive, Bot, Database, FileInput, FileSearch, FileText, Search, ShieldCheck, Sparkles, Tags, X } from "lucide-react";
import "./RagPipelines.css";

const diagramaAgenteRag = "/manus-storage/rag-agente-consulta_7bc87d64.png";
const diagramaPipelines = "/manus-storage/rag-pipelines_ef3b299b.png";

type EvidenciaProps = { imagem: string; legenda: string; titulo: string; aoAbrir: (imagem: string) => void };

// Exibe os diagramas recebidos como evidências de estação e mantém a leitura em alta resolução no lightbox.
function EvidenciaDeEstacao({ imagem, legenda, titulo, aoAbrir }: EvidenciaProps) {
  return <figure className="rag-evidence-figure">
    <div className="rag-evidence-head"><span>EVIDÊNCIA DE ESTAÇÃO</span><i /><b>{titulo}</b></div>
    <button type="button" onClick={() => aoAbrir(imagem)} aria-label={`Ampliar diagrama: ${titulo}`}>
      <img src={imagem} alt={legenda} />
      <span>CLIQUE PARA AMPLIAR ↗</span>
    </button>
    <figcaption>{legenda}</figcaption>
  </figure>;
}

export function RagPipelines() {
  const [imagemAberta, setImagemAberta] = useState<string | null>(null);

  return <>
    <section id="relacao" className="chapter rag-role-station">
      <div className="page-width">
        <div className="identificador"><span>03</span><i /><p>RAG e agente: papéis diferentes</p></div>
        <div className="chapter-heading">
          <h2>Um RAG <em>não é</em> um agente de IA.</h2>
          <p>RAG é um processo para encontrar conteúdo confiável e entregá-lo como contexto ao modelo. Um agente é quem pode decidir o próximo passo de uma tarefa e, entre outras coisas, usar RAG para se informar.</p>
        </div>

        <div className="rag-role-grid">
          <article className="rag-role-card rag-role-rag">
            <Database size={24} />
            <p>RAG · CONSULTA CONHECIMENTO</p>
            <h3>Busca e prepara a informação.</h3>
            <span>Ele encontra trechos em uma base externa, monta o contexto e entrega esse material ao modelo responder.</span>
            <b>Não define sozinho uma meta, plano ou ação.</b>
          </article>
          <article className="rag-role-card rag-role-agent">
            <Bot size={24} />
            <p>AGENTE · CONDUZ A TAREFA</p>
            <h3>Decide o que fazer depois.</h3>
            <span>Ele pode planejar, escolher uma ferramenta, consultar um RAG e agir a partir do que encontrou.</span>
            <b>Exemplo: consultar a regra e abrir uma solicitação.</b>
          </article>
          <div className="rag-role-connection" aria-label="Um agente pode consultar um RAG antes de agir"><Bot size={17} /><span>o agente pode consultar</span><i>→</i><Database size={17} /><strong>RAG</strong><i>→</i><span>contexto confiável</span></div>
        </div>

        <div className="rag-agent-visual">
          <div className="rag-agent-copy"><p className="eyebrow">LEITURA DIRETA DO DIAGRAMA</p><h3>O modelo não conhece automaticamente as regras da empresa.</h3><p>Sem uma fonte conectada, ele pode responder de modo geral. O RAG dá acesso a uma base externa escolhida pela empresa; o agente pode usar essa consulta dentro de um fluxo maior.</p><div><ShieldCheck size={18} /><span><b>Guarde esta frase:</b> RAG fornece conhecimento. Agente usa conhecimento para trabalhar.</span></div></div>
          <EvidenciaDeEstacao imagem={diagramaAgenteRag} titulo="RAG E BASE EXTERNA" legenda="Diagrama: uma pergunta passa pelo RAG, que consulta regras, perguntas frequentes e documentos internos antes de orientar o modelo." aoAbrir={setImagemAberta} />
        </div>
      </div>
    </section>

    <section id="pipelines" className="chapter chapter-soft rag-pipeline-station">
      <div className="page-width">
        <div className="identificador"><span>04</span><i /><p>As duas rotas do sistema</p></div>
        <div className="chapter-heading">
          <h2>Um RAG funciona com dois <em>pipelines principais.</em></h2>
          <p>O primeiro prepara a memória da empresa. O segundo usa essa memória quando alguém faz uma pergunta. Separar os dois deixa o funcionamento fácil de visualizar.</p>
        </div>

        <div className="rag-pipeline-cards">
          <article className="rag-pipeline-card rag-ingestion">
            <header><span>PIPELINE 01</span><Archive size={22} /><p>INGESTÃO · ACONTECE ANTES DA PERGUNTA</p></header>
            <h3>Prepare a base de conhecimento.</h3>
            <p>É a rota de bastidor. Ela roda quando um documento entra ou muda, para deixar a informação pronta para ser encontrada depois.</p>
            <ol><li><FileInput size={16} /><span><b>Ler o documento</b> · PDF, Markdown, FAQ ou regra interna.</span></li><li><Tags size={16} /><span><b>Registrar metadados</b> · fonte, data, área e versão.</span></li><li><FileText size={16} /><span><b>Separar em trechos</b> · pedaços menores, fáceis de localizar.</span></li><li><Sparkles size={16} /><span><b>Gerar embeddings</b> · um “localizador numérico” do significado.</span></li><li><Database size={16} /><span><b>Salvar na base</b> · com o trecho e sua origem.</span></li></ol>
          </article>
          <article className="rag-pipeline-card rag-query">
            <header><span>PIPELINE 02</span><Search size={22} /><p>CONSULTA · ACONTECE A CADA PERGUNTA</p></header>
            <h3>Encontre, contextualize e responda.</h3>
            <p>É a rota em tempo real. Ela começa quando alguém pergunta e termina com uma resposta que pode citar a fonte usada.</p>
            <ol><li><Bot size={16} /><span><b>Receber a pergunta</b> · “Qual é o prazo de reembolso?”</span></li><li><Sparkles size={16} /><span><b>Representar a pergunta</b> · para comparar significados.</span></li><li><FileSearch size={16} /><span><b>Buscar trechos relevantes</b> · na base preparada.</span></li><li><FileText size={16} /><span><b>Montar o contexto</b> · pergunta mais os trechos encontrados.</span></li><li><Bot size={16} /><span><b>Chamar o modelo</b> · para redigir usando o contexto.</span></li><li><ShieldCheck size={16} /><span><b>Responder com fonte</b> · e reconhecer quando não encontrou base suficiente.</span></li></ol>
          </article>
        </div>

        <div className="rag-pipeline-bridge" aria-label="A ingestão prepara a base e a consulta usa a base"><span>INGESTÃO PREPARA A BASE</span><i>↓</i><b>BASE DE CONHECIMENTO</b><i>↑</i><span>CONSULTA USA A BASE</span></div>
        <EvidenciaDeEstacao imagem={diagramaPipelines} titulo="INGESTÃO E CONSULTA" legenda="Diagrama dos dois pipelines: a ingestão lê, organiza e salva os documentos; a consulta encontra trechos, monta o contexto e devolve uma resposta com fonte." aoAbrir={setImagemAberta} />
      </div>
    </section>

    {imagemAberta && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Diagrama RAG ampliado" onClick={() => setImagemAberta(null)}>
      <button type="button" className="lightbox-close" onClick={() => setImagemAberta(null)} aria-label="Fechar imagem ampliada"><X size={20} /></button>
      <img src={imagemAberta} alt="Diagrama RAG ampliado" onClick={(event) => event.stopPropagation()} />
    </div>}
  </>;
}
