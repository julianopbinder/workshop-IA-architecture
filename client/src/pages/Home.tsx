// Página de referência sobre Skills: conteúdo completo do usuário, arquitetura de Skills e exemplo Java no IntelliJ.

import { ArrowRight, Check, ChevronRight, Code2, FileText, Layers3, Play, TerminalSquare, X } from "lucide-react";
import { useState } from "react";
import { LibraryNav } from "@/components/LibraryNav";

// Prints enviados pelo usuário e imagens instrucionais preparadas para o tutorial prático.
const imagens = {
  estrutura: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-estrutura-alta-resolucao_03d3620c.png",
  carregamento: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-carregamento-alta-resolucao_ed80a71c.png",
  instalar: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-intellij-install_183c7539.jpg",
  instrucoes: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-intellij-instructions_5aa0c21c.jpg",
  sugestao: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-intellij-suggestion_c2e2cea4.jpg",
  chat: "https://skillspres-gxq6mono.manus.space/manus-storage/copilot-chat-intellij_43e82322.png",
  revisao: "https://skillspres-gxq6mono.manus.space/manus-storage/copilot-revisao-regras-java_a343fbd2.png",
  aceitarRecusar: "https://skillspres-gxq6mono.manus.space/manus-storage/copilot-aceitar-recusar-intellij_aab6cdba.png",
  codigoSimples: "https://skillspres-gxq6mono.manus.space/manus-storage/passo4-codigo-java-simples_8b0ddc63.png",
  validarMd: "https://skillspres-gxq6mono.manus.space/manus-storage/passo5-validar-arquivo-md_dde8d914.png",
  resultadoTestes: "https://skillspres-gxq6mono.manus.space/manus-storage/passo6-resultado-testes-skill_c75f55ad.png",
  orderValidatorPasso4: "https://skillspres-gxq6mono.manus.space/manus-storage/order-validator-passo4_ee2121e7.png",
  orderValidatorPasso5: "https://skillspres-gxq6mono.manus.space/manus-storage/order-validator-passo5-validar-md_5daf6bfa.png",
  orderValidatorPasso6: "https://skillspres-gxq6mono.manus.space/manus-storage/order-validator-passo6-testes_dbb0586f.png",
  novoProjetoJava: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-java-passo2-novo-projeto_80457389.png",
  estruturaJavaSimple: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-java-passo3-estrutura-skill_e332b6b6.png",
  skillJavaSimple: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-java-passo4-skill-md_cd1a03d3.png",
  pessoaJava: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-java-passo5-pessoa-java_9c2cd604.png",
  pessoaTest: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-java-passo6-pessoa-test_48bacc10.png",
  analiseCopilot: "https://skillspres-gxq6mono.manus.space/manus-storage/skill-java-passo6-teste-copilot_db670b7c.png",
};

// Identificador de capítulo para manter o conteúdo longo fácil de percorrer.
function Identificador({ numero, titulo }: { numero: string; titulo: string }) {
  return <div className="identificador"><span>{numero}</span><i /><p>{titulo}</p></div>;
}

// Card de imagem com legenda para os prints e telas instrucionais.
function Figura({ src, alt, legenda }: { src: string; alt: string; legenda: string }) {
  const [aberta, setAberta] = useState(false);
  return <><figure className="figura"><button type="button" onClick={() => setAberta(true)} className="figura-button" aria-label={`Ampliar: ${alt}`}><img src={src} alt={alt} loading="lazy" /><span>Ampliar imagem ↗</span></button><figcaption>{legenda}</figcaption></figure>{aberta && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada" onClick={() => setAberta(false)}><button type="button" className="lightbox-close" aria-label="Fechar imagem ampliada" onClick={() => setAberta(false)}><X size={20} /></button><img src={src} alt={alt} onClick={(event) => event.stopPropagation()} /></div>}</>;
}

// Página principal com conteúdo conceitual completo e tutorial prático ao final.
export default function Home() {
  return (
    <main id="inicio" className="skill-reference">
      <LibraryNav ativo="skill" />

      <section className="hero page-width">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">BIBLIOTECA DE CONHECIMENTO · SKILL</p>
            <h1>Uma habilidade<br />reutilizável para<br /><em>um agente de IA.</em></h1>
            <p className="hero-text">Skill é uma habilidade que você entrega para um agente de IA: um fluxo para executar uma tarefa específica ou a definição de um padrão que o agente deve sempre obedecer.</p>
            <a className="button-link" href="#conceito">Entender o conceito <ArrowRight size={16} /></a>
          </div>
          <aside className="recipe-card"><div className="recipe-icon"><Layers3 size={21} /></div><p className="recipe-label">A METÁFORA</p><h2>Uma Skill é como uma <em>receita.</em></h2><p>Você define tudo que é necessário, passo a passo, para criar um “prato” que deseja repetir com consistência.</p><div className="recipe-steps"><span>Ingredientes</span><ChevronRight size={15} /><span>Passos</span><ChevronRight size={15} /><span>Resultado</span></div></aside>
        </div>
      </section>

      <section id="conceito" className="chapter page-width">
        <Identificador numero="01" titulo="O que é uma Skill" />
        <div className="chapter-heading"><h2>Você transforma o que o time já sabe em uma <em>habilidade que a IA pode repetir.</em></h2><p>Processo de troubleshooting, definições para construir uma pipeline, estrutura padrão de um documento PRD: tudo isso pode se transformar em uma Skill.</p></div>
        <div className="concept-cards"><article><FileText size={21} /><h3>Fluxo</h3><p>Um passo a passo completo para executar uma tarefa específica.</p></article><article><Code2 size={21} /><h3>Padrão</h3><p>Regras que o agente deve sempre obedecer, como nomenclatura e convenções.</p></article><article><Check size={21} /><h3>Reuso</h3><p>O mesmo conhecimento pode ser compartilhado pelo time, projeto e agente.</p></article></div>
      </section>

      <section id="tipos" className="chapter chapter-soft">
        <div className="page-width"><Identificador numero="02" titulo="Dois tipos diferentes de Skill" />
          <div className="chapter-heading compact"><h2>Uma Skill pode ser de <em>referência</em> ou de <em>tarefa.</em></h2></div>
          <div className="types-grid"><article className="type-card"><p className="card-index">01</p><h3>Skill de referência</h3><p>Serve para determinar convenções, padrões de código, guias de estilo para seu time e estruturas de documentação.</p><div className="example-line"><b>Exemplos</b><span>padrões de nomenclatura, regras de logs, estrutura de PRD e formato de documentação.</span></div></article><article className="type-card accent"><p className="card-index">02</p><h3>Skill de tarefa</h3><p>Cria um workflow: um passo a passo completo para concluir uma tarefa específica.</p><div className="example-line"><b>Exemplos</b><span>code review, troubleshooting de Kubernetes, criação de pipeline e criação de documento.</span></div></article></div>
        </div>
      </section>

      <section id="estrutura" className="chapter page-width">
        <Identificador numero="03" titulo="Estrutura de uma Skill" />
        <div className="chapter-heading"><h2>Uma Skill tem seu próprio <em>diretório de trabalho.</em></h2><p>Esse diretório concentra a descrição dos metadados, as instruções da habilidade, as regras e as referências que aquela Skill deve seguir.</p></div>
        <div className="structure-grid"><div className="structure-copy"><p>O arquivo obrigatório é <code>SKILL.md</code>, com o nome em maiúsculas. É nele que ficam o nome, a descrição e as instruções para o agente.</p><pre>{`skill-name/
├── SKILL.md       # obrigatório
├── scripts/       # código executável
├── references/    # documentação adicional
└── assets/        # templates e recursos estáticos`}</pre><div className="detail-list"><p><strong>Assets e templates.</strong> Uma Skill pode ter templates de documentos, Dockerfile, manifestos Kubernetes e outros recursos para manter sempre o mesmo padrão.</p><p><strong>Detalhamento de tarefas.</strong> Se o processo for complexo, deixe o fluxo geral no arquivo principal e crie outros arquivos Markdown com cada passo aprofundado.</p><p><strong>Scripts.</strong> Eles evitam que o agente recrie tudo do zero: quando apropriado, ele executa a automação já definida.</p></div></div><Figura src={imagens.estrutura} alt="Estrutura enviada pelo usuário com uma Skill e o formato de SKILL.md" legenda="Estrutura de diretório e formato do arquivo SKILL.md." /></div>
      </section>

      <section id="carregamento" className="chapter chapter-soft">
        <div className="page-width"><Identificador numero="04" titulo="Como funciona na prática" />
          <div className="chapter-heading"><h2>O agente não precisa carregar a Skill inteira <em>logo no início.</em></h2><p>Isso mantém o contexto mais leve e traz o detalhamento apenas quando aquela habilidade realmente é necessária.</p></div>
          <div className="loading-grid"><Figura src={imagens.carregamento} alt="Print enviado pelo usuário explicando o carregamento progressivo de Skills" legenda="Print: Skills carregam de forma progressiva, conforme a tarefa exige." /><div className="loading-copy"><article><span>1</span><div><h3>O agente inicia</h3><p>No arquivo Markdown, nome e descrição ficam no <em>frontmatter</em>. São esses metadados que o agente lê primeiro.</p></div></article><article><span>2</span><div><h3>A Skill é encontrada</h3><p>A descrição informa exatamente o que a Skill faz e como acioná-la. Ela pode ser acionada automaticamente ou pelo nome, como “carregar Skill de Kubernetes”.</p></div></article><article><span>3</span><div><h3>O conteúdo completo é usado</h3><p>Se for necessário, o agente carrega as instruções, templates, referências e scripts. Em uma Skill de Kubernetes, por exemplo, a criação de manifesto pode acionar a habilidade certa.</p></div></article></div></div>
        </div>
      </section>

      <section id="quando-usar" className="chapter page-width">
        <Identificador numero="05" titulo="Quando uma Skill vale a pena" />
        <div className="when-grid"><div><h2>Quando há um fluxo bem definido e você quer <em>reaproveitar.</em></h2></div><div><p>Em vez de copiar e colar comandos, crie uma Skill. Ela é boa quando você quer que a IA siga sempre um padrão de nomenclatura, uma estrutura de documentação ou um fluxo de execução.</p><p>Você pode adicionar a Skill ao projeto, compartilhar a mesma habilidade entre pessoas do time e carregá-la no agente que estiver usando.</p><div className="use-cases"><span>Deploy Kubernetes</span><span>Pipeline corporativa</span><span>Troubleshooting</span><span>Code review</span><span>Documento PRD</span></div></div></div>
      </section>

      <section id="java" className="java-section">
        <div className="page-width"><Identificador numero="06" titulo="Exemplo simples: Java + IntelliJ + Copilot" />
          <div className="chapter-heading"><h2>Crie uma Skill e peça ao Copilot para <em>analisar seu código por ela.</em></h2><p>Vamos criar um projeto Java, uma Skill mínima, uma classe <code>Pessoa</code>, dois testes JUnit 5 e uma pergunta objetiva para o Copilot.</p></div>
          <div className="walkthrough">
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 01</p><h3>Instale e entre no Copilot</h3><p>No IntelliJ, abra <strong>Settings &gt; Plugins</strong>, pesquise por GitHub Copilot, instale o plugin e faça login.</p></div>
              <Figura src={imagens.instalar} alt="Imagem instrucional mostrando o plugin GitHub Copilot no IntelliJ" legenda="No IntelliJ: Settings → Plugins → GitHub Copilot." />
            </article>
            <article className="walk-step flipped">
              <div className="step-text"><p className="step-number">PASSO 02</p><h3>Crie um projeto Java</h3><div className="beginner-steps"><p><b>1.</b> Clique em <strong>File → New → Project</strong>.</p><p><b>2.</b> Escolha <strong>Java</strong>.</p><p><b>3.</b> Selecione <strong>JDK 21</strong>.</p><p><b>4.</b> No nome, escreva <code>skill-java-demo</code> e clique em <strong>Create</strong>.</p></div><p>Depois de criado, você terá uma estrutura inicial como esta:</p><pre>{`skill-java-demo/
└── src/
    └── Main.java`}</pre></div>
              <Figura src={imagens.novoProjetoJava} alt="Print do IntelliJ para criar um projeto Java com JDK 21 e nome skill-java-demo" legenda="Passo 02: escolha Java, JDK 21, escreva skill-java-demo e clique em Create." />
            </article>
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 03</p><h3>Crie a estrutura da Skill</h3><p>Na <strong>raiz do projeto</strong> — a pasta principal chamada <code>skill-java-demo</code> — crie as pastas e o arquivo abaixo. O ponto principal do teste é <code>SKILL.md</code>.</p><pre>{`skill-java-demo/
├── .github/
│   └── skills/
│       └── java-simple/
│           └── SKILL.md
│
└── src/
    └── Main.java`}</pre></div>
              <Figura src={imagens.estruturaJavaSimple} alt="Print do IntelliJ mostrando a estrutura .github skills java-simple SKILL.md dentro do projeto" legenda="Passo 03: crie .github/skills/java-simple/SKILL.md na raiz do projeto." />
            </article>
            <article className="walk-step flipped">
              <div className="step-text"><p className="step-number">PASSO 04</p><h3>Escreva a Skill mínima</h3><p>Abra <code>SKILL.md</code> e cole este conteúdo. Estas são as quatro regras que o Copilot deverá usar na análise.</p><div className="skill-code compact-skill-code"><div className="code-caption"><span /><p>.github/skills/java-simple/SKILL.md</p></div><pre>{`---
name: java-simple
description: Regras simples para desenvolvimento Java
---

# Java Simple Skill

Ao criar ou alterar código Java:

1. Usar Java 21.
2. Manter métodos pequenos.
3. Não registrar dados pessoais em logs.
4. Criar testes JUnit 5 para novas regras.`}</pre></div><p>Salve o arquivo. Agora você tem uma Skill mínima.</p></div>
              <Figura src={imagens.skillJavaSimple} alt="Print do IntelliJ mostrando o arquivo SKILL.md com quatro regras simples para Java" legenda="Passo 04: salve o SKILL.md com as quatro regras de desenvolvimento Java." />
            </article>
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 05</p><h3>Crie a classe <code>Pessoa.java</code></h3><p>Dentro de <code>src</code>, crie o arquivo <code>Pessoa.java</code> e cole o código abaixo.</p><pre>{`public class Pessoa {

    private final String nome;
    private final int idade;

    public Pessoa(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }

    public boolean ehMaiorDeIdade() {
        return idade >= 18;
    }

    public boolean nomeValido() {
        return nome != null && !nome.isBlank();
    }
}`}</pre></div>
              <Figura src={imagens.pessoaJava} alt="Print do IntelliJ mostrando a classe Pessoa.java com nome, idade e duas validações" legenda="Passo 05: Pessoa.java é o código que o Copilot vai analisar pela Skill." />
            </article>
            <article className="walk-step flipped">
              <div className="step-text"><p className="step-number">PASSO 06</p><h3>Crie o teste <code>PessoaTest.java</code></h3><p>Dentro de <code>src</code>, crie <code>PessoaTest.java</code>. Para este exemplo compilar, o projeto precisa estar com <strong>JUnit 5</strong> configurado.</p><pre>{`import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class PessoaTest {

    @Test
    void deveSerMaiorDeIdade() {
        Pessoa pessoa = new Pessoa("João", 18);

        assertTrue(pessoa.ehMaiorDeIdade());
    }

    @Test
    void deveValidarNome() {
        Pessoa pessoa = new Pessoa("João", 20);

        assertTrue(pessoa.nomeValido());
    }
}`}</pre></div>
              <Figura src={imagens.pessoaTest} alt="Print do IntelliJ mostrando PessoaTest.java com dois testes JUnit 5" legenda="Passo 06: crie os dois testes para confirmar as regras da classe Pessoa." />
            </article>
            <article className="walk-step">
              <div className="step-text"><p className="step-number">PASSO 07</p><h3>Peça a análise da Skill no Copilot Chat</h3><p>Abra o Copilot Chat e envie exatamente este pedido. Ele pede uma análise; portanto, o Copilot <strong>não deve alterar nenhum arquivo</strong>.</p><div className="prompt-card real-review-prompt"><TerminalSquare size={22} /><p className="prompt-label">PROMPT PARA COPIAR NO COPILOT CHAT</p><pre>{`Leia a Skill .github/skills/java-simple/SKILL.md.

Analise Pessoa.java e PessoaTest.java.

Verifique se o código atende todas as regras da Skill.

Não altere nenhum arquivo.

Para cada regra informe:
- Regra
- ATENDIDA ou NÃO ATENDIDA
- Evidência encontrada no código

No final informe:
Regras atendidas: X/4
Regras não atendidas: X/4
Testes adequados: SIM ou NÃO`}</pre></div><p>O resultado esperado é uma análise baseada nas quatro regras do <code>SKILL.md</code>, com evidências em <code>Pessoa.java</code> e <code>PessoaTest.java</code>.</p></div>
              <Figura src={imagens.analiseCopilot} alt="Print do IntelliJ mostrando PessoaTest.java e o Copilot Chat analisando a Skill java-simple" legenda="Passo 07: o Copilot compara Pessoa.java e PessoaTest.java com as regras da Skill e mostra o resultado." />
            </article>
          </div>
          <div className="java-footer"><Play size={18} /><p><strong>Resultado esperado:</strong> o Copilot informa, para cada regra, se ela está atendida ou não, mostra uma evidência e fecha com o resumo das quatro regras e dos testes.</p></div>
        </div>
      </section>

      <footer className="footer page-width"><p><strong>Resumo:</strong> Skill é uma receita do time para que o agente repita uma tarefa ou siga um padrão com consistência.</p><a href="#inicio">Voltar ao topo ↑</a></footer>
    </main>
  );
}
