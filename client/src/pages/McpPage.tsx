// Design: linguagem editorial mineral da biblioteca, com coral usado para destacar a ponte e as ações do MCP.
import { useState } from "react";
import { ArrowRight, Boxes, CheckCircle2, ExternalLink, PlugZap, Server, Wrench, X } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

const imagens = {
  arquitetura: "/manus-storage/mcp-arquitetura-referencia_2d831c18.jpg",
  capacidades: "/manus-storage/mcp-tools-prompts-resources-referencia_05ef3422.png",
};

function Figura({ src, alt, legenda }: { src: string; alt: string; legenda: string }) {
  const [aberta, setAberta] = useState(false);

  return <>
    <figure className="figura">
      <button type="button" className="figura-button" onClick={() => setAberta(true)} aria-label={`Ampliar: ${legenda}`}>
        <img src={src} alt={alt} />
        <span>Ampliar ↗</span>
      </button>
      <figcaption>{legenda}</figcaption>
    </figure>
    {aberta && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={legenda} onClick={() => setAberta(false)}>
      <button type="button" className="lightbox-close" onClick={() => setAberta(false)} aria-label="Fechar imagem ampliada"><X size={20} /></button>
      <img src={src} alt={alt} onClick={(event) => event.stopPropagation()} />
    </div>}
  </>;
}

export default function McpPage() {
  return (
    <main className="skill-reference mcp-page">
      <LibraryNav ativo="mcps" />

      <section className="hero mcp-hero">
        <div className="page-width hero-grid">
          <div>
            <p className="eyebrow">BIBLIOTECA DE CONHECIMENTO · MCP</p>
            <h1>A ponte entre a <em>IA</em> e o mundo externo.</h1>
            <p className="hero-text">MCP significa <strong>Model Context Protocol</strong>. Para quem está começando: ele é um padrão para um agente de IA conversar com ferramentas, sistemas e dados de fora.</p>
            <a className="button-link" href="#exemplo">Ver o exemplo simples <ArrowRight size={16} /></a>
          </div>
          <div className="mcp-hero-card">
            <p className="mcp-hero-label">A ANALOGIA MAIS SIMPLES</p>
            <h2>Skill é a receita.<br />MCP são os <em>utensílios.</em></h2>
            <p>A Skill ensina como trabalhar. O MCP permite que a IA use uma ferramenta: consultar um sistema, ler dados ou executar uma ação permitida.</p>
            <div className="mcp-hero-route"><span>Agente</span><i>→</i><span>MCP</span><i>→</i><span>Ferramenta</span></div>
          </div>
        </div>
      </section>

      <section className="chapter chapter-soft">
        <div className="page-width">
          <div className="identificador"><span>01</span><i /><p>Como o MCP funciona</p></div>
          <div className="chapter-heading">
            <h2>Um MCP funciona como uma <em>USB para agentes de IA.</em></h2>
            <p>Em vez de criar uma integração diferente para cada IA, o MCP oferece uma forma padrão de ligar o agente a um serviço externo.</p>
          </div>
          <div className="mcp-architecture-grid">
            <div className="mcp-bridge-copy">
              <p><strong>1. Agente (MCP Client):</strong> a IA que recebe seu pedido.</p>
              <p><strong>2. MCP Server:</strong> a ponte que apresenta ferramentas e dados para a IA.</p>
              <p><strong>3. Serviço externo:</strong> o sistema que realmente tem a informação ou executa a ação.</p>
              <div className="mcp-note"><PlugZap size={18} /><span>O agente não ganha acesso total ao sistema. Ele só usa as ferramentas que o MCP Server disponibiliza e permite.</span></div>
            </div>
            <Figura src={imagens.arquitetura} alt="Diagrama de arquitetura do Model Context Protocol" legenda="A ideia principal: agente de IA, MCP Server e serviço externo formam uma ponte." />
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="page-width">
          <div className="identificador"><span>02</span><i /><p>Três capacidades</p></div>
          <div className="chapter-heading">
            <h2>O que um MCP pode oferecer <em>para a IA?</em></h2>
            <p>Para entender o MCP com facilidade, separe suas capacidades em três grupos: ações, modelos de pergunta e dados para consultar.</p>
          </div>
          <div className="mcp-capabilities">
            <article><Wrench size={22} /><h3>Tools</h3><p><strong>Ações.</strong> A IA pode chamar uma função permitida, como verificar o status de um ambiente.</p><span>Exemplo: <code>status_ambiente</code></span></article>
            <article><Boxes size={22} /><h3>Prompts</h3><p><strong>Modelos reutilizáveis.</strong> Um roteiro pronto para investigar um erro, criar um documento ou seguir um processo.</p><span>Exemplo: investigar deploy</span></article>
            <article><Server size={22} /><h3>Resources</h3><p><strong>Dados para ler.</strong> Arquivos, logs, documentos ou informações de um banco de dados.</p><span>Exemplo: arquivo de logs</span></article>
          </div>
          <div className="mcp-reference-visual"><Figura src={imagens.capacidades} alt="Interface MCP com ferramentas, prompts e recursos" legenda="Exemplo visual: um MCP Server pode disponibilizar Tools, Prompts e Resources para a IA." /></div>
        </div>
      </section>

      <section id="exemplo" className="java-section mcp-practice">
        <div className="page-width">
          <div className="identificador"><span>03</span><i /><p>Exemplo para iniciantes</p></div>
          <div className="chapter-heading">
            <h2>Peça para a IA verificar um <em>ambiente de testes.</em></h2>
            <p>Para começar sem complexidade, use uma ferramenta já conectada que apenas informa se o ambiente está online. Depois, o mesmo padrão pode atender sistemas maiores.</p>
          </div>
          <div className="mcp-beginner-warning"><CheckCircle2 size={18} /><span><strong>Importante:</strong> este é um exemplo didático. Para funcionar de verdade, alguém do time precisa configurar e autorizar o MCP Server uma única vez.</span></div>

          <div className="walkthrough mcp-walkthrough">
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 01</p><h3>O time disponibiliza uma ferramenta</h3><p>Imagine que o time de infraestrutura criou no MCP uma ferramenta chamada <code>status_ambiente</code>. Ela só responde se o ambiente de testes está online ou offline.</p><div className="mcp-tool-card"><span>TOOL DO MCP</span><code>status_ambiente</code><p>Permissão: apenas consulta</p></div></div>
              <div className="mcp-flow-card"><p>AGENTE DE IA</p><strong>“Preciso verificar o ambiente.”</strong><i>↓</i><p>MCP SERVER</p><strong>“Existe a tool status_ambiente.”</strong><i>↓</i><p>SERVIÇO EXTERNO</p><strong>“ambiente-testes: ONLINE”</strong></div>
            </article>
            <article className="walk-step flipped">
              <div className="step-text"><p className="step-number">PASSO 02</p><h3>Você faz um pedido simples</h3><p>No agente de IA que está conectado ao MCP, escreva:</p><div className="prompt-card"><ExternalLink size={22} /><p className="prompt-label">PROMPT PARA COPIAR</p><pre>{`Verifique o status do ambiente de testes.
Use a ferramenta disponível no MCP.
Não faça nenhuma alteração.`}</pre></div><p>Você não precisa escrever comandos de infraestrutura. O agente escolhe a ferramenta disponibilizada pelo MCP.</p></div>
              <div className="mcp-chat-card"><div className="mcp-chat-top">AGENTE DE IA · MCP CONECTADO</div><div className="mcp-user-msg">Verifique o status do ambiente de testes.</div><div className="mcp-agent-msg">Vou usar a ferramenta <code>status_ambiente</code>.</div><div className="mcp-tool-result"><span>RESULTADO DA TOOL</span><strong>ambiente-testes: ONLINE</strong></div></div>
            </article>
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 03</p><h3>Confira o resultado e os limites</h3><p>O MCP deu ao agente uma forma controlada de consultar o ambiente. Ele retornou um resultado, mas não recebeu autorização para fazer deploy, apagar dados ou mudar configurações.</p><div className="decision-card"><p><b>PODE</b><span>Consultar o status permitido pela ferramenta.</span></p><p><b>NÃO PODE</b><span>Executar ações que o MCP não disponibilizou ou autorizou.</span></p></div></div>
              <div className="mcp-summary-card"><p>MCP EM UMA FRASE</p><h3>O agente usa uma <em>ponte controlada</em> para pedir algo a uma ferramenta externa.</h3></div>
            </article>
          </div>
        </div>
      </section>

      <section className="chapter chapter-soft">
        <div className="page-width">
          <div className="identificador"><span>04</span><i /><p>Quando usar</p></div>
          <div className="when-grid">
            <div><h2>Use MCP quando a IA precisa <em>agir fora da conversa.</em></h2></div>
            <div><p>Você quer que a IA consulte dados, leia documentos, veja logs ou use uma ferramenta de outro sistema — sempre com permissões e limites definidos.</p><div className="use-cases"><span>Consultar Kubernetes</span><span>Ler logs</span><span>Abrir Notion</span><span>Buscar dados</span><span>Usar Figma</span></div></div>
          </div>
          <div className="mcp-next-module"><Server size={21} /><p><strong>O próximo conceito são os Subagentes.</strong> Depois de conectar ferramentas pelo MCP, um agente principal pode delegar pesquisa, DevOps ou testes a especialistas.</p><a href="/subagentes">Ver Subagentes <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <footer className="footer page-width"><p><strong>Resumo:</strong> Skill diz como trabalhar; MCP dá ao agente um caminho controlado para usar ferramentas e dados externos.</p><a href="#top">Voltar ao topo ↑</a></footer>
    </main>
  );
}
