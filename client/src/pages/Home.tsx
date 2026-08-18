// Guia de Skills: página única, direta e didática para iniciantes.

import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCode2,
  Lightbulb,
  ListChecks,
  Sparkles,
} from "lucide-react";

// Imagens instrucionais hospedadas fora do projeto, usadas em tamanho grande no tutorial.
const imagensIntelliJ = {
  instalar: "/manus-storage/skill-intellij-install_183c7539.jpg",
  regras: "/manus-storage/skill-intellij-instructions_5aa0c21c.jpg",
  sugestao: "/manus-storage/skill-intellij-suggestion_c2e2cea4.jpg",
};

// Seção de navegação do topo: aponta sempre para as quatro perguntas essenciais do guia.
function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Ir ao início do guia">skill<span>.</span></a>
      <nav className="topnav" aria-label="Navegação principal">
        <a href="#o-que-e">O que é</a>
        <a href="#onde-usar">Onde usar</a>
        <a href="#exemplo">Exemplo</a>
        <a href="#intellij">No IntelliJ</a>
      </nav>
      <a className="top-action" href="#intellij">Ver passo a passo <ArrowDown size={15} /></a>
    </header>
  );
}

// Cartão que traduz Skill para uma comparação simples e visual.
function ComparacaoSkill() {
  return (
    <div className="comparison-card">
      <div className="comparison-title"><Sparkles size={17} /> Quando você repete uma orientação...</div>
      <div className="comparison-row faded"><span>Você escreve:</span><p>“Use Java 21, crie testes e não exponha dados em logs.”</p></div>
      <div className="comparison-arrow"><ArrowDown size={18} /></div>
      <div className="comparison-row active"><span>Você cria uma Skill:</span><p>“Essas regras ficam registradas e são reutilizadas pela IA.”</p></div>
    </div>
  );
}

// Etapa visual do tutorial no IntelliJ; cada bloco tem uma única ação e uma imagem grande.
function PassoIntelliJ({ numero, titulo, texto, imagem, alt, children }: { numero: string; titulo: string; texto: string; imagem: string; alt: string; children?: React.ReactNode }) {
  return (
    <article className="tutorial-step">
      <div className="tutorial-info">
        <p className="step-kicker">PASSO {numero}</p>
        <h3>{titulo}</h3>
        <p>{texto}</p>
        {children}
      </div>
      <figure className="tutorial-image">
        <img src={imagem} alt={alt} loading="lazy" />
        <figcaption>Imagem ilustrativa. Menus e posições podem variar um pouco conforme a versão do IntelliJ.</figcaption>
      </figure>
    </article>
  );
}

// Página principal: conduz da definição até a primeira aplicação segura no IntelliJ.
export default function Home() {
  return (
    <main className="skills-page">
      <Header />

      <div className="mission-rail content-width" aria-label="Progresso do guia">
        <span className="rail-label">ROTA DE APRENDIZAGEM</span>
        <div className="rail-line" aria-hidden="true"><i /><i /><i /><i /></div>
        <span className="rail-state">04 ETAPAS</span>
      </div>

      <section id="inicio" className="hero content-width">
        <div className="hero-copy">
          <p className="eyebrow">GUIA PARA INICIANTES</p>
          <h1>Skills são o<br /><span>manual de trabalho</span><br />da IA.</h1>
          <p className="lead">Elas ajudam a IA a repetir uma tarefa seguindo as regras do seu time. Você dá a direção. A IA propõe. <strong>Você continua decidindo.</strong></p>
          <a className="primary-link" href="#o-que-e">Começar do básico <ArrowRight size={17} /></a>
        </div>
        <div className="hero-side"><ComparacaoSkill /></div>
      </section>

      <section id="o-que-e" className="content-width section definition-section">
        <div className="section-heading">
          <p className="eyebrow">01 — O QUE É SKILL?</p>
          <h2>É uma <span>receita reutilizável.</span></h2>
        </div>
        <div className="definition-grid">
          <p className="definition-main">Imagine que uma pessoa nova entrou no seu time. Você explica como escrever código, como testar e quais erros não pode cometer. Uma Skill registra essas orientações para a IA.</p>
          <div className="definition-box">
            <FileCode2 size={25} />
            <p><strong>Skill não é uma pergunta solta.</strong> É um conjunto de instruções que você pode reutilizar sempre que precisar daquela tarefa.</p>
          </div>
        </div>
        <div className="not-this">
          <span>Não confunda:</span>
          <p><strong>Prompt</strong> é um pedido pontual. <strong>Skill</strong> é uma regra que você quer manter e usar muitas vezes.</p>
        </div>
      </section>

      <section id="onde-usar" className="section usage-section">
        <div className="content-width">
          <div className="section-heading">
            <p className="eyebrow">02 — ONDE USAR</p>
            <h2>Use quando o time<br />quer <span>repetir bem.</span></h2>
          </div>
          <div className="usage-grid">
            <article className="usage-card"><span className="usage-number">01</span><Code2 size={24} /><h3>Manter um padrão de código</h3><p>Exemplo: “Use Java 21, nomes claros e serviços pequenos.”</p></article>
            <article className="usage-card"><span className="usage-number">02</span><ListChecks size={24} /><h3>Lembrar testes e segurança</h3><p>Exemplo: “Toda regra nova precisa de teste JUnit e nunca deve registrar dados sensíveis.”</p></article>
            <article className="usage-card"><span className="usage-number">03</span><Lightbulb size={24} /><h3>Guiar tarefas repetidas</h3><p>Exemplo: “Antes de mudar vários arquivos, explique o plano e os riscos.”</p></article>
          </div>
        </div>
      </section>

      <section id="exemplo" className="content-width section example-section">
        <div className="section-heading">
          <p className="eyebrow">03 — EXEMPLO PRÁTICO</p>
          <h2>Uma regra simples.<br /><span>Uma resposta melhor.</span></h2>
        </div>
        <div className="example-grid">
          <div className="request-box"><p className="small-label">VOCÊ PEDE À IA</p><p>“Crie uma validação para o código de um pedido.”</p></div>
          <div className="example-arrow"><ArrowRight size={21} /></div>
          <div className="skill-box"><p className="small-label">A SKILL JÁ LEMBRA</p><ul><li><CheckCircle2 size={15} /> Usar Java 21</li><li><CheckCircle2 size={15} /> Criar teste JUnit</li><li><CheckCircle2 size={15} /> Não expor dados nos logs</li></ul></div>
        </div>
        <div className="code-example">
          <div className="code-top"><span className="code-light" /> Exemplo de regra no projeto</div>
          <pre>{`# Regras do projeto

- Use Java 21.
- Para cada regra nova, crie ou atualize um teste JUnit 5.
- Nunca coloque senhas, tokens ou dados pessoais em logs.
- Antes de alterar vários arquivos, explique o plano.`}</pre>
        </div>
        <p className="plain-note"><strong>O resultado:</strong> você não precisa repetir as mesmas preferências em todas as conversas. Mesmo assim, revise o código e execute os testes antes de aceitar uma alteração.</p>
      </section>

      <section id="intellij" className="section intellij-section">
        <div className="content-width">
          <div className="section-heading tutorial-heading">
            <p className="eyebrow">04 — EXEMPLO NO INTELLIJ</p>
            <h2>Como aplicar a ideia<br />na sua <span>IDE.</span></h2>
            <p>O GitHub Copilot no IntelliJ usa **instruções do repositório**. Elas são a forma mais simples de colocar o conceito de Skill em prática no seu projeto.</p>
          </div>

          <PassoIntelliJ
            numero="1"
            titulo="Instale e entre no GitHub Copilot"
            texto="No IntelliJ, abra Settings > Plugins. Busque por GitHub Copilot, instale o plugin, reinicie a IDE e faça login."
            imagem={imagensIntelliJ.instalar}
            alt="Tela ilustrativa mostrando instalação e login do GitHub Copilot no IntelliJ"
          />

          <PassoIntelliJ
            numero="2"
            titulo="Crie o manual do projeto"
            texto="Na raiz do seu projeto, crie a pasta .github. Dentro dela, crie o arquivo copilot-instructions.md. É nele que você registra as regras que o time quer repetir."
            imagem={imagensIntelliJ.regras}
            alt="Tela ilustrativa mostrando o arquivo copilot-instructions.md com regras do projeto"
          >
              <div className="path-chip">.github/copilot-instructions.md</div>
          </PassoIntelliJ>

          <PassoIntelliJ
            numero="3"
            titulo="Peça algo pequeno e revise"
            texto="Escreva um comentário claro em um arquivo Java e comece um método. O Copilot pode sugerir o restante. Leia a proposta; use Tab somente se entender e testar o código."
            imagem={imagensIntelliJ.sugestao}
            alt="Tela ilustrativa mostrando uma sugestão de código Java dentro do IntelliJ"
          >
            <div className="review-rule"><CheckCircle2 size={16} /> A regra final é sua: a IA acelera, mas não substitui sua revisão.</div>
          </PassoIntelliJ>

          <div className="source-line">Baseado na documentação oficial do GitHub Copilot para instruções de repositório e IDEs JetBrains. <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide" target="_blank" rel="noreferrer">Abrir referência oficial ↗</a></div>
        </div>
      </section>

      <footer className="content-width footer">
        <p><strong>Em uma frase:</strong> Skill é o manual que ensina a IA a trabalhar de um jeito que faz sentido para o seu time.</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </main>
  );
}
