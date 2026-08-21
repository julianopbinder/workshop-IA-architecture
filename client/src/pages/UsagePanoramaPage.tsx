// Dashboard executivo com os indicadores corporativos, as fontes e a leitura arquitetural da equipe.
import {
  Activity, ArrowRight, BarChart3, Building2, CheckCircle2, CircleAlert,
  Database, FileText, GitBranch, LineChart as LineChartIcon, Plug,
  ShieldCheck, Sparkles, Users,
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Line, LineChart, Pie,
  PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { LibraryNav } from "@/components/LibraryNav";

type Fatia = { label: string; value: number; color: string };
type Visao = "circular" | "barras" | "linha" | "colunas";
type Serie = { nome: string; valor: number; cor: string; fonte: string };

const indicadores = [
  { value: "78%", label: "empresas usam IA em ao menos uma função", source: "McKinsey 2025", data: [{ label: "Usam IA", value: 78, color: "#cf6235" }, { label: "Ainda não usam", value: 22, color: "#dce4e0" }] },
  { value: "51%", label: "desenvolvedores profissionais usam IA diariamente", source: "Stack Overflow 2025", data: [{ label: "Uso diário", value: 51, color: "#4b829f" }, { label: "Não diário", value: 49, color: "#dce4e0" }] },
  { value: "21%", label: "redesenharam pelo menos um fluxo de trabalho", source: "McKinsey 2025", data: [{ label: "Redesenharam", value: 21, color: "#5f9071" }, { label: "Ainda não", value: 79, color: "#dce4e0" }] },
  { value: "46%", label: "desconfiam da precisão das respostas de IA", source: "Stack Overflow 2025", data: [{ label: "Desconfiam", value: 46, color: "#d45744" }, { label: "Confiam", value: 33, color: "#78a4ba" }, { label: "Neutros", value: 21, color: "#dce4e0" }] },
];

// Séries reutilizadas nas visões de barras, linha e colunas; os percentuais e recortes são os mesmos do painel circular.
const indicadoresComparacao: Serie[] = [
  { nome: "Adoção empresarial", valor: 78, fonte: "McKinsey 2025", cor: "#cf6235" },
  { nome: "Uso diário por devs", valor: 51, fonte: "Stack Overflow 2025", cor: "#4b829f" },
  { nome: "Fluxos redesenhados", valor: 21, fonte: "McKinsey 2025", cor: "#5f9071" },
  { nome: "Desconfiam da precisão", valor: 46, fonte: "Stack Overflow 2025", cor: "#d45744" },
];

const adocao = [
  { title: "IA em alguma função", value: "78%", caption: "Adoção", data: [{ label: "Usam", value: 78, color: "#cf6235" }, { label: "Não usam", value: 22, color: "#dce4e0" }] },
  { title: "Fluxo redesenhado", value: "21%", caption: "Maturidade", data: [{ label: "Redesenharam", value: 21, color: "#5f9071" }, { label: "Ainda não", value: 79, color: "#dce4e0" }] },
  { title: "Revisão de todas as saídas", value: "27%", caption: "Governança", data: [{ label: "Revisam", value: 27, color: "#4b829f" }, { label: "Não em todas", value: 73, color: "#dce4e0" }] },
];

const adocaoComparacao: Serie[] = [
  { nome: "IA em alguma função", valor: 78, cor: "#cf6235", fonte: "McKinsey 2025" },
  { nome: "Fluxo redesenhado", valor: 21, cor: "#5f9071", fonte: "McKinsey 2025" },
  { nome: "Revisão de todas as saídas", valor: 27, cor: "#4b829f", fonte: "McKinsey 2025" },
];

const confiancaComparacao: Serie[] = [
  { nome: "Desconfiam", valor: 46, cor: "#d45744", fonte: "Stack Overflow 2025" },
  { nome: "Confiam", valor: 33, cor: "#78a4ba", fonte: "Stack Overflow 2025" },
  { nome: "Neutros", valor: 21, cor: "#dce4e0", fonte: "Stack Overflow 2025" },
];

const usoTarefas: Fatia[] = [
  { label: "Geração de código", value: 600, color: "#cf6235" },
  { label: "Busca", value: 150, color: "#6f9eb2" },
  { label: "Revisão", value: 150, color: "#86b49a" },
  { label: "Testes", value: 150, color: "#c3a0c9" },
];

const usoComparacao: Serie[] = usoTarefas.map((item) => ({ nome: item.label, valor: item.value, cor: item.color, fonte: "DORA, análise qualitativa de 2025" }));
const roteiroComparacao: Serie[] = [
  { nome: "Skills", valor: 1, cor: "#cf6235", fonte: "Roteiro recomendado" },
  { nome: "MCPs", valor: 2, cor: "#6f9eb2", fonte: "Roteiro recomendado" },
  { nome: "RAG", valor: 3, cor: "#86b49a", fonte: "Roteiro recomendado" },
  { nome: "SubAgentes", valor: 4, cor: "#c3a0c9", fonte: "Roteiro recomendado" },
];

const arquiteturas = [
  { name: "Skills", icon: FileText, step: "COMECE AQUI", effort: 1, complexity: 1, color: "#f4a581", best: "Padrões e fluxos repetíveis", why: "Pouca infraestrutura; alto ganho de consistência." },
  { name: "MCPs", icon: Plug, step: "CONECTE", effort: 2, complexity: 3, color: "#8fc2d5", best: "Ferramentas e sistemas externos", why: "Exige credenciais, permissões e contratos de integração." },
  { name: "RAG", icon: Database, step: "DÊ CONTEXTO", effort: 3, complexity: 4, color: "#a5d2b3", best: "Base interna de documentos", why: "Inclui ingestão, busca, qualidade dos dados e avaliação." },
  { name: "SubAgentes", icon: GitBranch, step: "ORQUESTRE", effort: 4, complexity: 5, color: "#d8b2e4", best: "Trabalho especializado em paralelo", why: "Exige desenho de papéis, supervisão, custo e coordenação." },
];

function GraficoRosca({ data, value, caption, className = "" }: { data: Fatia[]; value: string; caption: string; className?: string }) {
  return <div className={`pie-widget ${className}`} role="img" aria-label={`${caption}: ${data.map((fatia) => `${fatia.label} ${fatia.value}%`).join(", ")}`}>
    <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius="64%" outerRadius="92%" startAngle={90} endAngle={-270} paddingAngle={2} stroke="none">{data.map((fatia) => <Cell key={fatia.label} fill={fatia.color} />)}</Pie></PieChart></ResponsiveContainer>
    <div className="pie-widget-center"><strong>{value}</strong><span>{caption}</span></div>
  </div>;
}

function EscoreCircular({ value, label, color }: { value: number; label: string; color: string }) {
  return <GraficoRosca data={[{ label: "Nível", value, color }, { label: "Restante", value: 5 - value, color: "#3c5660" }]} value={`${value}/5`} caption={label} className="architecture-score" />;
}

function FontesIndicadores() {
  return <div className="same-data-note"><CheckCircle2 aria-hidden="true" /><p><strong>Mesmos dados, outra leitura.</strong> As quatro visualizações usam os mesmos indicadores e as mesmas fontes; muda apenas a forma de enxergar a comparação.</p></div>;
}

function FormatoValor({ valor, unidade }: { valor: number; unidade: string }) {
  return <>{valor}{unidade}</>;
}

// Um único componente de gráfico impede que os três modos alterem percentuais, fontes ou nomes dos indicadores.
function GraficoPorTipo({ data, visao, unidade = "%", rotulo = "Indicador" }: { data: Serie[]; visao: Exclude<Visao, "circular">; unidade?: string; rotulo?: string }) {
  const teto = Math.max(...data.map((item) => item.valor));
  const limite = teto <= 5 ? 5 : teto <= 100 ? 100 : Math.ceil(teto / 100) * 100;
  const formatar = (valor: number) => `${valor}${unidade}`;
  const eixo = <XAxis type="number" domain={[0, limite]} tickFormatter={formatar} tick={{ fill: "#52656d", fontSize: 11 }} />;
  const tooltip = <Tooltip formatter={(value: number) => [formatar(value), rotulo]} cursor={{ fill: "#edf1ef" }} />;
  return <div className="alternative-chart-stage">
    <ResponsiveContainer width="100%" height="100%">
      {visao === "barras" ? <BarChart data={data} layout="vertical" margin={{ top: 18, right: 56, bottom: 12, left: 26 }}><CartesianGrid stroke="#d6dfda" strokeDasharray="3 4" horizontal={false} />{eixo}<YAxis dataKey="nome" type="category" width={174} tick={{ fill: "#1a2a38", fontSize: 12, fontWeight: 700 }} />{tooltip}<Bar dataKey="valor" radius={[0, 8, 8, 0]}>{data.map((item) => <Cell key={item.nome} fill={item.cor} />)}<LabelList dataKey="valor" position="right" formatter={formatar} fill="#1a2a38" fontSize={13} fontWeight={800} /></Bar></BarChart> : visao === "linha" ? <LineChart data={data} margin={{ top: 45, right: 35, bottom: 66, left: 5 }}><CartesianGrid stroke="#d6dfda" strokeDasharray="3 4" /><XAxis dataKey="nome" interval={0} angle={-15} textAnchor="end" height={78} tick={{ fill: "#445661", fontSize: 11, fontWeight: 700 }} />{eixo}{tooltip}<Line type="monotone" dataKey="valor" stroke="#cf6235" strokeWidth={5} dot={{ r: 7, fill: "#cf6235", stroke: "#f8faf8", strokeWidth: 3 }} activeDot={{ r: 9 }}><LabelList dataKey="valor" position="top" formatter={formatar} fill="#1a2a38" fontSize={13} fontWeight={800} /></Line></LineChart> : <BarChart data={data} margin={{ top: 35, right: 14, bottom: 66, left: 5 }}><CartesianGrid stroke="#d6dfda" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="nome" interval={0} angle={-15} textAnchor="end" height={78} tick={{ fill: "#445661", fontSize: 11, fontWeight: 700 }} />{eixo}{tooltip}<Bar dataKey="valor" radius={[8, 8, 0, 0]}>{data.map((item) => <Cell key={item.nome} fill={item.cor} />)}<LabelList dataKey="valor" position="top" formatter={formatar} fill="#1a2a38" fontSize={13} fontWeight={800} /></Bar></BarChart>}
    </ResponsiveContainer>
  </div>;
}

function GradeFontes({ data, unidade = "%" }: { data: Serie[]; unidade?: string }) {
  return <div className="alternative-source-grid">{data.map((item) => <div key={item.nome}><i style={{ background: item.cor }} /><span>{item.nome}</span><strong><FormatoValor valor={item.valor} unidade={unidade} /></strong><small>{item.fonte}</small></div>)}</div>;
}

function BlocoAlternativo({ indice, titulo, descricao, Icon, data, visao, fonteUrl, rodape, unidade = "%", rotulo = "Indicador", aviso }: { indice: string; titulo: string; descricao: string; Icon: typeof Activity; data: Serie[]; visao: Exclude<Visao, "circular">; fonteUrl?: string; rodape: string; unidade?: string; rotulo?: string; aviso?: string }) {
  return <article className="alternative-detail-card">
    <header><div><span className="panel-index">{indice}</span><h2>{titulo}</h2></div><Icon aria-hidden="true" /></header>
    <p className="panel-intro">{descricao}</p>
    <GraficoPorTipo data={data} visao={visao} unidade={unidade} rotulo={rotulo} />
    <GradeFontes data={data} unidade={unidade} />
    {aviso && <aside className="alternative-method-note"><CircleAlert aria-hidden="true" /><p>{aviso}</p></aside>}
    <footer>{fonteUrl ? <a href={fonteUrl} target="_blank" rel="noreferrer">{rodape} <ArrowRight aria-hidden="true" /></a> : <span>{rodape}</span>}</footer>
  </article>;
}

function GraficoArquitetura({ visao }: { visao: Exclude<Visao, "circular"> }) {
  const legenda = <Legend verticalAlign="top" height={30} formatter={(value: string) => <span className="architecture-chart-legend">{value}</span>} />;
  return <div className="alternative-chart-stage architecture-comparison-chart"><ResponsiveContainer width="100%" height="100%">
    {visao === "barras" ? <BarChart data={arquiteturas} layout="vertical" margin={{ top: 20, right: 38, bottom: 12, left: 25 }}><CartesianGrid stroke="#d6dfda" strokeDasharray="3 4" horizontal={false} />{legenda}<XAxis type="number" domain={[0, 5]} allowDecimals={false} /><YAxis dataKey="name" type="category" width={95} tick={{ fill: "#1a2a38", fontSize: 13, fontWeight: 700 }} /><Tooltip /><Bar dataKey="effort" name="Esforço" fill="#cf6235" radius={[0, 6, 6, 0]} /><Bar dataKey="complexity" name="Complexidade" fill="#4b829f" radius={[0, 6, 6, 0]} /></BarChart> : visao === "linha" ? <LineChart data={arquiteturas} margin={{ top: 45, right: 28, bottom: 30, left: 4 }}><CartesianGrid stroke="#d6dfda" strokeDasharray="3 4" />{legenda}<XAxis dataKey="name" tick={{ fill: "#445661", fontSize: 12, fontWeight: 700 }} /><YAxis domain={[0, 5]} allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="effort" name="Esforço" stroke="#cf6235" strokeWidth={4} dot={{ r: 6 }} /><Line type="monotone" dataKey="complexity" name="Complexidade" stroke="#4b829f" strokeWidth={4} dot={{ r: 6 }} /></LineChart> : <BarChart data={arquiteturas} margin={{ top: 38, right: 18, bottom: 26, left: 4 }}><CartesianGrid stroke="#d6dfda" strokeDasharray="3 4" vertical={false} />{legenda}<XAxis dataKey="name" tick={{ fill: "#445661", fontSize: 12, fontWeight: 700 }} /><YAxis domain={[0, 5]} allowDecimals={false} /><Tooltip /><Bar dataKey="effort" name="Esforço" fill="#cf6235" radius={[6, 6, 0, 0]} /><Bar dataKey="complexity" name="Complexidade" fill="#4b829f" radius={[6, 6, 0, 0]} /></BarChart>}
  </ResponsiveContainer></div>;
}

function ArquiteturaAlternativa({ visao }: { visao: Exclude<Visao, "circular"> }) {
  return <section className="architecture-section alternative-architecture-section"><div className="page-width"><div className="architecture-head"><div><p className="eyebrow">MAPA DE ARQUITETURA</p><h2>Do mais fácil de colocar em prática ao que exige mais engenharia.</h2></div><p>Esta é uma <strong>avaliação orientativa</strong>, não um ranking estatístico: esforço e complexidade aparecem na mesma escala didática de 1 a 5.</p></div><article className="alternative-architecture-card"><header><div><span className="panel-index">05</span><div><p className="eyebrow">COMPARAÇÃO DE ARQUITETURA</p><h2>O mesmo roteiro, em outro tipo de gráfico.</h2></div></div><GitBranch aria-hidden="true" /></header><GraficoArquitetura visao={visao} /></article><div className="architecture-text-grid">{arquiteturas.map((item) => { const Icon = item.icon; return <article key={item.name}><header><Icon aria-hidden="true" /><div><span>{item.step}</span><h3>{item.name}</h3></div></header><p className="architecture-best">{item.best}</p><p><b>Esforço:</b> {item.effort}/5 · <b>Complexidade:</b> {item.complexity}/5</p><p className="architecture-why">{item.why}</p></article>; })}</div><div className="architecture-callout"><CheckCircle2 aria-hidden="true" /><p><strong>Recomendação para começar:</strong> uma Skill de padrão Java + revisão humana. Adicione MCP, RAG e SubAgentes somente quando uma necessidade concreta exigir a próxima camada.</p></div></div></section>;
}

function GraficoAlternativo({ visao }: { visao: Exclude<Visao, "circular"> }) {
  const configuracao = {
    barras: { indice: "01", titulo: "Barras Comparativas", texto: "A comparação horizontal facilita identificar a distância entre adoção, uso diário, transformação de fluxos e confiança.", icon: BarChart3 },
    linha: { indice: "02", titulo: "Linha de Indicadores", texto: "A linha organiza os quatro indicadores em uma sequência de leitura. Ela não representa evolução no tempo.", icon: LineChartIcon },
    colunas: { indice: "03", titulo: "Colunas de Adoção", texto: "As colunas usam a mesma escala percentual para destacar visualmente a diferença de altura entre os indicadores.", icon: Building2 },
  }[visao];
  const Icon = configuracao.icon;
  return <>
    <section className="alternative-visual-section"><div className="page-width"><article className="alternative-chart-card"><header><div><span className="panel-index">{configuracao.indice}</span><div><p className="eyebrow">VISTA ALTERNATIVA</p><h2>{configuracao.titulo}</h2></div></div><Icon aria-hidden="true" /></header><p className="alternative-chart-intro">{configuracao.texto}</p><GraficoPorTipo data={indicadoresComparacao} visao={visao} /><GradeFontes data={indicadoresComparacao} /><FontesIndicadores /></article></div></section>
    <section className="alternative-detail-section"><div className="page-width"><div className="alternative-detail-grid"><BlocoAlternativo indice="01" titulo="Da adoção ao valor" descricao="Os mesmos três indicadores mostram por que adotar uma ferramenta não é o mesmo que transformar o modo de trabalhar." Icon={Building2} data={adocaoComparacao} visao={visao} fonteUrl="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" rodape="Fonte: McKinsey Global Survey 2025" /><BlocoAlternativo indice="02" titulo="O controle continua humano" descricao="A velocidade da IA precisa vir acompanhada de testes, revisão e fontes internas confiáveis." Icon={ShieldCheck} data={confiancaComparacao} visao={visao} fonteUrl="https://survey.stackoverflow.co/2025/ai" rodape="Fonte: Stack Overflow 2025" /><BlocoAlternativo indice="03" titulo="Onde a IA aparece primeiro" descricao="A distribuição das menções qualitativas revela onde as equipes costumam enxergar valor inicialmente." Icon={Activity} data={usoComparacao} visao={visao} unidade="+" rotulo="Menções" fonteUrl="https://dora.dev/insights/balancing-ai-tensions/" rodape="Fonte: DORA, análise qualitativa de 2025" aviso="Distribuição mínima das menções qualitativas analisadas; não representa percentual de adoção." /><BlocoAlternativo indice="04" titulo="Onde começar" descricao="O roteiro preserva a sequência recomendada para uma equipe que está iniciando a adoção." Icon={CheckCircle2} data={roteiroComparacao} visao={visao} unidade="" rotulo="Ordem" rodape="Roteiro recomendado para times iniciantes" aviso="Não é estatística de mercado; é um roteiro recomendado para times iniciantes." /></div></div></section>
    <ArquiteturaAlternativa visao={visao} />
  </>;
}

function PainelCircular() {
  return <>
    <section className="executive-dashboard-section"><div className="page-width"><div className="dashboard-toolbar"><div><Activity aria-hidden="true" /><span>PANORAMA GLOBAL</span></div><p>Indicadores de pesquisas diferentes; cada gráfico preserva sua fonte e seu recorte.</p><b>ATUALIZADO · 2025/2026</b></div><div className="pie-kpi-grid">{indicadores.map((item) => <article className="pie-kpi-card" key={item.label}><GraficoRosca data={item.data} value={item.value} caption="do recorte" /><div><h2>{item.label}</h2><p>{item.data.map((fatia) => <span key={fatia.label}><i style={{ background: fatia.color }} />{fatia.label} <b>{fatia.value}%</b></span>)}</p><footer>{item.source}</footer></div></article>)}</div><div className="circular-story-grid"><article className="circular-panel adoption-circle-panel"><header><div><span className="panel-index">01</span><h2>Da adoção ao valor</h2></div><Building2 aria-hidden="true" /></header><p className="panel-intro">Três roscas mostram por que adotar uma ferramenta não é o mesmo que transformar o modo de trabalhar.</p><div className="adoption-circles">{adocao.map((item) => <div key={item.title}><GraficoRosca data={item.data} value={item.value} caption={item.caption} /><strong>{item.title}</strong></div>)}</div><footer><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" target="_blank" rel="noreferrer">Fonte: McKinsey Global Survey 2025 <ArrowRight aria-hidden="true" /></a></footer></article><article className="circular-panel trust-circle-panel"><header><div><span className="panel-index">02</span><h2>O controle continua humano</h2></div><ShieldCheck aria-hidden="true" /></header><div className="trust-circle-content"><GraficoRosca data={indicadores[3].data} value="46%" caption="desconfiam" className="trust-large-pie" /><div className="pie-legend">{indicadores[3].data.map((fatia) => <p key={fatia.label}><i style={{ background: fatia.color }} /><span>{fatia.label}</span><b>{fatia.value}%</b></p>)}</div></div><p className="panel-footnote">A velocidade da IA precisa vir acompanhada de testes, revisão e fontes internas confiáveis.</p><footer><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Fonte: Stack Overflow 2025 <ArrowRight aria-hidden="true" /></a></footer></article></div><div className="circular-story-grid circular-lower-grid"><article className="circular-panel use-circle-panel"><header><div><span className="panel-index">03</span><h2>Onde a IA aparece primeiro</h2></div><Activity aria-hidden="true" /></header><div className="use-circle-body"><GraficoRosca data={usoTarefas} value="600+" caption="código" className="usage-large-pie" /><div className="pie-legend usage-legend">{usoTarefas.map((fatia) => <p key={fatia.label}><i style={{ background: fatia.color }} /><span>{fatia.label}</span><b>{fatia.value}+</b></p>)}</div></div><p className="panel-footnote">Distribuição mínima das menções qualitativas analisadas; não representa percentual de adoção.</p><footer><a href="https://dora.dev/insights/balancing-ai-tensions/" target="_blank" rel="noreferrer">Fonte: DORA, análise qualitativa de 2025 <ArrowRight aria-hidden="true" /></a></footer></article><article className="circular-panel start-circle-panel"><header><div><span className="panel-index">04</span><h2>Onde começar</h2></div><CheckCircle2 aria-hidden="true" /></header><div className="start-pie-layout"><GraficoRosca data={[{ label: "Comece por Skills", value: 25, color: "#cf6235" }, { label: "Depois MCPs", value: 25, color: "#6f9eb2" }, { label: "Depois RAG", value: 25, color: "#86b49a" }, { label: "Depois SubAgentes", value: 25, color: "#c3a0c9" }]} value="1→4" caption="evolução" /><ol><li><b>1</b>Skills</li><li><b>2</b>MCPs</li><li><b>3</b>RAG</li><li><b>4</b>SubAgentes</li></ol></div><aside><CircleAlert aria-hidden="true" /><p>Não é estatística de mercado; é um roteiro recomendado para times iniciantes.</p></aside></article></div></div></section>
    <section className="architecture-section pie-architecture-section"><div className="page-width"><div className="architecture-head"><div><p className="eyebrow">MAPA DE ARQUITETURA</p><h2>Do mais fácil de colocar em prática ao que exige mais engenharia.</h2></div><p>Esta é uma <strong>avaliação orientativa</strong>, não um ranking estatístico: cada pizza mostra esforço e complexidade em uma escala didática de 1 a 5.</p></div><div className="architecture-pie-grid">{arquiteturas.map((item) => { const Icon = item.icon; return <article className="architecture-pie-card" key={item.name}><header><Icon aria-hidden="true" /><div><span>{item.step}</span><h3>{item.name}</h3></div></header><p className="architecture-best">{item.best}</p><div className="architecture-pies"><EscoreCircular value={item.effort} label="esforço" color={item.color} /><EscoreCircular value={item.complexity} label="complexidade" color={item.color} /></div><p className="architecture-why">{item.why}</p></article>; })}</div><div className="architecture-callout"><CheckCircle2 aria-hidden="true" /><p><strong>Recomendação para começar:</strong> uma Skill de padrão Java + revisão humana. Adicione MCP, RAG e SubAgentes somente quando uma necessidade concreta exigir a próxima camada.</p></div></div></section>
  </>;
}

export default function UsagePanoramaPage() {
  return <main className="skill-reference usage-panorama-page executive-panorama circular-panorama pie-scale-expanded"><LibraryNav ativo="panorama" /><section className="executive-hero"><div className="page-width executive-hero-grid"><div><p className="eyebrow">DASHBOARD EXECUTIVO · IA CORPORATIVA</p><h1>A questão deixou de ser <em>“usar IA?”</em><br />Agora é: onde ela gera valor com segurança?</h1><p>Um retrato visual da adoção corporativa e um caminho simples para a equipe avançar sem começar pela arquitetura mais complexa.</p></div><aside className="executive-brief-card"><div><Sparkles aria-hidden="true" /><span>LEITURA RÁPIDA</span></div><strong>Uso cresce rápido.<br />Maturidade cresce <em>mais devagar.</em></strong><p>Os gráficos mostram a distância entre experimentar IA e integrá-la de verdade ao trabalho.</p></aside></div></section><PainelCircular /><section className="executive-closing"><div className="page-width executive-closing-grid"><div><p className="eyebrow">FECHAMENTO</p><h2>O melhor uso de IA não é o mais complexo.<br /><em>É o que melhora o trabalho real.</em></h2></div><div><Users aria-hidden="true" /><p>Comece pequeno, meça o efeito, mantenha revisão humana e evolua a arquitetura à medida que o time ganha maturidade.</p><div className="executive-references"><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value" target="_blank" rel="noreferrer">McKinsey 2025</a><a href="https://dora.dev/insights/balancing-ai-tensions/" target="_blank" rel="noreferrer">DORA 2025</a><a href="https://survey.stackoverflow.co/2025/ai" target="_blank" rel="noreferrer">Stack Overflow 2025</a></div></div></div></section></main>;
}
