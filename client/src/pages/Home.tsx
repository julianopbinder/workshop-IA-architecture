// Guia Skill Simples: uma trilha didática, visualmente sóbria, para iniciantes no IntelliJ com Copilot.

import { Check, ChevronRight, Code2, FileText, Lightbulb, TerminalSquare } from "lucide-react";

// Miniaturas da IDE: representações diretas das telas que a pessoa precisa localizar no IntelliJ.
function IntelliJPrint({ tipo }: { tipo: "plugin" | "arquivo" | "sugestao" | "chat" }) {
  const conteudo = {
    plugin: <><div className="ide-sidebar"><b>Settings</b><span>Appearance</span><span>Editor</span><strong>Plugins</strong><span>Version Control</span></div><div className="ide-main"><div className="ide-search">GitHub Copilot</div><div className="plugin-result"><div className="plugin-mark">GH</div><div><b>GitHub Copilot</b><small>GitHub · Plugin</small></div><button>Install</button></div></div></>,
    arquivo: <><div className="ide-sidebar tree"><b>meu-projeto</b><span>▾ src</span><span>▾ .github</span><strong>copilot-instructions.md</strong><span>pom.xml</span></div><div className="ide-main editor"><small>copilot-instructions.md</small><code><em># Regras do projeto</em><br /><br />- Usar Java 21.<br />- Criar testes JUnit 5.<br />- Não colocar tokens em logs.</code></div></>,
    sugestao: <><div className="ide-sidebar tree"><b>meu-projeto</b><span>▾ src</span><strong>OrderValidator.java</strong></div><div className="ide-main editor"><small>OrderValidator.java</small><code><em>// Validar ID do pedido</em><br />boolean hasValidOrderId(String id) {'{'}<br /><span className="ghost-code">  return id != null && id.matches("\\d+");</span><br />{'}'}</code><div className="tab-hint">Tab para aceitar · Esc para descartar</div></div></>,
    chat: <><div className="ide-sidebar tree"><b>meu-projeto</b><span>▾ src</span><strong>FreightService.java</strong></div><div className="ide-main chat-window"><small>Copilot Chat</small><div className="chat-question">Explique este método e cite os casos de erro.</div><div className="chat-answer">Este método calcula o frete. Teste pedido vazio, CEP inválido e valor negativo.</div><div className="chat-input">Pergunte algo sobre este arquivo...</div></div></>,
  };
  return <div className="ide-print" aria-label="Tela ilustrativa do IntelliJ"><div className="ide-bar"><i /><i /><i /><span>IntelliJ IDEA</span></div><div className="ide-body">{conteudo[tipo]}</div></div>;
}

// Componente principal da página: explica somente Skills, do conceito à primeira configuração.
export default function Home() {
  return (
    <main className="skill-guide">
      <header className="guide-header">
        <a href="#inicio" className="guide-brand" aria-label="Voltar ao início">SKILL<span>GUIDE</span></a>
        <nav aria-label="Navegação da página" className="guide-nav">
          <a href="#conceito">O que é</a>
          <a href="#exemplo">Exemplo</a>
          <a href="#passos">Passo a passo</a>
        </nav>
      </header>

      <section id="inicio" className="guide-hero section-wrap">
        <p className="eyebrow">JAVA + INTELLIJ + GITHUB COPILOT</p>
        <h1>Skills no IntelliJ.<br /><span>Sem complicação.</span></h1>
        <p className="hero-copy">Uma Skill é um pequeno manual que diz à IA <strong>como o seu time prefere trabalhar</strong>. Ela ajuda o Copilot a sugerir código mais parecido com o padrão do projeto.</p>
        <div className="hero-route" aria-label="Roteiro do guia">
          <span><b>1</b> Entender</span><ChevronRight size={16} /><span><b>2</b> Ver um exemplo</span><ChevronRight size={16} /><span><b>3</b> Configurar</span>
        </div>
      </section>

      <section id="conceito" className="section-wrap guide-section intro-grid">
        <div>
          <p className="eyebrow">01 — O QUE É</p>
          <h2>Skill é uma <span>receita</span><br />para a IA.</h2>
          <p className="body-copy">Pense em um novo colega chegando ao time. Antes de pedir código, você explica as regras: versão do Java, como escrever testes e o que nunca deve aparecer nos logs. Uma Skill registra essas regras para você não precisar repeti-las em toda conversa.</p>
        </div>
        <div className="definition-box">
          <FileText size={26} />
          <p className="definition-title">Em uma frase</p>
          <p>Skill é um conjunto reutilizável de instruções para a IA executar uma tarefa do jeito certo.</p>
          <div className="definition-rule"><Check size={16} /> Não é um botão mágico. Você continua revisando o resultado.</div>
        </div>
      </section>

      <section id="exemplo" className="section-wrap guide-section">
        <p className="eyebrow">02 — EXEMPLO BEM SIMPLES</p>
        <h2>Seu time usa Java.<br />O Copilot precisa saber <span>as regras.</span></h2>
        <p className="body-copy wide-copy">Em vez de escrever “faça testes” toda vez, você cria um arquivo de instruções no repositório. Ele serve como uma folha de regras do projeto.</p>
        <div className="example-layout">
          <div className="code-panel">
            <div className="code-panel-top"><span className="code-dot" /><span>.github/copilot-instructions.md</span></div>
            <pre>{`# Regras do nosso projeto

- Usar Java 21.
- Para cada regra nova, criar teste JUnit 5.
- Não colocar senha, token ou dados pessoais em logs.
- Antes de mudar vários arquivos, explicar o plano.`}</pre>
          </div>
          <div className="example-explanation">
            <p className="small-label">O que muda na prática?</p>
            <div className="explanation-line"><span>Você pede:</span><strong>“Crie uma validação para pedido.”</strong></div>
            <div className="explanation-line"><span>A Skill lembra:</span><strong>“Use Java 21, inclua teste e proteja os logs.”</strong></div>
            <div className="example-note"><Lightbulb size={18} /><p>O Copilot sugere. <strong>Você lê, testa e decide.</strong></p></div>
          </div>
        </div>
      </section>

      <section className="section-wrap guide-section java-example">
        <p className="eyebrow">03 — MINI EXEMPLO JAVA</p>
        <h2>Uma instrução clara gera<br />uma sugestão mais <span>útil.</span></h2>
        <div className="java-grid">
          <div className="simple-card">
            <p className="small-label">Você começa assim</p>
            <pre>{`// Retorne true somente se o ID
// tiver números e não estiver vazio.
boolean hasValidOrderId(String id) {`}</pre>
          </div>
          <div className="arrow-separator">→</div>
          <div className="simple-card result-card">
            <p className="small-label">O Copilot pode sugerir</p>
            <pre>{`return id != null
    && !id.isBlank()
    && id.matches("\\d+");`}</pre>
          </div>
        </div>
        <p className="under-copy">A regra é simples: <strong>aceite com Tab apenas se você entende o código.</strong> Se não entender, pergunte primeiro ou descarte com Esc.</p>
      </section>

      <section id="passos" className="section-wrap guide-section steps-section">
        <p className="eyebrow">04 — CONFIGURAR NO INTELLIJ</p>
        <h2>Faça uma vez.<br />Depois use no dia a dia.</h2>
        <p className="body-copy wide-copy">Siga os quatro passos abaixo. Os “prints” mostram exatamente o que procurar; a posição dos menus pode mudar um pouco conforme a versão do IntelliJ.</p>

        <div className="step-list">
          <article className="step-row">
            <div className="step-number">1</div>
            <div className="step-copy"><p className="step-title">Instale e entre no Copilot</p><p>No IntelliJ, abra <strong>Settings &gt; Plugins</strong>. Procure por <strong>GitHub Copilot</strong>, instale o plugin, reinicie a IDE e faça login.</p></div>
            <IntelliJPrint tipo="plugin" />
          </article>
          <article className="step-row">
            <div className="step-number">2</div>
            <div className="step-copy"><p className="step-title">Crie o arquivo de regras</p><p>Na raiz do projeto, crie a pasta <strong>.github</strong> e dentro dela o arquivo <strong>copilot-instructions.md</strong>. Copie as regras simples do exemplo acima.</p></div>
            <IntelliJPrint tipo="arquivo" />
          </article>
          <article className="step-row">
            <div className="step-number">3</div>
            <div className="step-copy"><p className="step-title">Peça uma sugestão pequena</p><p>Em um arquivo Java seguro, escreva um comentário claro e comece um método. O Copilot pode mostrar uma proposta em texto acinzentado.</p></div>
            <IntelliJPrint tipo="sugestao" />
          </article>
          <article className="step-row">
            <div className="step-number">4</div>
            <div className="step-copy"><p className="step-title">Revise antes de aceitar</p><p>Use o chat para pedir uma explicação ou testes. Leia o que mudou, execute os testes e só então aceite a sugestão.</p></div>
            <IntelliJPrint tipo="chat" />
          </article>
        </div>
      </section>

      <section className="section-wrap guide-section try-section">
        <div className="try-copy"><p className="eyebrow">05 — SUA PRIMEIRA PERGUNTA</p><h2>Comece por<br />entender, não por <span>mudar.</span></h2><p className="body-copy">Cole este texto no Copilot Chat depois de selecionar um método Java pequeno.</p></div>
        <div className="prompt-box"><TerminalSquare size={21} /><pre>{`Explique este método para alguém novo no projeto.
Diga qual problema ele resolve, quais são as entradas
importantes e quais casos de erro devo testar.
Não altere nenhum arquivo.`}</pre></div>
      </section>

      <footer className="guide-footer section-wrap"><Code2 size={18} /><p><strong>Resumo:</strong> Skill é um manual curto que ajuda a IA a respeitar o jeito do seu projeto. O Copilot acelera; a responsabilidade continua sendo do time.</p></footer>
    </main>
  );
}
