// Sala de Controle Editorial: RAG como memória consultável, com fundo mineral, rota coral e explicações em sequência para iniciantes.
import { useState } from "react";
import { ArrowRight, Bot, CheckCircle2, Database, FileSearch, FileText, MessageSquareText, Search, ShieldCheck, X } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";
import "./RagPage.css";
import "./RagMission.css";

// Diagrama enviado pelo usuário e preservado no armazenamento permanente do projeto.
const diagramaRag = "/manus-storage/rag-fluxo-retrieval-augmented-generation_e9d78b2c.png";

// Exibe a imagem de referência em tela cheia sem reduzir sua qualidade de leitura.
function FiguraFluxoRag() {
  const [aberta, setAberta] = useState(false);

  return <>
    <figure className="rag-reference-figure">
      <div className="rag-reference-frame-head"><span>ESTAÇÃO 01</span><i /><b>EVIDÊNCIA DE FLUXO</b></div>
      <button type="button" onClick={() => setAberta(true)} aria-label="Ampliar diagrama do fluxo RAG">
        <img src={diagramaRag} alt="Diagrama RAG com as etapas Retrieval, Augmented e Generation: uma pergunta busca contexto e produz uma resposta" />
        <span>CLIQUE PARA AMPLIAR ↗</span>
      </button>
      <figcaption>Fluxo visual de apoio: a pergunta busca contexto, ganha referência e só então recebe uma resposta.</figcaption>
    </figure>
    {aberta && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Diagrama RAG ampliado" onClick={() => setAberta(false)}>
      <button type="button" className="lightbox-close" onClick={() => setAberta(false)} aria-label="Fechar imagem ampliada"><X size={20} /></button>
      <img src={diagramaRag} alt="Diagrama RAG ampliado" onClick={(event) => event.stopPropagation()} />
    </div>}
  </>;
}

export default function RagPage() {
  return (
    <main className="skill-reference rag-page">
      <LibraryNav ativo="rag" />

      <section className="hero rag-hero">
        <div className="page-width hero-grid rag-hero-grid">
          <div>
            <div className="rag-mission-kicker"><span>MISSÃO 04</span><i /><p>CONSULTAR A MEMÓRIA DA EMPRESA</p></div>
            <h1>RAG: a IA consulta antes de <em>responder.</em></h1>
            <p className="hero-text">RAG significa <strong>Retrieval-Augmented Generation</strong>. Em português simples: antes de responder, a IA procura trechos relevantes em documentos confiáveis e usa esse contexto na resposta.</p>
            <a className="button-link rag-hero-link" href="#roteiro">Acompanhar o passo a passo <ArrowRight size={16} /></a>
          </div>
          <div className="rag-hero-card">
            <p className="rag-hero-label">A IDEIA EM UMA FRASE</p>
            <div className="rag-memory-mark" aria-label="Três rotas de RAG convergindo para uma resposta"><i /><i /><i /><b /></div>
            <h2>Sem RAG, a IA usa a própria <em>memória.</em><br />Com RAG, ela consulta a sua.</h2>
            <p>Isso ajuda quando a resposta depende de uma política atual, manual interno, catálogo de produto ou qualquer informação que a empresa controla.</p>
            <div className="rag-hero-route"><span>Pergunta</span><i>→</i><span>Contexto</span><i>→</i><span>Resposta</span></div>
          </div>
        </div>
        <nav className="page-width rag-deck-progress" aria-label="Rota de aprendizado do módulo RAG">
          <a href="#conceito"><b>01</b><span>Consultar</span></a><i /><a href="#cenario"><b>02</b><span>Rastrear</span></a><i /><a href="#roteiro"><b>03</b><span>Preparar</span></a><i /><a href="#posicionamento"><b>04</b><span>Decidir</span></a>
        </nav>
      </section>

      <section id="conceito" className="chapter chapter-soft rag-core">
        <div className="page-width">
          <div className="identificador"><span>01</span><i /><p>As três partes da sigla</p></div>
          <div className="chapter-heading">
            <h2>Não é uma busca comum. É uma <em>resposta com apoio.</em></h2>
            <p>O RAG não entrega todos os documentos para a IA. Ele encontra os poucos trechos que ajudam a responder aquela pergunta específica.</p>
          </div>

          <div className="rag-three-stage" aria-label="As três etapas de um processo RAG">
            <article>
              <span>01</span><Search size={24} />
              <p>RETRIEVAL · BUSCAR</p>
              <h3>Encontre o que importa.</h3>
              <p>A pergunta é comparada com os documentos disponíveis para localizar os trechos mais úteis.</p>
            </article>
            <article>
              <span>02</span><FileText size={24} />
              <p>AUGMENTED · COMPLETAR</p>
              <h3>Entregue contexto.</h3>
              <p>Os trechos encontrados são anexados à pergunta. A IA recebe uma base concreta antes de escrever.</p>
            </article>
            <article>
              <span>03</span><MessageSquareText size={24} />
              <p>GENERATION · RESPONDER</p>
              <h3>Explique com base.</h3>
              <p>A IA formula a resposta usando o contexto recuperado e, idealmente, aponta a fonte consultada.</p>
            </article>
          </div>
          <div className="rag-signal-route" aria-label="Rota ativa de uma consulta RAG"><span>PERGUNTA</span><i>→</i><span>BUSCA</span><i>→</i><span>CONTEXTO</span><i>→</i><span>RESPOSTA COM FONTE</span></div>

          <div className="rag-visual-grid">
            <div className="rag-visual-copy">
              <p className="eyebrow">ESTAÇÃO 01 · ENTENDA O CAMINHO</p>
              <h3>A IA não precisa decorar tudo. Ela precisa saber <em>onde consultar.</em></h3>
              <p>Imagine que sua empresa possui um manual de reembolso. Em vez de tentar lembrar todas as regras, a IA consulta o trecho correto do manual antes de responder a uma pessoa.</p>
              <div className="rag-simple-legend">
                <p><b>PERGUNTA</b><span>“Qual é o prazo de reembolso?”</span></p>
                <p><b>FONTE</b><span>Manual interno aprovado pela empresa.</span></p>
                <p><b>RESPOSTA</b><span>Explicação criada a partir do trecho encontrado.</span></p>
              </div>
            </div>
            <FiguraFluxoRag />
          </div>
        </div>
      </section>

      <section id="cenario" className="chapter rag-example">
        <div className="page-width">
          <div className="identificador"><span>02</span><i /><p>Exemplo corporativo</p></div>
          <div className="chapter-heading">
            <h2>Uma dúvida de RH vira uma resposta <em>rastreável.</em></h2>
            <p>Vamos seguir uma pergunta comum. O foco não é programar agora, mas enxergar exatamente o que o RAG faz entre a dúvida e a resposta.</p>
          </div>

          <div className="rag-scenario">
            <div className="rag-question-node"><MessageSquareText size={22} /><span>PERGUNTA DA PESSOA</span><strong>“Qual é o prazo para pedir reembolso de uma despesa?”</strong></div>
            <div className="rag-scenario-route" aria-hidden="true"><i /><b /></div>
            <div className="rag-scenario-grid">
              <article><Database size={21} /><p>BASE DE CONHECIMENTO</p><strong>Manual de Reembolso 2026</strong><span>Documento aprovado e atualizado pelo RH.</span></article>
              <article className="rag-scenario-focus"><FileSearch size={21} /><p>TRECHO ENCONTRADO</p><strong>“A solicitação deve ser registrada em até 30 dias...”</strong><span>O RAG seleciona este pedaço, não o manual inteiro.</span></article>
              <article className="rag-scenario-result"><CheckCircle2 size={21} /><p>RESPOSTA GERADA</p><strong>“O prazo é de até 30 dias após a despesa.”</strong><span>Com referência ao Manual de Reembolso 2026.</span></article>
            </div>
            <div className="rag-scenario-status"><span>ROTA DE CONSULTA ATIVA</span><i /><b>pergunta</b><i /><b>fonte oficial</b><i /><b>contexto selecionado</b><i /><b>resposta verificável</b></div>
          </div>

          <div className="rag-grounding-note"><ShieldCheck size={21} /><p><strong>O ponto importante:</strong> a resposta não nasce apenas da memória geral da IA. Ela é orientada por uma fonte que a empresa escolheu. Se o manual não trouxer a resposta, o comportamento correto é informar isso — não inventar.</p></div>
        </div>
      </section>

      <section id="roteiro" className="java-section rag-practice">
        <div className="page-width">
          <div className="identificador"><span>03</span><i /><p>Roteiro guiado · sem código</p></div>
          <div className="chapter-heading">
            <h2>Como montar o raciocínio de um RAG <em>em cinco passos.</em></h2>
            <p>Antes de escolher ferramentas ou escrever código, use este roteiro. Ele transforma uma ideia vaga em um caso de uso que a equipe consegue validar.</p>
          </div>

          <div className="rag-mission-progress" aria-label="Roteiro RAG em cinco passos">
            <div><p>MISSÃO GUIADA</p><strong>Uma pergunta. Uma fonte. Uma resposta verificável.</strong></div>
            <ol><li><span>01</span><b>Dúvida</b></li><li><span>02</span><b>Fonte</b></li><li><span>03</span><b>Preparar</b></li><li><span>04</span><b>Contexto</b></li><li><span>05</span><b>Validar</b></li></ol>
          </div>

          <div className="walkthrough rag-walkthrough">
            <article className="walk-step">
              <div className="step-text">
                <p className="step-number">PASSO 01</p>
                <h3>Escolha uma dúvida que tem um dono</h3>
                <p>Comece com uma pergunta repetida na empresa e que tenha uma área responsável pela resposta. Quanto mais específica, mais fácil será conferir se o RAG acertou.</p>
                <div className="rag-prompt-card"><MessageSquareText size={22} /><p className="prompt-label">EXEMPLO DE PERGUNTA</p><pre>{`Qual é o prazo para pedir reembolso de uma despesa?`}</pre></div>
              </div>
              <div className="rag-step-panel"><span>CAPACIDADE DESBLOQUEADA · ESCOPO</span><strong>Evite começar com “responda qualquer coisa sobre a empresa”.</strong><p>Uma pergunta clara permite avaliar se o resultado realmente trouxe o documento certo.</p></div>
            </article>

            <article className="walk-step flipped">
              <div className="step-text">
                <p className="step-number">PASSO 02</p>
                <h3>Escolha a fonte oficial</h3>
                <p>Defina quais documentos a IA poderá consultar. Dê preferência ao material validado pela área responsável, com data e versão identificadas.</p>
                <div className="rag-source-list"><p><FileText size={16} /><span>Manual de Reembolso 2026.pdf</span><b>FONTE PRINCIPAL</b></p><p><FileText size={16} /><span>FAQ de Despesas Internas.pdf</span><b>FONTE DE APOIO</b></p></div>
              </div>
              <div className="rag-step-panel rag-step-source"><Database size={26} /><span>CAPACIDADE DESBLOQUEADA · FONTE</span><strong>O RAG só será tão confiável quanto o conteúdo que você libera.</strong><p>Documento antigo ou contraditório pode gerar uma resposta errada, mesmo que o sistema funcione bem.</p></div>
            </article>

            <article className="walk-step">
              <div className="step-text">
                <p className="step-number">PASSO 03</p>
                <h3>Prepare o conteúdo para consulta</h3>
                <p>O sistema organiza documentos grandes em trechos menores e registra de onde veio cada um. Isso facilita encontrar uma passagem relevante sem despejar um PDF inteiro na conversa.</p>
                <div className="rag-fragment-row"><span>Manual completo</span><i>→</i><span>Trechos curtos</span><i>→</i><span>Índice de busca</span></div>
              </div>
              <div className="rag-step-panel"><FileSearch size={26} /><span>CAPACIDADE DESBLOQUEADA · ORGANIZAÇÃO</span><strong>Texto + fonte + data + área responsável.</strong><p>Essas informações extras são chamadas de metadados e ajudam a filtrar material antigo ou fora do assunto.</p></div>
            </article>

            <article className="walk-step flipped">
              <div className="step-text">
                <p className="step-number">PASSO 04</p>
                <h3>Busque e anexe o contexto certo</h3>
                <p>Quando alguém envia a pergunta, o RAG procura os trechos mais próximos dela. Em seguida, o trecho encontrado é enviado junto com a pergunta para a IA.</p>
                <div className="rag-context-card"><p>PERGUNTA + CONTEXTO</p><pre>{`Responda usando somente o contexto abaixo.

Contexto: “A solicitação de reembolso deve ser registrada em até 30 dias...”

Pergunta: Qual é o prazo para pedir reembolso?`}</pre></div>
              </div>
              <div className="rag-step-panel rag-step-context"><Search size={26} /><span>CAPACIDADE DESBLOQUEADA · CONTEXTO</span><strong>A IA deixa de adivinhar e passa a responder olhando uma referência.</strong><p>O contexto deve ser relevante. Colocar informação demais também pode confundir a resposta.</p></div>
            </article>

            <article className="walk-step">
              <div className="step-text">
                <p className="step-number">PASSO 05</p>
                <h3>Valide antes de confiar</h3>
                <p>Peça para a IA mostrar a fonte usada e combine uma saída segura: se não houver trecho suficiente, ela deve dizer que não encontrou a informação na base.</p>
                <div className="rag-success-card"><CheckCircle2 size={21} /><div><p>RESPOSTA ESPERADA</p><strong>“O prazo é de até 30 dias após a despesa, segundo o Manual de Reembolso 2026.”</strong></div></div>
              </div>
              <div className="rag-step-panel rag-step-result"><ShieldCheck size={26} /><span>CAPACIDADE DESBLOQUEADA · VALIDAÇÃO</span><strong>A resposta é clara, corresponde ao documento e permite conferência.</strong><p>RAG reduz o risco de invenção, mas não substitui revisão humana em decisões importantes.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="posicionamento" className="chapter rag-positioning">
        <div className="page-width">
          <div className="identificador"><span>04</span><i /><p>Onde RAG se encaixa</p></div>
          <div className="chapter-heading">
            <h2>RAG entrega <em>conhecimento.</em> Agentes executam trabalho.</h2>
            <p>As duas coisas podem trabalhar juntas, mas não são iguais. Saber a diferença evita prometer que uma simples busca vai automatizar toda uma operação.</p>
          </div>

          <div className="rag-compare-grid">
            <article><Database size={23} /><p>RAG</p><h3>Consulta e dá contexto.</h3><span>Use quando a IA precisa responder com base em documentos, políticas e informações atualizadas.</span><b>Exemplo: encontrar a regra de reembolso.</b></article>
            <article><Bot size={23} /><p>AGENTE</p><h3>Decide próximos passos.</h3><span>Use quando a IA precisa planejar, chamar recursos e conduzir uma tarefa com objetivo definido.</span><b>Exemplo: abrir uma solicitação depois de confirmar a regra.</b></article>
            <article className="rag-compare-combo"><CheckCircle2 size={23} /><p>JUNTOS</p><h3>O agente pode usar RAG para se informar.</h3><span>Primeiro ele consulta a política. Depois decide se deve orientar, pedir mais dados ou usar uma ferramenta permitida.</span><b>Informação antes da ação.</b></article>
          </div>

          <div className="rag-use-grid">
            <div><p className="eyebrow">RAG É UMA BOA ESCOLHA QUANDO...</p><ul><li>As respostas dependem de documentos internos ou conteúdo atualizado.</li><li>Você precisa saber qual fonte apoiou uma resposta.</li><li>A equipe repete perguntas sobre políticas, manuais ou procedimentos.</li></ul></div>
            <div><p className="eyebrow">RAG NÃO SUBSTITUI...</p><ul><li>Um MCP, quando a IA precisa executar ações em sistemas externos.</li><li>Uma Skill, quando é preciso seguir um processo ou padrão reutilizável.</li><li>Uma pessoa responsável por revisar fontes e respostas relevantes.</li></ul></div>
          </div>

          <div className="rag-sources"><p>BASE CONCEITUAL PARA APROFUNDAR</p><a href="https://aws.amazon.com/what-is/retrieval-augmented-generation/" target="_blank" rel="noreferrer">AWS · O que é RAG ↗</a><a href="https://www.ibm.com/think/topics/retrieval-augmented-generation" target="_blank" rel="noreferrer">IBM · Como RAG funciona ↗</a><a href="https://www.youtube.com/watch?v=aYEa5svlzC0" target="_blank" rel="noreferrer">Curso indicado · RAG e agentes ↗</a></div>
        </div>
      </section>
    </main>
  );
}
