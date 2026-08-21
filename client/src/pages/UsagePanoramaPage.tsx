// Dashboard circular: diferencia números de pesquisas externas de uma leitura orientativa de arquitetura.
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleAlert,
  Database,
  FileText,
  GitBranch,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { LibraryNav } from "@/components/LibraryNav";

type Fatia = { label: string; value: number; color: string };

const indicadores = [
  { value: "78%", label: "empresas usam IA em ao menos uma função", source: "McKinsey 2025", data: [{ label: "Usam IA", value: 78, color: "#cf6235" }, { label: "Ainda não usam", value: 22, color: "#dce4e0" }] },
  { value: "51%", label: "desenvolvedores profissionais usam IA diariamente", source: "Stack Overflow 2025", data: [{ label: "Uso diário", value: 51, color: "#4b829f" }, { label: "Não diário", value: 49, color: "#dce4e0" }] },
  { value: "21%", label: "redesenharam pelo menos um fluxo de trabalho", source: "McKinsey 2025", data: [{ label: "Redesenharam", value: 21, color: "#5f9071" }, { label: "Ainda não", value: 79, color: "#dce4e0" }] },
  { value: "46%", label: "desconfiam da precisão das respostas de IA", source: "Stack Overflow 2025", data: [{ label: "Desconfiam", value: 46, color: "#d45744" }, { label: "Confiam", value: 33, color: "#78a4ba" }, { label: "Neutros", value: 21, color: "#dce4e0" }] },
];

const adocao = [
  { title: "IA em alguma função", value: "78%", caption: "Adoção", data: [{ label: "Usam", value: 78, color: "#cf6235" }, { label: "Não usam", value: 22, color: "#dce4e0" }] },
  { title: "Fluxo redesenhado", value: "21%", caption: "Maturidade", data: [{ label: "Redesenharam", value: 21, color: "#5f9071" }, { label: "Ainda não", value: 79, color: "#dce4e0" }] },
  { title: "Revisão de todas as saídas", value: "27%", caption: "Governança", data: [{ label: "Revisam", value: 27, color: "#4b829f" }, { label: "Não em todas", value: 73, color: "#dce4e0" }] },
];

const usoTarefas: Fatia[] = [
  { label: "Geração de código", value: 600, color: "#cf6235" },
  { label: "Busca", value: 150, color: "#6f9eb2" },
  { label: "Revisão", value: 150, color: "#86b49a" },
  { label: "Testes", value: 150, color: "#c3a0c9" },
];

const arquiteturas = [
  { name: "Skills", icon: FileText, step: "COMECE AQUI", effort: 1, complexity: 1, color: "#f4a581", best: "Padrões e fluxos repetíveis", why: "Pouca infraestrutura; alto ganho de consistência." },
  { name: "MCPs", icon: Plug, step: "CONECTE", effort: 2, complexity: 3, color: "#8fc2d5", best: "Ferramentas e sistemas externos", why: "Exige credenciais, permissões e contratos de integração." },
  { name: "RAG", icon: Database, step: "DÊ CONTEXTO", effort: 3, complexity: 4, color: "#a5d2b3", best: "Base interna de documentos", why: "Inclui ingestão, busca, qualidade dos dados e avaliação." },
  { name: "SubAgentes", icon: GitBranch, step: "ORQUESTRE", effort: 4, complexity: 5, color: "#d8b2e4", best: "Trabalho especializado em paralelo", why: "Exige desenho de papéis, supervisão, custo e coordenação." },
];

function GraficoRosca({ data, value, caption, className = "" }: { data: Fatia[]; value: string; caption: string; className?: string }) {
  return (
    <div className={`pie-widget ${className}`} role="img" aria-label={`${caption}: ${data.map((fatia) => `${fatia.label} ${fatia.value}%`).join(", ")}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius="64%" outerRadius="92%" startAngle={90} endAngle={-270} paddingAngle={2} stroke="none">
            {data.map((fatia) => <Cell key={fatia.label} fill={fatia.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pie-widget-center"><strong>{value}</strong><span>{caption}</span></div>
    </div>
  );
}

function EscoreCircular({ value, label, color }: { value: number; label: string; color: string }) {
  const data = [{ label: "Nível", value, color }, { label: "Restante", value: 5 - value, color: "#3c5660" }];
  return <GraficoRosca data={data} value={`${value}/5`} caption={label} className="architecture-score" />;
}

export default function UsagePanoramaPage() {
  return (
    <main className="skill-reference usage-panorama-page executive-panorama circular-panorama">
      <LibraryNav ativo="panorama" />

      <section className="executive-hero">
        <div className="page-width executive-hero-grid">
          <div><p className="eyebrow">DASHBOARD EXECUTIVO · IA CORPORATIVA</p><h1>A questão deixou de ser <em>“usar IA?”</em><br />Agora é: onde ela gera valor com segurança?</h1><p>Um retrato visual da adoção corporativa e um caminho simples para a equipe avançar sem começar pela arquitetura mais complexa.</p></div>
          <aside className="executive-brief-card"><div><Sparkles aria-hidden="true" /><span>LEITURA RÁPIDA</span></div><strong>Uso cresce rápido.<br />Maturidade cresce <em>mais devagar.</em></strong><p>Os gráficos mostram a distância entre experimentar IA e integrá-la de verdade ao trabalho.</p></aside>
        </div>
      </section>

      <section className="executive-dashboard-section">
        <div className="page-width">
          <div className="dashboard-toolbar"><div><Activity aria-hidden="true" /><span>PANORAMA GLOBAL</span></div><p>Indicadores de pesquisas diferentes; cada gráfico preserva sua fonte e seu recorte.</p><b>ATUALIZADO · 2025/2026</b></div>
          <div className="pie-kpi-grid">{indicadores.map((item) => <article className="pie-kpi-card" key={item.label}><GraficoRosca data={item.data} value={item.value} caption="do recorte" /><div><h2>{item.label}</h2><p>{item.data.map((fatia) => <span key={fatia.label}><i style={{ background: fatia.color }} />{fatia.label} <b>{fatia.value}%</b></span>)}</p><footer>{item.source}</footer></div></article>)}</div>

          <div className="circular-story-grid">
            <article className="circular-panel adoption-circle-panel"><header><div><span className="panel-index">01</span><h2>Da adoção ao valor</h2></div><Building2 aria-hidden="true" /></header><p className="panel-intro">Três roscas mostram por que adotar uma ferramenta não é o mesmo que transformar o modo de trabalhar.</p><div className="adoption-circles">{adocao.map((item) => <div key={item.title}><GraficoRosca data={item.data} value={item.value} caption={item.caption} /><strong>{item.title}</strong></div>)}</div><footer><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" target="_blank" rel="noreferrer">Fonte: McKinsey Global Survey 2025 <ArrowRight aria-hidden="true" /></a></footer></article>
            <article className="circular-panel trust-circle-panel"><header><div><span className="panel-index">02</span><h2>O controle continua humano</h2></div><ShieldCheck aria-hidden="true" /></header><div className="trust-circle-content"><GraficoRosca data={indicadores[3].data} value="46%" caption="desconfiam" className="trust-large-pie" /><div className="pie-legend">{indicadores[3].data.map((fatia) => <p key={fatia.label}><i style={{ background: fatia.color }} /><span>{fatia.label}</span><b>{fatia.value}%</b></p>)}</div></div><p className="panel-footnote">A velocidade da IA precisa vir acompanhada de testes, revisão e fontes internas confiáveis.</p><footer><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Fonte: Stack Overflow 2025 <ArrowRight aria-hidden="true" /></a></footer></article>
          </div>

          <div className="circular-story-grid circular-lower-grid">
            <article className="circular-panel use-circle-panel"><header><div><span className="panel-index">03</span><h2>Onde a IA aparece primeiro</h2></div><Activity aria-hidden="true" /></header><div className="use-circle-body"><GraficoRosca data={usoTarefas} value="600+" caption="código" className="usage-large-pie" /><div className="pie-legend usage-legend">{usoTarefas.map((fatia) => <p key={fatia.label}><i style={{ background: fatia.color }} /><span>{fatia.label}</span><b>{fatia.value}+</b></p>)}</div></div><p className="panel-footnote">Distribuição mínima das menções qualitativas analisadas; não representa percentual de adoção.</p><footer><a href="https://dora.dev/insights/balancing-ai-tensions/" target="_blank" rel="noreferrer">Fonte: DORA, análise qualitativa de 2025 <ArrowRight aria-hidden="true" /></a></footer></article>
            <article className="circular-panel start-circle-panel"><header><div><span className="panel-index">04</span><h2>Onde começar</h2></div><CheckCircle2 aria-hidden="true" /></header><div className="start-pie-layout"><GraficoRosca data={[{ label: "Comece por Skills", value: 25, color: "#cf6235" }, { label: "Depois MCPs", value: 25, color: "#6f9eb2" }, { label: "Depois RAG", value: 25, color: "#86b49a" }, { label: "Depois SubAgentes", value: 25, color: "#c3a0c9" }]} value="1→4" caption="evolução" /><ol><li><b>1</b>Skills</li><li><b>2</b>MCPs</li><li><b>3</b>RAG</li><li><b>4</b>SubAgentes</li></ol></div><aside><CircleAlert aria-hidden="true" /><p>Não é estatística de mercado; é um roteiro recomendado para times iniciantes.</p></aside></article>
          </div>
        </div>
      </section>

      <section className="architecture-section pie-architecture-section">
        <div className="page-width"><div className="architecture-head"><div><p className="eyebrow">MAPA DE ARQUITETURA</p><h2>Do mais fácil de colocar em prática ao que exige mais engenharia.</h2></div><p>Esta é uma <strong>avaliação orientativa</strong>, não um ranking estatístico: cada pizza mostra esforço e complexidade em uma escala didática de 1 a 5.</p></div>
          <div className="architecture-pie-grid">{arquiteturas.map((item) => { const Icon = item.icon; return <article className="architecture-pie-card" key={item.name}><header><Icon aria-hidden="true" /><div><span>{item.step}</span><h3>{item.name}</h3></div></header><p className="architecture-best">{item.best}</p><div className="architecture-pies"><EscoreCircular value={item.effort} label="esforço" color={item.color} /><EscoreCircular value={item.complexity} label="complexidade" color={item.color} /></div><p className="architecture-why">{item.why}</p></article>; })}</div>
          <div className="architecture-callout"><CheckCircle2 aria-hidden="true" /><p><strong>Recomendação para começar:</strong> uma Skill de padrão Java + revisão humana. Adicione MCP, RAG e SubAgentes somente quando uma necessidade concreta exigir a próxima camada.</p></div>
        </div>
      </section>

      <section className="executive-closing"><div className="page-width executive-closing-grid"><div><p className="eyebrow">FECHAMENTO</p><h2>O melhor uso de IA não é o mais complexo.<br /><em>É o que melhora o trabalho real.</em></h2></div><div><Users aria-hidden="true" /><p>Comece pequeno, meça o efeito, mantenha revisão humana e evolua a arquitetura à medida que o time ganha maturidade.</p><div className="executive-references"><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" target="_blank" rel="noreferrer">McKinsey 2025</a><a href="https://dora.dev/insights/balancing-ai-tensions/" target="_blank" rel="noreferrer">DORA 2025</a><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Stack Overflow 2025</a></div></div></div></section>
    </main>
  );
}
