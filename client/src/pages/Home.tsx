// Página única de Skills: conteúdo técnico organizado em uma leitura editorial e leve.

// URLs permanentes dos prints enviados pelo usuário.
const imagens = {
  estrutura: "/manus-storage/skill-estrutura_3eeae581.png",
  carregamento: "/manus-storage/skill-carregamento_8761a650.png",
};

// Separador reutilizável que cria respiro entre os capítulos do conteúdo.
function Separador({ numero }: { numero: string }) {
  return <div className="separador" aria-hidden="true"><span>{numero}</span><i /></div>;
}

// Página principal com uma única navegação: Skill.
export default function Home() {
  return (
    <main id="inicio" className="pagina-skill">
      <header className="menu-unico">
        <nav aria-label="Menu principal"><a href="#inicio">Skill</a></nav>
      </header>

      <section className="hero-skill largura">
        <p className="sobretitulo">GUIA DE REFERÊNCIA</p>
        <h1>Uma Skill é a<br /><em>receita de trabalho</em><br />de um agente de IA.</h1>
        <p className="introducao">Ela pode ensinar um fluxo para executar uma tarefa específica ou definir um padrão que o agente deve sempre obedecer.</p>
        <blockquote>“Você define tudo que é necessário, passo a passo, para criar o prato que quer repetir.”</blockquote>
      </section>

      <section className="capitulo largura" id="o-que-e">
        <Separador numero="01" />
        <div className="cabecalho-capitulo"><p className="sobretitulo">O QUE É</p><h2>Transforme o que o time sabe em uma <em>habilidade reutilizável.</em></h2></div>
        <div className="duas-colunas texto-grande">
          <p>Uma Skill guarda um jeito de trabalhar que já está bem definido. Em vez de copiar e colar instruções toda vez, você entrega ao agente uma habilidade que ele pode usar quando aquela situação aparecer.</p>
          <div className="caixa-resumo"><strong>Exemplos de conhecimento que viram Skill:</strong><span>um processo de troubleshooting; a construção de uma pipeline; o padrão de um documento PRD; convenções de código; e um processo de code review.</span></div>
        </div>
      </section>

      <section className="capitulo largura" id="tipos">
        <Separador numero="02" />
        <div className="cabecalho-capitulo estreito"><p className="sobretitulo">DOIS TIPOS</p><h2>Uma Skill pode <em>orientar</em> ou <em>executar.</em></h2></div>
        <div className="tipos-grid">
          <article className="tipo-card"><p className="tipo-numero">A</p><h3>Skill de referência</h3><p>Determina convenções, padrões de código, guias de estilo para o time e estruturas de documentação.</p><div className="tipo-exemplo">Exemplo: “Todo documento PRD deve seguir esta estrutura.”</div></article>
          <article className="tipo-card destaque"><p className="tipo-numero">B</p><h3>Skill de tarefa</h3><p>Cria um workflow completo: um passo a passo para concluir uma tarefa específica do começo ao fim.</p><div className="tipo-exemplo">Exemplo: “Execute este roteiro de code review antes de aprovar.”</div></article>
        </div>
      </section>

      <section className="capitulo largura" id="estrutura">
        <Separador numero="03" />
        <div className="cabecalho-capitulo"><p className="sobretitulo">ESTRUTURA</p><h2>A Skill vive em um <em>diretório próprio.</em></h2></div>
        <div className="estrutura-layout">
          <div className="estrutura-texto"><p>O arquivo obrigatório se chama <code>SKILL.md</code>, sempre em maiúsculas. Ele contém os metadados, a descrição e as instruções que definem a habilidade.</p><p>Skills mais complexas podem incluir templates de documentos, modelos de Dockerfile ou Kubernetes, referências detalhadas e scripts que evitam o agente criar tudo do zero.</p><pre>{`skill-name/
├── SKILL.md       # obrigatório
├── scripts/       # opcional: automação
├── references/    # opcional: documentação
└── assets/        # opcional: templates e recursos`}</pre></div>
          <figure className="print-card"><img src={imagens.estrutura} alt="Print com a estrutura de diretórios de uma Skill e o formato do arquivo SKILL.md" /><figcaption>Estrutura mínima: o <code>SKILL.md</code> explica a habilidade; os demais itens aprofundam ou automatizam o trabalho.</figcaption></figure>
        </div>
      </section>

      <section className="capitulo largura" id="carregamento">
        <Separador numero="04" />
        <div className="cabecalho-capitulo"><p className="sobretitulo">COMO FUNCIONA NA PRÁTICA</p><h2>A Skill carrega só quando <em>faz sentido.</em></h2></div>
        <div className="carregamento-layout">
          <figure className="print-card"><img src={imagens.carregamento} alt="Print explicando o carregamento progressivo de uma Skill" /><figcaption>O agente começa com pouco contexto e carrega os detalhes apenas quando aquela habilidade é necessária.</figcaption></figure>
          <div className="passos-carregamento"><article><span>1</span><div><h3>Início</h3><p>O agente lê apenas os metadados: nome e descrição curta da Skill.</p></div></article><article><span>2</span><div><h3>Invocação</h3><p>A Skill pode ser acionada automaticamente, pela descrição, ou manualmente pelo nome.</p></div></article><article><span>3</span><div><h3>Execução</h3><p>Quando necessário, o agente carrega as instruções completas, templates, referências e scripts.</p></div></article></div>
        </div>
      </section>

      <section className="capitulo largura" id="quando-usar">
        <Separador numero="05" />
        <div className="quando-usar"><div><p className="sobretitulo">QUANDO USAR</p><h2>Quando você quer que algo importante <em>aconteça sempre do mesmo jeito.</em></h2></div><div className="lista-usos"><p>Use Skills quando existe um fluxo bem definido que precisa ser reaproveitado.</p><p>Use Skills quando a IA precisa seguir padrões de nomenclatura, estrutura de documentação ou regras de execução.</p><p>Use Skills quando o mesmo time quer compartilhar o mesmo conhecimento entre projetos e agentes.</p></div></div>
        <div className="faixa-final"><p>Criação de deploy no Kubernetes · criação de pipelines · troubleshooting · code review · criação de PRD · padrões de documentos</p></div>
      </section>

      <footer className="rodape largura"><p><strong>Em uma frase:</strong> Skill é uma receita definida pelo seu time para que um agente de IA repita uma tarefa ou siga um padrão com consistência.</p><a href="#inicio">Voltar ao início ↑</a></footer>
    </main>
  );
}
