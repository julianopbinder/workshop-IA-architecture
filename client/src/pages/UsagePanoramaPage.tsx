// Dashboard executivo: separa métricas corporativas verificáveis de orientações de arquitetura.
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleAlert,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";

const kpis = [
  { value: "78", suffix: "%", label: "empresas usam IA em ao menos uma função", source: "McKinsey 2025", tone: "coral" },
  { value: "51", suffix: "%", label: "desenvolvedores profissionais usam IA diariamente", source: "Stack Overflow 2025", tone: "blue" },
  { value: "21", suffix: "%", label: "redesenharam pelo menos um fluxo de trabalho", source: "McKinsey 2025", tone: "green" },
  { value: "46", suffix: "%", label: "desconfiam da precisão das respostas de IA", source: "Stack Overflow 2025", tone: "amber" },
];

const tarefas = [
  { name: "Geração de código", mentions: "600+", width: 100, note: "menções qualitativas" },
  { name: "Busca de informação", mentions: "150+", width: 39, note: "menções qualitativas" },
  { name: "Revisão de código", mentions: "150+", width: 39, note: "menções qualitativas" },
  { name: "Testes", mentions: "150+", width: 39, note: "menções qualitativas" },
];

const arquiteturas = [
  { name: "Skills", icon: FileText, step: "COMECE AQUI", effort: 1, complexity: 1, best: "Padrões e fluxos repetíveis", why: "Pouca infraestrutura; alto ganho de consistência." },
  { name: "MCPs", icon: Plug, step: "CONECTE", effort: 2, complexity: 3, best: "Ferramentas e sistemas externos", why: "Exige credenciais, permissões e contratos de integração." },
  { name: "RAG", icon: Database, step: "DÊ CONTEXTO", effort: 3, complexity: 4, best: "Base interna de documentos", why: "Inclui ingestão, busca, qualidade dos dados e avaliação." },
  { name: "SubAgentes", icon: GitBranch, step: "ORQUESTRE", effort: 4, complexity: 5, best: "Trabalho especializado em paralelo", why: "Exige desenho de papéis, supervisão, custo e coordenação." },
];

function Escala({ value, label }: { value: number; label: string }) {
  return (
    <div className="exec-scale" aria-label={`${label}: nível ${value} de 5`}>
      <span>{label}</span>
      <div>{[1, 2, 3, 4, 5].map((point) => <i key={point} className={point <= value ? "on" : ""} />)}</div>
    </div>
  );
}

export default function UsagePanoramaPage() {
  return (
    <main className="skill-reference usage-panorama-page executive-panorama">
      <LibraryNav ativo="panorama" />

      <section className="executive-hero">
        <div className="page-width executive-hero-grid">
          <div>
            <p className="eyebrow">DASHBOARD EXECUTIVO · IA CORPORATIVA</p>
            <h1>A questão deixou de ser <em>“usar IA?”</em><br />Agora é: onde ela gera valor com segurança?</h1>
            <p>Um painel para fechar a apresentação conectando a realidade corporativa a uma sequência prática: padronizar, conectar, contextualizar e só então orquestrar.</p>
          </div>
          <aside className="executive-brief-card">
            <div><Sparkles aria-hidden="true" /><span>LEITURA RÁPIDA</span></div>
            <strong>Uso cresce rápido.<br />Maturidade cresce <em>mais devagar.</em></strong>
            <p>Os dados mostram adoção ampla; os painéis abaixo mostram como decidir o próximo passo.</p>
          </aside>
        </div>
      </section>

      <section className="executive-dashboard-section">
        <div className="page-width">
          <div className="dashboard-toolbar"><div><Activity aria-hidden="true" /><span>PANORAMA GLOBAL</span></div><p>Indicadores de pesquisas diferentes; cada card preserva sua fonte e recorte.</p><b>ATUALIZADO · 2025/2026</b></div>
          <div className="executive-kpi-grid">
            {kpis.map((item) => <article className={`executive-kpi ${item.tone}`} key={item.label}><span className="kpi-marker" /><strong>{item.value}<small>{item.suffix}</small></strong><p>{item.label}</p><footer>{item.source}</footer></article>)}
          </div>

          <div className="executive-main-grid">
            <article className="executive-panel adoption-panel">
              <header><div><span className="panel-index">01</span><h2>Da adoção ao valor</h2></div><Building2 aria-hidden="true" /></header>
              <p className="panel-intro">O salto não é apenas instalar uma ferramenta: é redesenhar como o trabalho acontece.</p>
              <div className="corporate-lane">
                <div><span>IA em alguma função</span><i><b style={{ width: "78%" }} /></i><strong>78%</strong></div>
                <div><span>Fluxo fundamentalmente redesenhado</span><i><b style={{ width: "21%" }} /></i><strong>21%</strong></div>
                <div><span>Revisão de 100% das saídas de IA</span><i><b style={{ width: "27%" }} /></i><strong>27%</strong></div>
              </div>
              <footer><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" target="_blank" rel="noreferrer">Fonte: McKinsey Global Survey 2025 <ArrowRight aria-hidden="true" /></a></footer>
            </article>

            <article className="executive-panel trust-panel">
              <header><div><span className="panel-index">02</span><h2>O controle continua humano</h2></div><ShieldCheck aria-hidden="true" /></header>
              <div className="trust-donut-wrap">
                <div className="trust-donut" role="img" aria-label="46 por cento desconfiam, 33 por cento confiam e 21 por cento são neutros sobre a precisão de ferramentas de IA"><div><b>46%</b><span>desconfiam</span></div></div>
                <div className="trust-legend"><p><i className="distrust" />Desconfiam <b>46%</b></p><p><i className="trust" />Confiam <b>33%</b></p><p><i className="neutral" />Neutros <b>21%</b></p></div>
              </div>
              <p className="panel-footnote">A velocidade da IA precisa vir acompanhada de testes, revisão e fontes internas confiáveis.</p>
              <footer><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Fonte: Stack Overflow 2025 <ArrowRight aria-hidden="true" /></a></footer>
            </article>
          </div>

          <div className="executive-secondary-grid">
            <article className="executive-panel activity-panel">
              <header><div><span className="panel-index">03</span><h2>Onde a IA aparece primeiro</h2></div><BarChart3 aria-hidden="true" /></header>
              <p className="panel-intro">Em comentários de engenheiros, a geração de código é o uso mais recorrente; busca, revisão e testes formam o segundo grupo de uso.</p>
              <div className="task-bars">{tarefas.map((task) => <div key={task.name}><span>{task.name}</span><i><b style={{ width: `${task.width}%` }} /></i><strong>{task.mentions}</strong><small>{task.note}</small></div>)}</div>
              <footer><a href="https://dora.dev/insights/balancing-ai-tensions/" target="_blank" rel="noreferrer">Fonte: DORA, análise qualitativa de 2025 <ArrowRight aria-hidden="true" /></a></footer>
            </article>

            <article className="executive-panel strategy-panel">
              <header><div><span className="panel-index">04</span><h2>Sequência que reduz risco</h2></div><Workflow aria-hidden="true" /></header>
              <ol className="strategy-steps"><li><b>1</b><div><strong>Padronize</strong><span>Skills para regras e fluxos repetíveis.</span></div></li><li><b>2</b><div><strong>Conecte</strong><span>MCPs quando uma ferramenta externa for necessária.</span></div></li><li><b>3</b><div><strong>Contextualize</strong><span>RAG quando o conhecimento interno for essencial.</span></div></li><li><b>4</b><div><strong>Orquestre</strong><span>SubAgentes quando a divisão do trabalho justificar a coordenação.</span></div></li></ol>
              <aside><CircleAlert aria-hidden="true" /><p>Não é uma estatística de mercado: é uma recomendação de adoção para equipes iniciantes.</p></aside>
            </article>
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <div className="page-width">
          <div className="architecture-head"><div><p className="eyebrow">MAPA DE ARQUITETURA</p><h2>Do mais fácil de colocar em prática ao que exige mais engenharia.</h2></div><p>Esta é uma <strong>avaliação orientativa</strong>, não um ranking estatístico: compara esforço inicial, dependências e necessidade de governança.</p></div>
          <div className="architecture-dashboard">
            <div className="architecture-columns"><span>CAMADA</span><span>MELHOR PARA</span><span>ESFORÇO INICIAL</span><span>COMPLEXIDADE OPERACIONAL</span></div>
            {arquiteturas.map((item) => { const Icon = item.icon; return <article className="architecture-row" key={item.name}><div className="architecture-name"><Icon aria-hidden="true" /><div><span>{item.step}</span><strong>{item.name}</strong></div></div><p>{item.best}</p><Escala value={item.effort} label="Esforço" /><Escala value={item.complexity} label="Complexidade" /><aside>{item.why}</aside></article>; })}
          </div>
          <div className="architecture-callout"><CheckCircle2 aria-hidden="true" /><p><strong>Recomendação para começar:</strong> uma Skill de padrão Java + uma revisão humana. Adicione MCP, RAG e SubAgentes somente quando houver uma necessidade concreta que a camada anterior não resolve.</p></div>
        </div>
      </section>

      <section className="executive-closing">
        <div className="page-width executive-closing-grid"><div><p className="eyebrow">FECHAMENTO</p><h2>O melhor uso de IA não é o mais complexo.<br /><em>É o que melhora o trabalho real.</em></h2></div><div><Users aria-hidden="true" /><p>Comece pequeno, meça o efeito, mantenha revisão humana e evolua a arquitetura à medida que o time ganha maturidade.</p><div className="executive-references"><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" target="_blank" rel="noreferrer">McKinsey 2025</a><a href="https://dora.dev/insights/balancing-ai-tensions/" target="_blank" rel="noreferrer">DORA 2025</a><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Stack Overflow 2025</a></div></div></div>
      </section>
    </main>
  );
}
