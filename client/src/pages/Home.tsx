// Página de referência sobre Skills: conteúdo completo do usuário, arquitetura de Skills e exemplo Java no IntelliJ.

import { ArrowRight, Check, ChevronRight, Code2, FileText, Layers3, Play, TerminalSquare, X } from "lucide-react";
import { useState } from "react";
import { LibraryNav } from "@/components/LibraryNav";

// Prints enviados pelo usuário e imagens instrucionais preparadas para o tutorial prático.
const imagens = {
  estrutura: "/manus-storage/skill-estrutura-alta-resolucao_03d3620c.png",
  carregamento: "/manus-storage/skill-carregamento-alta-resolucao_ed80a71c.png",
  instalar: "/manus-storage/skill-intellij-install_183c7539.jpg",
  instrucoes: "/manus-storage/skill-intellij-instructions_5aa0c21c.jpg",
  sugestao: "/manus-storage/skill-intellij-suggestion_c2e2cea4.jpg",
  chat: "/manus-storage/copilot-chat-intellij_43e82322.png",
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
└── assets/        # templates e recursos estáticos`}</pre><div className="detail-list"><p><strong>Assets e templates.</strong> Uma Skill pode ter templates de documentos, Dockerfile, manifestos Kubernetes e outros recursos para manter sempre o mesmo padrão.</p><p><strong>Detalhamento de tarefas.</strong> Se o processo for complexo, deixe o fluxo geral no arquivo principal e crie outros arquivos Markdown com cada passo aprofundado.</p><p><strong>Scripts.</strong> Eles evitam que o agente recrie tudo do zero: quando apropriado, ele executa a automação já definida.</p></div></div><Figura src={imagens.estrutura} alt="Print enviado pelo usuário com a estrutura de uma Skill e o formato de SKILL.md" legenda="Print: estrutura de diretório e formato do arquivo SKILL.md." /></div>
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
          <div className="chapter-heading"><h2>Uma Skill para revisar uma <em>validação de pedido.</em></h2><p>Este é um exemplo pequeno, do problema até o teste. No IntelliJ, as regras podem ser espelhadas em instruções do repositório para orientar o GitHub Copilot.</p></div>
          <div className="skill-code"><div className="code-caption"><span /><p>java-api-review · SKILL.md</p></div><pre>{`---
name: java-api-review
description: Use esta Skill ao criar ou revisar validações de endpoints Java.
---

# Regras
1. Use Java 21 e mantenha métodos pequenos.
2. Crie ou atualize testes JUnit 5 para cada regra nova.
3. Não registre tokens, senhas ou dados pessoais em logs.
4. Antes de editar vários arquivos, explique o plano e os riscos.`}</pre></div>
          <div className="walkthrough"><article className="walk-step"><div className="step-text"><p className="step-number">PASSO 01</p><h3>Instale e entre no Copilot</h3><p>No IntelliJ, abra <strong>Settings &gt; Plugins</strong>, pesquise por GitHub Copilot, instale o plugin e faça login.</p></div><Figura src={imagens.instalar} alt="Imagem instrucional mostrando o plugin GitHub Copilot no IntelliJ" legenda="No IntelliJ: Settings → Plugins → GitHub Copilot." /></article><article className="walk-step flipped"><div className="step-text"><p className="step-number">PASSO 02</p><h3>Registre as regras do projeto</h3><p>Para o Copilot no IntelliJ, crie <code>.github/copilot-instructions.md</code> e copie as regras da Skill. Plataformas com suporte a Skills usam o diretório com <code>SKILL.md</code>.</p></div><Figura src={imagens.instrucoes} alt="Imagem instrucional mostrando o arquivo de instruções do repositório" legenda="No repositório: .github/copilot-instructions.md." /></article><article className="walk-step no-image"><div className="step-text"><p className="step-number">PASSO 03</p><h3>Crie a pasta dentro do seu projeto</h3><p>Não crie essa pasta solta na Área de Trabalho do Windows. Primeiro, abra o seu projeto Java no IntelliJ. A pasta da Skill fica na <strong>pasta principal do projeto</strong>: o mesmo lugar onde normalmente aparece o arquivo <code>pom.xml</code> ou <code>build.gradle</code>.</p><div className="beginner-steps"><p><b>1.</b> No painel <strong>Project</strong>, à esquerda do IntelliJ, clique com o botão direito no nome do seu projeto.</p><p><b>2.</b> Escolha <strong>New → Directory</strong> e crie a pasta <code>skills</code>.</p><p><b>3.</b> Dentro de <code>skills</code>, crie outra pasta chamada <code>java-api-review</code>.</p><p><b>4.</b> Dentro dela, escolha <strong>New → File</strong> e crie o arquivo <code>SKILL.md</code>.</p></div><p>Se preferir usar o Explorador de Arquivos do Windows, abra a pasta do seu projeto e repita exatamente a mesma estrutura. Depois, volte ao IntelliJ: ela aparecerá automaticamente.</p></div><div className="prompt-card folder-card"><TerminalSquare size={22} /><p className="prompt-label">O RESULTADO DEVE FICAR ASSIM</p><pre>{`meu-projeto-java/  ← projeto aberto no IntelliJ
├── pom.xml
└── skills/
    └── java-api-review/
        └── SKILL.md`}</pre></div></article><article className="walk-step"><div className="step-text"><p className="step-number">PASSO 04</p><h3>Abra o agente: o Copilot Chat</h3><p><strong>Agente</strong> é a área em que você conversa com a IA. No IntelliJ, essa área é o <strong>GitHub Copilot Chat</strong>, visível no lado direito deste print.</p><div className="agent-guide"><p className="agent-guide-label">PRINT GUIADO · NO INTELLIJ</p><p><b>1.</b> Abra <strong>View → Tool Windows → GitHub Copilot Chat</strong>.</p><p><b>2.</b> O painel <strong>GitHub Copilot Chat</strong> aparece no lado direito.</p><p><b>3.</b> Escreva sua pergunta na caixa inferior e clique na seta para enviar.</p></div><p>Em um agente que suporta Skills nativamente, a mensagem seria:</p><div className="skill-call"><p>Use a Skill <strong>java-api-review</strong> para revisar a validação de pedido e propor testes.</p></div><div className="execution-flow"><span>Agente reconhece a tarefa</span><i>→</i><span>Abre <code>SKILL.md</code></span><i>→</i><span>Segue as regras e propõe os testes</span></div><p>No Copilot do IntelliJ, as regras equivalentes ficam no arquivo <code>.github/copilot-instructions.md</code> do passo 02.</p></div><Figura src={imagens.chat} alt="Print do IntelliJ com o painel GitHub Copilot Chat aberto no lado direito" legenda="Print guiado: o painel à direita é o Copilot Chat. A caixa inferior é onde você escreve o pedido e envia para a IA." /></article><article className="walk-step flipped"><div className="step-text"><p className="step-number">PASSO 05</p><h3>Peça a revisão usando as regras do projeto</h3><p>Salve primeiro o arquivo <code>.github/copilot-instructions.md</code>. Com as instruções do espaço de trabalho configuradas, abra o Chat e envie o pedido abaixo. Ele faz a IA revisar o método <strong>conforme as regras do arquivo</strong>, sem alterar nada ainda.</p><div className="practice-code"><p className="prompt-label">CÓDIGO A SER REVISADO</p><pre>{`public boolean hasValidOrderId(String orderId) {
    return orderId != null
        && !orderId.isBlank()
        && orderId.matches("\\d+");
}`}</pre></div><div className="prompt-card real-review-prompt"><TerminalSquare size={22} /><p className="prompt-label">COLE NO COPILOT CHAT</p><pre>{`Revise o método hasValidOrderId conforme as instruções
deste projeto. Não altere arquivos.

Responda em três partes:
1. Quais regras do projeto você aplicou;
2. O que este método atende ou não atende;
3. Quais testes JUnit 5 ainda são necessários.`}</pre></div><p className="instructions-confirmation"><Check size={16} /><span>O arquivo de instruções é a receita; esta pergunta pede ao Copilot que mostre como aplicou a receita no código.</span></p></div><Figura src={imagens.instrucoes} alt="Print mostrando o arquivo copilot-instructions.md aberto dentro do projeto no IntelliJ" legenda="Antes de enviar a pergunta, confirme que o arquivo copilot-instructions.md está salvo dentro da pasta .github do projeto." /></article><article className="walk-step flipped no-image"><div className="step-text"><p className="step-number">PASSO 06</p><h3>Valide a resposta antes de aceitar</h3><p>O Copilot ajuda a revisar, mas a decisão é sua. Compare a resposta com as regras do arquivo e confira se ela encontrou os pontos essenciais abaixo.</p><div className="validation-lane"><p><b>1.</b><span><strong>Método pequeno:</strong> a resposta deve dizer se o método continua simples e fácil de ler.</span></p><p><b>2.</b><span><strong>Testes JUnit 5:</strong> como não há testes no exemplo, a resposta deve pedir testes para valor nulo, vazio, letras e somente números.</span></p><p><b>3.</b><span><strong>Dados sensíveis:</strong> a resposta deve confirmar que o método não registra o identificador do pedido em logs.</span></p></div><div className="review-check"><Check size={17} /><span>Se a resposta não citar as regras ou não apontar os testes que faltam, não aceite automaticamente: peça que ela revise de novo usando o arquivo de instruções do projeto.</span></div></div><div className="prompt-card"><TerminalSquare size={22} /><p className="prompt-label">RESULTADO QUE VOCÊ PROCURA</p><pre>{`✅ Método pequeno e legível.
⚠️ Faltam testes JUnit 5 para os quatro casos.
✅ Nenhum dado do pedido é enviado para logs.`}</pre></div></article></div>
          <div className="java-footer"><Play size={18} /><p><strong>Resultado esperado:</strong> o Copilot não decide por você. Ele trabalha com mais contexto e segue melhor o padrão que o seu time definiu.</p></div>
        </div>
      </section>

      <footer className="footer page-width"><p><strong>Resumo:</strong> Skill é uma receita do time para que o agente repita uma tarefa ou siga um padrão com consistência.</p><a href="#inicio">Voltar ao topo ↑</a></footer>
    </main>
  );
}
