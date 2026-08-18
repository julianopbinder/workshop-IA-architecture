// Design: linguagem editorial mineral da biblioteca, com coral usado para destacar a ponte e as ações do MCP.
import { useState } from "react";
import { ArrowRight, Boxes, ExternalLink, PlugZap, Server, Wrench, X } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

const imagens = {
  arquitetura: "/manus-storage/mcp-arquitetura-referencia_2d831c18.jpg",
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
        </div>
      </section>

      <section id="exemplo" className="java-section mcp-practice">
        <div className="page-width">
          <div className="identificador"><span>03</span><i /><p>Seu primeiro MCP do zero</p></div>
          <div className="chapter-heading">
            <h2>Crie uma ferramenta que apenas <em>diz “olá”.</em></h2>
            <p>Não vamos conectar banco de dados, Kubernetes ou outro sistema. Primeiro, você cria uma ferramenta local, inicia o MCP e confere se ela respondeu corretamente.</p>
          </div>

          <div className="walkthrough mcp-walkthrough">
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 01</p><h3>Crie a pasta e instale o MCP</h3><p>No Windows, abra o <strong>Terminal</strong>. Copie um comando de cada vez e pressione Enter. O primeiro cria uma pasta para seu exemplo; o segundo instala a ferramenta.</p><div className="prompt-card"><ExternalLink size={22} /><p className="prompt-label">COMANDOS PARA COPIAR</p><pre>{`mkdir meu-primeiro-mcp
cd meu-primeiro-mcp
python -m pip install "mcp[cli]"`}</pre></div><p>Ao terminar, você terá uma pasta chamada <code>meu-primeiro-mcp</code>. É nela que ficará seu arquivo Python.</p></div>
              <div className="mcp-summary-card"><p>O QUE VOCÊ FEZ</p><h3>Criou o lugar do projeto e instalou o <em>kit de criação</em> do MCP.</h3></div>
            </article>
            <article className="walk-step flipped">
              <div className="step-text"><p className="step-number">PASSO 02</p><h3>Crie o arquivo <code>server.py</code></h3><p>Na pasta <code>meu-primeiro-mcp</code>, crie um arquivo chamado <code>server.py</code>. Copie tudo abaixo e salve.</p><pre>{`# Importa a biblioteca que cria o MCP.
from mcp.server.fastmcp import FastMCP

# Cria um servidor MCP com um nome simples.
mcp = FastMCP("Meu Primeiro MCP")

# Registra uma ferramenta que recebe um nome.
@mcp.tool()
def cumprimentar(nome: str) -> str:
    # Devolve uma mensagem para quem chamou a ferramenta.
    return f"Olá, {nome}!"

# Inicia o MCP quando este arquivo é executado.
if __name__ == "__main__":
    # Mantém a conversa pelo terminal.
    mcp.run(transport="stdio")`}</pre><p>O nome da sua primeira ferramenta é <code>cumprimentar</code>. Ela recebe um nome e devolve uma saudação.</p></div>
              <div className="mcp-tool-card"><span>TOOL CRIADA</span><code>cumprimentar</code><p>Entrada: nome<br />Saída: uma saudação</p></div>
            </article>
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 03</p><h3>Inicie o MCP</h3><p>Com o Terminal ainda aberto na pasta <code>meu-primeiro-mcp</code>, execute:</p><div className="prompt-card"><ExternalLink size={22} /><p className="prompt-label">COMANDO PARA COPIAR</p><pre>{`mcp dev server.py`}</pre></div><p>Esse comando inicia seu MCP localmente e abre uma página de teste no navegador. Não feche o Terminal enquanto estiver testando.</p></div>
              <div className="mcp-flow-card"><p>SEU ARQUIVO</p><strong>server.py</strong><i>↓</i><p>MCP INICIADO</p><strong>ferramenta cumprimentar disponível</strong><i>↓</i><p>PÁGINA DE TESTE</p><strong>pronta para testar</strong></div>
            </article>
            <article className="walk-step flipped">
              <div className="step-text"><p className="step-number">PASSO 04</p><h3>Teste a ferramenta</h3><div className="beginner-steps"><p><b>1.</b> Na página que abriu, clique em <strong>List Tools</strong>.</p><p><b>2.</b> Escolha a ferramenta <code>cumprimentar</code>.</p><p><b>3.</b> No campo <code>nome</code>, escreva <code>Ana</code>.</p><p><b>4.</b> Clique em <strong>Run Tool</strong>.</p></div><div className="decision-card"><p><b>DEU CERTO</b><span>Você verá uma resposta parecida com: <strong>Olá, Ana!</strong></span></p><p><b>DEU ERRO</b><span>Leia a mensagem no Terminal, corrija o arquivo <code>server.py</code>, salve e rode <code>mcp dev server.py</code> novamente.</span></p></div></div>
              <div className="mcp-summary-card"><p>RESULTADO FINAL</p><h3>Você criou e testou uma <em>ferramenta MCP.</em></h3><p>Depois, essa mesma ideia pode ser usada por um agente de IA conectado ao seu MCP.</p></div>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer page-width"><p><strong>Resumo:</strong> você criou uma ferramenta MCP local, iniciou o servidor e testou a resposta sem conectar nenhum sistema externo.</p><a href="#top">Voltar ao topo ↑</a></footer>
    </main>
  );
}
