// Design: missão guiada em fundo mineral, com rota coral e Nexo como sinais visuais de progresso para iniciantes.
import { useState } from "react";
import { ArrowRight, Ban, Boxes, CheckCircle2, ExternalLink, FileText, FolderPlus, PlugZap, Server, Terminal, Wrench, X } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

const arquiteturaMcp = "/manus-storage/arquitetura-mcp-explicada_ead4e8f7.png";

function FiguraArquiteturaMcp() {
  const [aberta, setAberta] = useState(false);

  return <>
    <figure className="mcp-architecture-figure">
      <button type="button" onClick={() => setAberta(true)} aria-label="Ampliar diagrama de arquitetura MCP">
        <img src={arquiteturaMcp} alt="Arquitetura MCP: agente de IA conversa com um servidor MCP, que disponibiliza tools, prompts e resources de serviços externos" />
        <span>CLIQUE PARA AMPLIAR ↗</span>
      </button>
      <figcaption>Arquitetura MCP: o servidor organiza o que a IA pode fazer, pedir e consultar.</figcaption>
    </figure>
    {aberta && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Diagrama de arquitetura MCP ampliado" onClick={() => setAberta(false)}>
      <button type="button" className="lightbox-close" onClick={() => setAberta(false)} aria-label="Fechar imagem ampliada"><X size={20} /></button>
      <img src={arquiteturaMcp} alt="Arquitetura MCP ampliada" onClick={(event) => event.stopPropagation()} />
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
            <div className="mcp-mission-kicker"><span>MISSÃO 02</span><i /><p>CRIAR SUA PRIMEIRA FERRAMENTA</p></div>
            <h1>A ponte entre a <em>IA</em> e o mundo externo.</h1>
            <p className="hero-text">MCP significa <strong>Model Context Protocol</strong>. Para quem está começando: ele é um padrão para um agente de IA conversar com ferramentas, sistemas e dados de fora.</p>
            <a className="button-link" href="#exemplo">Ver o exemplo simples <ArrowRight size={16} /></a>
          </div>
          <div className="mcp-hero-card">
            <p className="mcp-hero-label">A ANALOGIA MAIS SIMPLES</p>
            <div className="mcp-nexo" aria-label="Três rotas convergem para uma conexão MCP"><span /><span /><span /><b /></div>
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
            <div className="mcp-control-diagram" aria-label="Diagrama: agente conecta ao servidor MCP, que se conecta a uma ferramenta externa">
              <p className="control-map-label">MAPA DA MISSÃO</p>
              <div className="control-map-route">
                <article><span>01</span><strong>Agente de IA</strong><p>Entende o pedido.</p></article>
                <i aria-hidden="true" />
                <article className="control-map-focus"><span>02</span><strong>MCP Server</strong><p>Define o acesso.</p></article>
                <i aria-hidden="true" />
                <article><span>03</span><strong>Ferramenta</strong><p>Faz a ação permitida.</p></article>
              </div>
              <div className="control-map-foot"><b>REGRA DE SEGURANÇA</b><span>A IA só enxerga as ferramentas que o MCP disponibiliza.</span></div>
            </div>
          </div>

          <div className="mcp-diagram-explainer">
            <div className="mcp-diagram-intro">
              <p className="eyebrow">ESTAÇÃO 01 · OBSERVE A ROTA</p>
              <h3>A IA não entra nos sistemas <em>sozinha.</em></h3>
              <p>Leia da esquerda para a direita: você fala com a IA; ela pede algo ao servidor MCP; e o servidor usa apenas os recursos que foram liberados.</p>
            </div>
            <FiguraArquiteturaMcp />
            <div className="mcp-simple-legend" aria-label="Explicação simples dos elementos do diagrama">
              <article><b>1</b><div><strong>MCP Client</strong><p>É a IA que recebe seu pedido.</p></div></article>
              <article><b>2</b><div><strong>MCP Server</strong><p>É o porteiro: decide quais conexões a IA pode usar.</p></div></article>
              <article><b>3</b><div><strong>Tools, Prompts e Resources</strong><p>São, respectivamente, ações, roteiros prontos e informações para consultar.</p></div></article>
              <article><b>4</b><div><strong>Serviços externos</strong><p>São os sistemas da empresa, como documentos, plataformas e ambientes técnicos.</p></div></article>
            </div>
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
            <article><p className="mcp-capability-label">CAPACIDADE 01</p><Wrench size={22} /><h3>Tools</h3><p><strong>Ações.</strong> A IA pode chamar uma função permitida, como verificar o status de um ambiente.</p><span>Exemplo: <code>status_ambiente</code></span></article>
            <article><p className="mcp-capability-label">CAPACIDADE 02</p><Boxes size={22} /><h3>Prompts</h3><p><strong>Modelos reutilizáveis.</strong> Um roteiro pronto para investigar um erro, criar um documento ou seguir um processo.</p><span>Exemplo: investigar deploy</span></article>
            <article><p className="mcp-capability-label">CAPACIDADE 03</p><Server size={22} /><h3>Resources</h3><p><strong>Dados para ler.</strong> Arquivos, logs, documentos ou informações de um banco de dados.</p><span>Exemplo: arquivo de logs</span></article>
          </div>
        </div>
      </section>

      <section id="exemplo" className="java-section mcp-practice">
        <div className="page-width">
          <div className="identificador"><span>03</span><i /><p>Prática única · Windows</p></div>
          <div className="chapter-heading">
            <h2>Seu primeiro MCP, sem navegador e <em>sem Node.js.</em></h2>
            <p>Esta é a única sequência que você precisa seguir. No final, o próprio terminal mostra se sua ferramenta respondeu.</p>
          </div>

          <div className="mcp-one-path">
            <Terminal size={20} />
            <p><strong>Antes de começar:</strong> abra o <strong>Windows PowerShell</strong>. Faça um passo inteiro antes de ir para o próximo. Não use <code>mcp.exe</code>, <code>mcp dev</code>, navegador ou Node.js neste primeiro teste.</p>
          </div>

          <div className="mcp-mission-progress" aria-label="Progresso da missão em cinco etapas">
            <div><p>MISSÃO GUIADA</p><strong>5 passos. Um único resultado.</strong></div>
            <ol>
              <li><span>01</span><b>Pasta</b></li>
              <li><span>02</span><b>Instalar</b></li>
              <li><span>03</span><b>Ferramenta</b></li>
              <li><span>04</span><b>Teste</b></li>
              <li><span>05</span><b>Confirmar</b></li>
            </ol>
          </div>

          <div className="mcp-file-roles" aria-label="Os dois arquivos do exemplo">
            <article><FileText size={20} /><p>ARQUIVO 1</p><strong>server.py</strong><span>Guarda a ferramenta MCP <code>cumprimentar</code>.</span></article>
            <article><CheckCircle2 size={20} /><p>ARQUIVO 2</p><strong>testar_mcp.py</strong><span>Chama a ferramenta e mostra a resposta no terminal.</span></article>
          </div>

          <div className="walkthrough mcp-walkthrough">
            <article className="walk-step">
              <div className="step-text">
                <p className="step-number">PASSO 01</p>
                <h3>Crie a pasta do exemplo</h3>
                <p>Copie as duas linhas abaixo no PowerShell e pressione <strong>Enter</strong>. A segunda linha coloca você dentro da pasta certa.</p>
                <div className="prompt-card"><FolderPlus size={22} /><p className="prompt-label">COPIE NO POWERSHELL</p><pre>{`mkdir C:\\meu-primeiro-mcp
cd C:\\meu-primeiro-mcp`}</pre></div>
                <p><strong>Confira antes de continuar:</strong> a última linha do terminal deve começar com <code>PS C:\meu-primeiro-mcp&gt;</code>.</p>
              </div>
              <div className="mcp-flow-card"><p>ONDE VOCÊ ESTÁ</p><strong>C:\meu-primeiro-mcp</strong><i>↓</i><p>O QUE VAI FICAR AQUI</p><strong>server.py<br />testar_mcp.py</strong></div>
            </article>

            <article className="walk-step flipped">
              <div className="step-text">
                <p className="step-number">PASSO 02</p>
                <h3>Instale o FastMCP uma única vez</h3>
                <p>Copie este comando exatamente como está. Ele usa o caminho completo do Python, portanto <strong>não precisa configurar PATH</strong>.</p>
                <div className="prompt-card"><ExternalLink size={22} /><p className="prompt-label">COPIE NO POWERSHELL</p><pre>{`& "$env:LocalAppData\\Python\\pythoncore-3.14-64\\python.exe" -m pip install fastmcp`}</pre></div>
                <p>Espere o terminal terminar. Quando aparecer <code>Successfully installed</code> ou <code>Requirement already satisfied</code>, avance.</p>
              </div>
              <div className="mcp-summary-card"><p>POR QUE ESTA ETAPA EXISTE</p><h3>O FastMCP é a <em>caixa de ferramentas</em> que permite criar e testar seu MCP.</h3></div>
            </article>

            <article className="walk-step">
              <div className="step-text">
                <p className="step-number">PASSO 03</p>
                <h3>Crie o arquivo <code>server.py</code></h3>
                <p>Primeiro, execute <code>notepad server.py</code>. Se o Windows perguntar se deseja criar o arquivo, clique em <strong>Sim</strong>. No Bloco de Notas, apague tudo, cole o código abaixo, pressione <strong>Ctrl + S</strong> e feche o Bloco de Notas.</p>
                <div className="prompt-card"><ExternalLink size={22} /><p className="prompt-label">PRIMEIRO, NO POWERSHELL</p><pre>{`notepad server.py`}</pre></div>
                <pre>{`from fastmcp import FastMCP

mcp = FastMCP("Servidor de Cumprimentos")

@mcp.tool
def cumprimentar(nome: str) -> str:
    return f"Olá, {nome}! Sua ferramenta MCP está funcionando."

if __name__ == "__main__":
    mcp.run()`}</pre>
              </div>
              <div className="mcp-tool-card"><span>FERRAMENTA CRIADA</span><code>cumprimentar</code><p>Entrada: nome<br />Saída: uma saudação</p></div>
            </article>

            <article className="walk-step flipped">
              <div className="step-text">
                <p className="step-number">PASSO 04</p>
                <h3>Crie o arquivo de teste</h3>
                <p>Agora execute <code>notepad testar_mcp.py</code>. De novo: clique em <strong>Sim</strong>, cole o código, pressione <strong>Ctrl + S</strong> e feche o Bloco de Notas.</p>
                <div className="prompt-card"><ExternalLink size={22} /><p className="prompt-label">PRIMEIRO, NO POWERSHELL</p><pre>{`notepad testar_mcp.py`}</pre></div>
                <pre>{`import asyncio
from fastmcp import Client
from server import mcp

async def testar_ferramenta():
    async with Client(mcp) as cliente:
        resultado = await cliente.call_tool("cumprimentar", {"nome": "João"})
        print("TESTE CONCLUÍDO COM SUCESSO")
        print(resultado.data)

asyncio.run(testar_ferramenta())`}</pre>
              </div>
              <div className="mcp-flow-card"><p>O QUE ESSE ARQUIVO FAZ</p><strong>abre o MCP</strong><i>↓</i><strong>chama cumprimentar</strong><i>↓</i><strong>mostra a resposta</strong></div>
            </article>

            <article className="walk-step">
              <div className="step-text">
                <p className="step-number">PASSO 05</p>
                <h3>Execute o teste final</h3>
                <p>Volte ao PowerShell, que ainda deve estar em <code>C:\meu-primeiro-mcp</code>, e copie apenas este comando.</p>
                <div className="prompt-card"><Terminal size={22} /><p className="prompt-label">COMANDO FINAL</p><pre>{`& "$env:LocalAppData\\Python\\pythoncore-3.14-64\\python.exe" testar_mcp.py`}</pre></div>
                <div className="mcp-success-terminal"><p>O RESULTADO CORRETO É:</p><pre>{`TESTE CONCLUÍDO COM SUCESSO
Olá, João! Sua ferramenta MCP está funcionando.`}</pre></div>
              </div>
              <div className="mcp-summary-card"><p>SE VOCÊ VIU A FRASE ACIMA</p><h3>Parabéns: você criou e testou uma <em>ferramenta MCP.</em></h3><p>O próximo passo, mais adiante, é conectar essa ferramenta a um agente de IA.</p></div>
            </article>
          </div>

          <div className="mcp-stop-card"><Ban size={20} /><p><strong>Para este exemplo, pare aqui.</strong> Não digite <code>mcp.exe</code>, <code>mcp dev</code> ou <code>fastmcp dev</code>. Eles são alternativas mais avançadas e não fazem parte deste primeiro teste.</p></div>

          <section className="mcp-execution-map" aria-labelledby="execucao-exemplo">
            <div className="mcp-execution-head">
              <div>
                <p className="eyebrow">ESTAÇÃO FINAL · O QUE ACONTECEU NOS BASTIDORES</p>
                <h2 id="execucao-exemplo">Do comando até a <em>resposta.</em></h2>
              </div>
              <div className="mcp-execution-context">
                <p>Você não precisou abrir dois terminais. Ao executar <code>testar_mcp.py</code>, ele usa a ferramenta que está guardada em <code>server.py</code> e mostra o resultado na mesma tela.</p>
                <div className="mcp-execution-nexo" aria-label="Três rotas convergem para o resultado"><i /><i /><i /><b /><span>COMANDO · MCP · RESPOSTA</span></div>
              </div>
            </div>

            <div className="mcp-execution-flow" aria-label="Fluxo de execução do teste FastMCP">
              <article className="exec-node exec-terminal">
                <span>01 · VOCÊ</span><Terminal size={22} /><h3>PowerShell</h3><p>Você digita o comando final.</p>
                <pre>{`python testar_mcp.py`}</pre>
              </article>
              <i className="exec-arrow" aria-hidden="true" />
              <article className="exec-node exec-test">
                <span>02 · ARQUIVO EXECUTADO</span><FileText size={22} /><h3>testar_mcp.py</h3><p>É o arquivo que começa o teste.</p>
                <code>from server import mcp</code>
              </article>
              <i className="exec-arrow" aria-hidden="true" />
              <article className="exec-node exec-server">
                <span>03 · MCP CRIADO</span><Server size={22} /><h3>server.py</h3><p>Guarda a ferramenta disponível.</p>
                <code>mcp = FastMCP(...)</code>
              </article>
              <i className="exec-arrow" aria-hidden="true" />
              <article className="exec-node exec-tool">
                <span>04 · AÇÃO</span><Wrench size={22} /><h3>cumprimentar</h3><p>Recebe o nome João e prepara a frase.</p>
                <code>cumprimentar("João")</code>
              </article>
              <i className="exec-arrow" aria-hidden="true" />
              <article className="exec-node exec-response">
                <span>05 · RESULTADO</span><CheckCircle2 size={22} /><h3>Terminal</h3><p>O arquivo de teste imprime a resposta.</p>
                <strong>Olá, João!</strong>
              </article>
            </div>

            <div className="mcp-execution-note"><b>O ponto mais importante:</b><span>neste primeiro teste, <code>testar_mcp.py</code> importa o MCP de <code>server.py</code>. Por isso, você executa apenas o arquivo de teste; o servidor não é iniciado em outra janela.</span></div>
          </section>
        </div>
      </section>

      <footer className="footer page-width"><p><strong>Resumo:</strong> você criou uma pasta, instalou o FastMCP, escreveu dois arquivos e confirmou a resposta da ferramenta. É a forma mais curta de validar que seu primeiro MCP funciona.</p><a href="#top">Voltar ao topo ↑</a></footer>
    </main>
  );
}
