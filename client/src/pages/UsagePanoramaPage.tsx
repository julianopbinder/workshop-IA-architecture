// Página Panorama de Uso: mostra indicadores atuais com recortes explícitos e fontes clicáveis.
import { ArrowRight, BarChart3, CircleAlert, Gauge, Users } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

// Os valores são mantidos junto aos rótulos para evitar a comparação indevida entre pesquisas diferentes.
const adotacao = [
  { valor: 90, rotulo: "Adoção de IA no trabalho", apoio: "Profissionais de tecnologia — DORA 2025", classe: "accent" },
  { valor: 51, rotulo: "Uso diário por desenvolvedores", apoio: "Desenvolvedores profissionais — Stack Overflow 2025", classe: "blue" },
  { valor: 80, rotulo: "Relataram ganho de produtividade", apoio: "Mais de 80% — DORA 2025", classe: "ink" },
];

const assistentes = [
  { nome: "ChatGPT", valor: 82 },
  { nome: "GitHub Copilot", valor: 68 },
];

const frameworks = [
  { nome: "Ollama", valor: 51 },
  { nome: "LangChain", valor: 33 },
];

// Barra simples e acessível: a largura expressa exatamente o percentual exibido ao lado.
function Barra({ nome, valor }: { nome: string; valor: number }) {
  return <div className="usage-bar-row"><span>{nome}</span><div className="usage-bar-track" role="meter" aria-label={`${nome}: ${valor}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={valor}><i style={{ width: `${valor}%` }} /></div><b>{valor}%</b></div>;
}

export default function UsagePanoramaPage() {
  return (
    <main className="skill-reference usage-panorama-page">
      <LibraryNav ativo="panorama" />

      <section className="usage-hero">
        <div className="page-width usage-hero-grid">
          <div>
            <p className="eyebrow">PANORAMA DE USO · DADOS 2025</p>
            <h1>IA já entrou no fluxo. Agora o desafio é usar <em>com método</em>.</h1>
            <p>Os números mostram adoção alta. Ao mesmo tempo, os próprios desenvolvedores reforçam a necessidade de validação humana, contexto confiável e processos claros.</p>
          </div>
          <aside className="usage-source-card"><BarChart3 aria-hidden="true" /><strong>Dados reais, contexto explícito.</strong><span>Os gráficos indicam a fonte e o público de cada percentual para evitar comparações enganosas.</span></aside>
        </div>
      </section>

      <section className="usage-section usage-adoption-section">
        <div className="page-width">
          <div className="section-lead"><p className="eyebrow">O CENÁRIO GERAL</p><h2>Uso frequente, impacto percebido.</h2><p>Indicadores de pesquisas diferentes, mostrados lado a lado apenas para dar dimensão ao movimento de adoção.</p></div>
          <div className="adoption-grid">
            {adotacao.map((item) => <article key={item.rotulo} className={`adoption-card ${item.classe}`}><Gauge aria-hidden="true" /><strong>{item.valor}<small>%</small></strong><h3>{item.rotulo}</h3><span>{item.apoio}</span></article>)}
          </div>
        </div>
      </section>

      <section className="usage-section usage-bars-section">
        <div className="page-width usage-bars-grid">
          <article className="usage-chart-card"><div className="usage-chart-title"><Users aria-hidden="true" /><div><p>ASSISTENTES PRONTOS</p><h2>Os mais citados</h2></div></div><p className="usage-chart-intro">Entre desenvolvedores que usam ou constroem agentes, estes foram os assistentes citados com mais frequência.</p><div className="usage-bars">{assistentes.map((item) => <Barra key={item.nome} {...item} />)}</div><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Fonte: Stack Overflow Developer Survey 2025 <ArrowRight aria-hidden="true" /></a></article>
          <article className="usage-chart-card"><div className="usage-chart-title"><CircleAlert aria-hidden="true" /><div><p>ORQUESTRAÇÃO DE AGENTES</p><h2>Ferramentas em destaque</h2></div></div><p className="usage-chart-intro">Entre quem constrói agentes, ferramentas abertas aparecem como base para conectar modelos, ferramentas e fluxos.</p><div className="usage-bars">{frameworks.map((item) => <Barra key={item.nome} {...item} />)}</div><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Fonte: Stack Overflow Developer Survey 2025 <ArrowRight aria-hidden="true" /></a></article>
        </div>
      </section>

      <section className="usage-section usage-trust-section">
        <div className="page-width trust-grid">
          <div><p className="eyebrow">O CONTRAPONTO</p><h2>Adotar não significa confiar cegamente.</h2><p>Na pesquisa Stack Overflow 2025, mais desenvolvedores disseram desconfiar da precisão da IA do que confiar nela. Essa é a razão para combinar IA com testes, revisão e fontes internas confiáveis.</p></div>
          <div className="trust-stat"><span>46%</span><p>disseram desconfiar da precisão das respostas de IA.</p><small>Stack Overflow Developer Survey 2025</small></div>
          <div className="trust-stat soft"><span>33%</span><p>disseram confiar na precisão das respostas de IA.</p><small>Stack Overflow Developer Survey 2025</small></div>
        </div>
      </section>

      <section className="usage-section usage-takeaway-section">
        <div className="page-width usage-takeaway"><p className="eyebrow">TRADUÇÃO PARA O TIME</p><h2>O diferencial não é apenas ter IA. É dar a ela <em>padrões, dados e revisão.</em></h2><p>É exatamente onde Skills, MCPs, SubAgentes e RAG entram: ajudam a tornar o uso mais repetível, conectado ao contexto e seguro para o trabalho real.</p><div className="usage-references"><a href="https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/" target="_blank" rel="noreferrer">DORA 2025 · Google</a><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Stack Overflow 2025</a></div></div>
      </section>
    </main>
  );
}
