// Sala de Controle Editorial: deck imersivo para leigos, com uma ideia dominante por tela e metáforas operacionais consistentes.
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Code2,
  Database,
  FileText,
  FolderKanban,
  GraduationCap,
  Layers3,
  Lightbulb,
  Link2,
  Menu,
  Network,
  Puzzle,
  Search,
  ShieldCheck,
  Sparkles,
  Timer,
  UsersRound,
  Workflow,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const TOTAL_SLIDES = 17;

const imagens = {
  hero: "/manus-storage/hero-context-control_b697a6ed.jpg",
  skill: "/manus-storage/skills-manual_c36dbb5c.jpg",
  mcp: "/manus-storage/mcp-bridge_feaf8711.jpg",
  subagentes: "/manus-storage/subagents-workpods_025440cb.jpg",
  logo: "/manus-storage/nexo-symbol_b1647a29.png",
};

const roteiro = [
  ["00–05", "Abertura: o problema"],
  ["05–18", "Como a IA pensa e por que contexto importa"],
  ["18–25", "O mapa: Prompt, Skill, Projeto, Subagente e MCP"],
  ["25–33", "Skills: o manual que aparece na hora certa"],
  ["33–37", "Projetos: memória de fundo"],
  ["37–45", "Subagentes: especialistas em paralelo"],
  ["45–52", "MCP: a conexão da IA com o mundo"],
  ["52–60", "Decisão, quiz e próximos passos"],
];

type MolduraProps = {
  numero: number;
  etiqueta: string;
  titulo: React.ReactNode;
  subtitulo?: React.ReactNode;
  children: React.ReactNode;
};

function Moldura({ numero, etiqueta, titulo, subtitulo, children }: MolduraProps) {
  return (
    <section className="relative z-10 flex min-h-[100svh] items-center px-5 pb-28 pt-28 md:px-12 lg:px-24">
      <div aria-hidden="true" className="pointer-events-none absolute left-5 right-5 top-[92px] hidden md:block"><div className="signal-route w-[clamp(180px,22vw,390px)]" /><span className="absolute left-[clamp(180px,22vw,390px)] top-[-4px] h-[9px] w-[9px] rounded-full bg-[#ff6958] shadow-[0_0_0_5px_rgba(255,105,88,0.10)]" /></div>
      <div aria-hidden="true" className="pointer-events-none absolute right-8 top-24 hidden lg:block opacity-60"><NexoRota /></div>
      <div className="mx-auto w-full max-w-[1380px]">
        <div className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#a9bad0] md:mb-10">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ff6958]/50 text-[#ff8174]">{String(numero + 1).padStart(2, "0")}</span>
          <span>{etiqueta}</span>
          <span className="signal-line h-px w-16" />
          <span className="text-[#607a99]">LÂMINA {String(numero + 1).padStart(2, "0")}</span>
        </div>
        <div className="mb-9 max-w-4xl md:mb-12">
          <h2 className="editorial-title text-4xl font-semibold leading-[0.98] text-[#f7f3ec] sm:text-5xl lg:text-7xl">{titulo}</h2>
          {subtitulo && <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#b6c7dc] md:text-lg">{subtitulo}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Etiqueta({ children, cor = "azul" }: { children: React.ReactNode; cor?: "azul" | "coral" | "claro" }) {
  const estilos = {
    azul: "border-[#77b9e4]/25 bg-[#77b9e4]/10 text-[#a7d9f7]",
    coral: "border-[#ff6958]/30 bg-[#ff6958]/10 text-[#ff9c91]",
    claro: "border-[#f4f0e9]/18 bg-[#f4f0e9]/7 text-[#e4edf6]",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${estilos[cor]}`}>{children}</span>;
}

function NexoRota({ compacta = false }: { compacta?: boolean }) {
  return <div className={`nexo-route ${compacta ? "scale-[0.55] origin-left" : ""}`} aria-hidden="true"><span /></div>;
}

function CartaoConceito({ icone: Icone, nome, analogia, descricao, cor }: { icone: typeof BookOpen; nome: string; analogia: string; descricao: string; cor: string }) {
  return (
    <div className="slide-card group min-h-64 rounded-[1.6rem] p-6 transition duration-200 md:p-7">
      <div className="mb-10 flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${cor}`}><Icone size={21} /></div>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#778eaa]">Função</span>
      </div>
      <h3 className="text-xl font-bold text-[#f7f3ec]">{nome}</h3>
      <p className="mt-1 text-sm font-medium text-[#ff9c91]">{analogia}</p>
      <p className="mt-5 text-sm leading-relaxed text-[#a9bad0]">{descricao}</p>
    </div>
  );
}

function FluxoMcp() {
  const etapas = [
    ["1", "Você pede", "‘Busque o relatório de vendas e envie ao gestor.’", CircleHelp],
    ["2", "A IA escolhe", "Ela identifica que precisa buscar dados e enviar e-mail.", BrainCircuit],
    ["3", "MCP conecta", "Os servidores certos conversam com banco e e-mail.", Link2],
    ["4", "A ação acontece", "Os dados voltam; o e-mail é enviado com confirmação.", CheckCircle2],
  ];
  return (
    <div className="relative grid gap-4 md:grid-cols-4 md:gap-0">
      {etapas.map(([numero, titulo, descricao, Icone], indice) => {
        const ComponenteIcone = Icone as typeof CircleHelp;
        return (
          <div key={titulo as string} className="relative md:pr-4">
            {indice < etapas.length - 1 && <div className="absolute left-[28px] top-[30px] hidden h-px w-[calc(100%-35px)] signal-line md:block" />}
            <div className="relative slide-card h-full rounded-2xl p-5">
              <div className="mb-8 flex items-center justify-between"><span className="text-3xl font-semibold text-[#ff6958]">{numero as string}</span><ComponenteIcone className="text-[#9dd7f8]" size={21} /></div>
              <h3 className="font-bold text-[#f7f3ec]">{titulo as string}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9eb3cb]">{descricao as string}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Home() {
  const [slideAtual, setSlideAtual] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);
  const [roteiroAberto, setRoteiroAberto] = useState(false);
  const [cenario, setCenario] = useState<string | null>(null);
  const [respostaQuiz, setRespostaQuiz] = useState<string | null>(null);
  const [mostrarNotas, setMostrarNotas] = useState(false);

  const progresso = useMemo(() => `${((slideAtual + 1) / TOTAL_SLIDES) * 100}%`, [slideAtual]);

  const anterior = () => setSlideAtual((atual) => Math.max(0, atual - 1));
  const proximo = () => setSlideAtual((atual) => Math.min(TOTAL_SLIDES - 1, atual + 1));
  const irPara = (indice: number) => { setSlideAtual(indice); setMenuAberto(false); setRoteiroAberto(false); };

  useEffect(() => {
    const controlarTeclado = (evento: KeyboardEvent) => {
      if (evento.key === "ArrowRight" || evento.key === " ") { evento.preventDefault(); proximo(); }
      if (evento.key === "ArrowLeft") { evento.preventDefault(); anterior(); }
      if (evento.key === "Escape") { setMenuAberto(false); setRoteiroAberto(false); }
    };
    window.addEventListener("keydown", controlarTeclado);
    return () => window.removeEventListener("keydown", controlarTeclado);
  }, []);

  const transicao = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 }, transition: { duration: 0.36, ease: "easeOut" as const } };

  const respostaCenario = {
    repetido: ["Skill", "Você está repetindo um procedimento. Transforme o jeito certo de fazer em um manual reutilizável."],
    dados: ["MCP", "A IA precisa acessar ou alterar algo fora dela: banco, Drive, Slack, CRM ou e-mail."],
    complexo: ["Subagente", "A tarefa é profunda, pode ser paralela ou precisa manter a conversa principal limpa."],
    contexto: ["Projeto", "São regras, referências e informações estáveis que devem acompanhar um mesmo tema."],
  } as Record<string, [string, string]>;

  const renderizarSlide = () => {
    switch (slideAtual) {
      case 0:
        return <Moldura numero={0} etiqueta="Sessão de 60 minutos" titulo={<>Skills, MCPs<br />e Subagentes.</>} subtitulo="Não decore siglas. Em uma hora, você vai entender quem faz o quê — e quando usar cada recurso para a IA trabalhar de verdade.">
          <div className="grid items-end gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative z-10 pb-4">
              <Etiqueta cor="coral">Programação com IA — do zero</Etiqueta>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-[#c3d1e1]">A metáfora que vai guiar tudo hoje:</p>
              <p className="editorial-title mt-3 text-3xl leading-tight text-[#f7f3ec]">“A IA é brilhante.<br /><span className="text-[#ff8174]">Mas sua mesa é pequena.</span>”</p>
              <button onClick={proximo} className="coral-button mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold">Começar a jornada <ArrowRight size={16} /></button>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-[#cfe1ef]/15 bg-[#102440] shadow-2xl shadow-black/30">
              <img src={imagens.hero} alt="Sala de controle conceitual que representa o contexto da IA" className="h-[290px] w-full object-cover object-right md:h-[370px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#102440] via-[#102440]/20 to-transparent" />
              <div className="absolute bottom-5 right-5 rounded-full border border-white/15 bg-[#091427]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d4e4f1] backdrop-blur">A empresa da IA</div>
            </div>
          </div>
        </Moldura>;
      case 1:
        return <Moldura numero={1} etiqueta="Quebra-gelo · 5 min" titulo={<>Imagine contratar<br /><em className="text-[#ff8174]">uma pessoa genial.</em></>} subtitulo="Ela aprende rápido, escreve bem e resolve problemas. Só há uma condição: em cima da mesa dela cabem poucas coisas de cada vez.">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="slide-card rounded-[1.6rem] p-7 md:col-span-2"><div className="flex items-start gap-5"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#77b9e4]/12 text-[#9dd7f8]"><BrainCircuit size={28} /></div><div><Etiqueta>IA = chefe inteligente</Etiqueta><p className="mt-5 max-w-xl text-xl font-medium leading-relaxed text-[#eff5f9]">Ela consegue raciocinar sobre o que está na mesa agora. Mas não "lembra" automaticamente do seu negócio, dos seus sistemas e do que você falou há meses.</p></div></div></div>
            <div className="rounded-[1.6rem] border border-[#ff6958]/30 bg-[#ff6958]/10 p-7"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ff9c91]">O problema real</p><p className="editorial-title mt-5 text-3xl leading-tight text-[#f7f3ec]">Como colocar só o necessário na mesa — na hora certa?</p></div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Prompt", "pedido verbal"], ["Skill", "manual de trabalho"], ["Subagente", "especialista em outra sala"], ["MCP", "conexão com o mundo"]].map(([nome, analogia], index) => <div key={nome} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"><span className="font-display text-2xl text-[#ff8174]">0{index + 1}</span><div><p className="text-sm font-bold">{nome}</p><p className="text-xs text-[#9eb3cb]">{analogia}</p></div></div>)}
          </div>
        </Moldura>;
      case 2:
        return <Moldura numero={2} etiqueta="Fundamento · 7 min" titulo={<>O que é <span className="text-[#77c5ef]">contexto?</span></>} subtitulo="Contexto é o conjunto de informações que a IA consegue enxergar antes de responder: suas instruções, o histórico, documentos, ferramentas e dados externos.">
          <div className="grid gap-7 lg:grid-cols-[1fr_0.85fr]">
            <div className="grid-lines relative overflow-hidden rounded-[2rem] border border-[#cfe1ef]/10 bg-[#10203a] p-7 md:p-10"><div className="relative z-10"><Etiqueta cor="azul">A mesa da IA</Etiqueta><h3 className="mt-5 text-2xl font-bold text-[#f7f3ec]">Tudo o que ela vê<br />antes de decidir.</h3><div className="mt-8 flex flex-wrap gap-3">{["Instruções", "Histórico", "Arquivos", "Ferramentas", "Dados externos"].map((item, index) => <motion.span initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }} key={item} className="rounded-full border border-[#77b9e4]/25 bg-[#77b9e4]/10 px-4 py-2 text-sm font-medium text-[#c8e8fb]">{item}</motion.span>)}</div></div><div className="halo-pulse absolute -bottom-20 -right-14 h-64 w-64 rounded-full border-[24px] border-[#77b9e4]/10" /></div>
            <div className="slide-card rounded-[2rem] p-7 md:p-10"><span className="text-xs font-bold uppercase tracking-[0.15em] text-[#ff9c91]">Uma unidade por vez</span><p className="editorial-title mt-4 text-4xl leading-none text-[#f7f3ec]">Token</p><p className="mt-5 text-base leading-relaxed text-[#b4c5d9]">É um pequeno pedaço de texto que a IA processa. Não precisa decorar o termo: basta lembrar que o contexto é feito de muitos pedaços e tem limite.</p><div className="mt-8 rounded-2xl bg-[#091427] p-5"><p className="text-xs leading-relaxed text-[#a9bad0]"><span className="font-bold text-[#f7f3ec]">Tradução humana:</span> contexto é a memória de trabalho. Como a nossa, ela não fica melhor porque você despejou tudo de uma vez.</p></div></div>
          </div>
        </Moldura>;
      case 3:
        return <Moldura numero={3} etiqueta="O risco · 6 min" titulo={<>Mais informação<br />nem sempre é <span className="text-[#ff8174]">melhor.</span></>} subtitulo="Quando a mesa fica cheia demais, a IA tende a perder foco. Esse efeito é conhecido como context rot: o excesso reduz a precisão para recuperar e usar a informação certa.">
          <div className="grid gap-7 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="slide-card rounded-[2rem] p-6 md:p-9"><div className="mb-7 flex items-center justify-between"><p className="text-sm font-bold text-[#eff5f9]">Atenção útil da IA</p><Etiqueta cor="coral">Ilustração conceitual</Etiqueta></div><div className="relative h-56 border-b border-l border-white/20"><div className="absolute bottom-0 left-0 h-[76%] w-[28%] rounded-tr-[5rem] border-t-2 border-[#9dd7f8] bg-gradient-to-t from-[#77b9e4]/20 to-transparent" /><div className="absolute bottom-0 left-[26%] h-[64%] w-[27%] -skew-y-[14deg] border-t-2 border-[#77b9e4] bg-gradient-to-t from-[#77b9e4]/18 to-transparent" /><div className="absolute bottom-0 left-[51%] h-[29%] w-[30%] -skew-y-[25deg] border-t-2 border-[#ff6958] bg-gradient-to-t from-[#ff6958]/20 to-transparent" /><div className="absolute -bottom-7 left-0 text-[10px] uppercase tracking-[0.15em] text-[#8da4bf]">contexto enxuto</div><div className="absolute -bottom-7 right-0 text-[10px] uppercase tracking-[0.15em] text-[#8da4bf]">contexto lotado</div><div className="absolute left-[58%] top-8 rounded-lg border border-[#ff6958]/30 bg-[#ff6958]/10 px-3 py-2 text-xs font-bold text-[#ffaaa1]">atenção se dispersa</div></div></div>
            <div className="flex flex-col justify-center"><div className="rounded-[2rem] border border-[#ff6958]/25 bg-[#ff6958]/[0.08] p-8"><p className="editorial-title text-3xl leading-tight text-[#f7f3ec]">O objetivo não é dar tudo à IA.</p><p className="mt-3 text-lg text-[#ffaba2]">É dar o essencial, no momento certo.</p></div><p className="mt-6 text-sm leading-relaxed text-[#b4c5d9]">Isso se chama <strong className="text-white">engenharia de contexto</strong>: organizar o que entra na “mesa” para aumentar foco, qualidade e consistência. [1]</p></div>
          </div>
        </Moldura>;
      case 4:
        return <Moldura numero={4} etiqueta="O mapa · 4 min" titulo={<>Conheça a <span className="text-[#ff8174]">empresa</span> da IA.</>} subtitulo="Vamos usar cinco recursos. Não são concorrentes — cada um resolve um tipo de problema.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <CartaoConceito icone={CircleHelp} nome="Prompt" analogia="um pedido verbal" descricao="Bom para algo único, imediato e conversacional." cor="bg-[#f4f0e9]/10 text-[#f4f0e9]" />
            <CartaoConceito icone={BookOpen} nome="Skill" analogia="manual de procedimentos" descricao="Ensina um jeito repetível de fazer um tipo de trabalho." cor="bg-[#77b9e4]/12 text-[#9dd7f8]" />
            <CartaoConceito icone={FolderKanban} nome="Projeto" analogia="dossiê da empresa" descricao="Mantém regras e referências de um tema ou cliente." cor="bg-[#6aa4b9]/12 text-[#9ad1df]" />
            <CartaoConceito icone={UsersRound} nome="Subagente" analogia="especialista em outra sala" descricao="Investiga fundo, em paralelo e sem bagunçar a conversa principal." cor="bg-[#ff6958]/12 text-[#ff9c91]" />
            <CartaoConceito icone={Link2} nome="MCP" analogia="USB-C para o mundo" descricao="Conecta a IA a sistemas, dados e ações externas." cor="bg-[#c3b7f2]/12 text-[#d3ccff]" />
          </div>
        </Moldura>;
      case 5:
        return <Moldura numero={5} etiqueta="Prompt · 3 min" titulo={<>Prompt é o <span className="text-[#77c5ef]">pedido</span><br />de agora.</>} subtitulo="É o que você digita para iniciar ou guiar uma conversa. Ele é rápido e útil — mas normalmente não vira um processo confiável sozinho.">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
            <div className="rounded-[2rem] border border-[#d7e7f3]/15 bg-[#f5f0e7] p-7 text-[#142541] md:p-10"><div className="flex items-center justify-between"><span className="rounded-full bg-[#142541] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5f0e7]">Você</span><ArrowRight className="text-[#ff6958]" /><span className="rounded-full bg-[#77b9e4]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">IA</span></div><p className="mt-10 font-display text-3xl leading-tight">“Resuma esta reunião em cinco decisões e próximos passos.”</p><div className="mt-8 border-t border-[#142541]/15 pt-5 text-sm leading-relaxed text-[#506176]">Um pedido claro, feito para este momento. Amanhã, você pode pedir de novo — mas a IA não ganha automaticamente um método melhor por isso.</div></div>
            <div className="slide-card rounded-[2rem] p-7 md:p-10"><Etiqueta cor="coral">Sinal de evolução</Etiqueta><p className="editorial-title mt-5 text-4xl leading-[1.06] text-[#f7f3ec]">Você digitou a mesma instrução várias vezes?</p><p className="mt-5 text-lg text-[#ff9c91]">Talvez ela esteja pedindo para virar uma Skill.</p></div>
          </div>
        </Moldura>;
      case 6:
        return <Moldura numero={6} etiqueta="Skill · 8 min" titulo={<>Skill é um <span className="text-[#77c5ef]">manual</span><br />que aparece na hora certa.</>} subtitulo="Uma Skill reúne instruções, recursos e scripts para um trabalho específico. A IA vê primeiro uma descrição curta e só abre o manual completo quando percebe que ele é relevante.">
          <div className="grid items-center gap-7 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10"><img src={imagens.skill} alt="Manual conceitual que representa uma Skill" className="h-[310px] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#091427]/45 to-transparent" /></div>
            <div className="grid gap-4 md:grid-cols-3">{[["01", "Descobre", "A IA lê apenas o nome e a descrição da Skill."], ["02", "Reconhece", "O pedido parece criar um dashboard? Essa Skill é relevante."], ["03", "Carrega", "Só então ela abre as instruções detalhadas de design."]].map(([num, titulo, desc], index) => <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.09 }} key={titulo} className="slide-card rounded-2xl p-5"><span className="text-sm font-bold text-[#ff8174]">{num}</span><h3 className="mt-8 text-lg font-bold">{titulo}</h3><p className="mt-3 text-sm leading-relaxed text-[#a9bad0]">{desc}</p></motion.div>)}</div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#77b9e4]/20 bg-[#77b9e4]/[0.07] px-5 py-4 text-sm text-[#cbe8f9]"><Sparkles size={17} className="text-[#ff8174]" /><span><strong>Nome técnico:</strong> progressive disclosure. Em português: não coloque o manual inteiro na mesa antes de precisar dele.</span></div>
        </Moldura>;
      case 7:
        return <Moldura numero={7} etiqueta="Skill · Exemplo prático" titulo={<>De prompt repetido<br />a <span className="text-[#ff8174]">processo confiável.</span></>} subtitulo="Imagine que toda semana alguém pede à IA para transformar notas de reunião em um resumo executivo. A Skill elimina o “reinventar a roda”.">
          <div className="grid gap-5 lg:grid-cols-2"><div className="rounded-[2rem] border border-white/10 bg-[#10203a] p-7 md:p-9"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a9bad0]">Antes: prompt solto</p><p className="mt-6 text-xl leading-relaxed text-[#e5edf4]">“Organize minhas notas… separe decisões… coloque responsáveis… faça em tom executivo…”</p><div className="mt-8 flex items-center gap-3 text-sm text-[#ffaaa1]"><XCircle size={18} /> Cada pessoa pede de um jeito; o resultado varia.</div></div><div className="rounded-[2rem] border border-[#ff6958]/30 bg-[#ff6958]/[0.08] p-7 md:p-9"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff9c91]">Depois: Skill “Resumo Executivo”</p><div className="mt-6 space-y-3">{["Estrutura fixa: decisões, responsáveis e próximos passos", "Tom de voz e modelo de formatação aprovados", "Checagem de itens sem responsável"].map(item => <div key={item} className="flex gap-3 text-sm leading-relaxed text-[#f5dcd7]"><CheckCircle2 className="mt-0.5 shrink-0 text-[#ff8174]" size={17} />{item}</div>)}</div><div className="mt-8 flex items-center gap-3 text-sm text-[#ffb4aa]"><CheckCircle2 size={18} /> Método consistente, reutilizável e fácil de melhorar.</div></div></div>
        </Moldura>;
      case 8:
        return <Moldura numero={8} etiqueta="Projeto · 4 min" titulo={<>Projeto é a <span className="text-[#77c5ef]">história de fundo.</span></>} subtitulo="Ele reúne contexto duradouro de um tema: materiais, regras, conversas e referências. É como o dossiê de uma conta ou iniciativa que a IA pode consultar naquele espaço de trabalho.">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]"><div className="slide-card relative overflow-hidden rounded-[2rem] p-7 md:p-10"><div className="absolute right-0 top-0 h-32 w-32 rounded-bl-[6rem] bg-[#77b9e4]/10" /><FolderKanban size={32} className="text-[#9dd7f8]" /><h3 className="editorial-title mt-8 text-4xl text-[#f7f3ec]">Projeto:<br />“Cliente Aurora”</h3><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Tom da marca", "Público-alvo", "Apresentações anteriores", "Políticas e restrições"].map(item => <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-[#cfdeeb]"><FileText className="mr-2 inline text-[#ff8174]" size={15} />{item}</div>)}</div></div><div className="flex flex-col justify-center"><p className="editorial-title text-4xl leading-tight text-[#f7f3ec]">Ele não ensina um procedimento específico.</p><p className="mt-5 text-lg leading-relaxed text-[#b4c5d9]">Ele dá <strong className="text-white">contexto persistente</strong>. Use para aquilo que a IA precisa saber repetidamente sobre um mesmo assunto, mas não para uma receita de execução.</p><div className="mt-7 rounded-2xl border border-[#77b9e4]/20 bg-[#77b9e4]/[0.07] p-5 text-sm leading-relaxed text-[#c9e7f9]"><strong>Diferença essencial:</strong> Projeto é o dossiê. Skill é o manual.</div></div></div>
        </Moldura>;
      case 9:
        return <Moldura numero={9} etiqueta="Subagentes · 8 min" titulo={<>Subagente é um <span className="text-[#ff8174]">especialista</span><br />em outra sala.</>} subtitulo="O agente principal delega uma tarefa profunda. O subagente recebe sua própria área de trabalho, investiga, e devolve só o resultado que importa.">
          <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]"><div className="relative overflow-hidden rounded-[2rem] border border-white/10"><img src={imagens.subagentes} alt="Especialistas trabalhando em pods separados representam subagentes" className="h-[320px] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#091427]/80 via-transparent to-transparent" /><div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-[#091427]/72 p-4 text-sm text-[#d8e6f0] backdrop-blur"><strong className="text-[#ff9c91]">O isolamento é a chave:</strong> o “lixo técnico” da investigação não ocupa a conversa principal.</div></div><div className="space-y-4">{[[Search, "Explorar", "Mapear arquivos, pesquisar possibilidades, vasculhar uma base grande."], [ShieldCheck, "Revisar", "Fazer auditoria de código, segurança ou qualidade com olhar independente."], [Workflow, "Executar em paralelo", "Dividir partes de um problema para retornar mais rápido."]].map(([Icone, nome, descricao]) => { const ComponenteIcone = Icone as typeof Search; return <div key={nome as string} className="slide-card flex gap-5 rounded-2xl p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff6958]/12 text-[#ff9c91]"><ComponenteIcone size={20} /></div><div><h3 className="font-bold">{nome as string}</h3><p className="mt-1 text-sm leading-relaxed text-[#a9bad0]">{descricao as string}</p></div></div>})}</div></div>
        </Moldura>;
      case 10:
        return <Moldura numero={10} etiqueta="Subagentes · Por que usar" titulo={<>Um chefe. Três especialistas.<br /><span className="text-[#77c5ef]">Uma resposta limpa.</span></>} subtitulo="Não é mágica: é organização do trabalho. O agente principal controla a missão; subagentes atacam subproblemas isoladamente e reportam apenas conclusões úteis.">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]"><div className="rounded-[2rem] border border-[#ff6958]/30 bg-[#ff6958]/[0.08] p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff9c91]">A tarefa</p><p className="editorial-title mt-5 text-3xl leading-tight">“Avalie este projeto antes de publicar.”</p><div className="mt-8 rounded-2xl bg-[#091427]/65 p-5"><p className="text-sm leading-relaxed text-[#cddde9]">O agente principal não precisa ler todos os arquivos e logs. Ele delega cada investigação e recebe um resumo final.</p></div></div><div className="grid gap-4 sm:grid-cols-3">{[[Code2, "Revisor de código", "Encontra bugs e padrões frágeis."], [ShieldCheck, "Auditor de segurança", "Procura riscos e permissões excessivas."], [ClipboardList, "Explorador", "Resume a arquitetura e as dependências."]].map(([Icone, nome, descricao], indice) => { const ComponenteIcone = Icone as typeof Code2; return <motion.div key={nome as string} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: indice * 0.1 }} className="slide-card rounded-2xl p-5"><div className="flex items-center justify-between"><ComponenteIcone className="text-[#9dd7f8]" size={22} /><span className="status-dot" /></div><p className="mt-12 text-base font-bold">{nome as string}</p><p className="mt-3 text-sm leading-relaxed text-[#a9bad0]">{descricao as string}</p></motion.div>})}</div></div>
          <p className="mt-6 text-center text-sm text-[#90a7c1]">Trabalho profundo e paralelo <span className="mx-2 text-[#ff8174]">→</span> retorno compacto <span className="mx-2 text-[#ff8174]">→</span> contexto principal preservado</p>
        </Moldura>;
      case 11:
        return <Moldura numero={11} etiqueta="MCP · 7 min" titulo={<>MCP é o <span className="text-[#ff8174]">USB-C</span><br />da IA.</>} subtitulo="Model Context Protocol é um padrão aberto para conectar a IA a dados, sistemas e ferramentas externas de um jeito padronizado. Ele deixa a IA sair do “só conversa” e passar a consultar ou agir no mundo real. [2]">
          <div className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]"><div className="relative overflow-hidden rounded-[2rem] border border-white/10"><img src={imagens.mcp} alt="Hub conceitual conecta a IA a dados e ferramentas externas via MCP" className="h-[330px] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#091427]/48 to-transparent" /></div><div className="grid gap-4 sm:grid-cols-3">{[[Database, "Banco de dados", "buscar vendas, estoque, clientes"], [FileText, "Documentos", "consultar Drive, políticas, propostas"], [BriefcaseBusiness, "Sistemas", "atualizar CRM, abrir tarefa, enviar e-mail"]].map(([Icone, nome, exemplo]) => { const ComponenteIcone = Icone as typeof Database; return <div key={nome as string} className="slide-card rounded-2xl p-5"><ComponenteIcone className="text-[#ff9c91]" size={23} /><p className="mt-10 font-bold">{nome as string}</p><p className="mt-2 text-sm leading-relaxed text-[#a9bad0]">{exemplo as string}</p></div>})}</div></div>
          <div className="mt-6 rounded-2xl border border-[#77b9e4]/20 bg-[#77b9e4]/[0.07] p-5 text-sm leading-relaxed text-[#cbe8f9]"><strong>A diferença importante:</strong> MCP não é uma única integração. É um padrão: em vez de criar um conector exclusivo para cada IA e cada sistema, todos falam a mesma “língua”.</div>
        </Moldura>;
      case 12:
        return <Moldura numero={12} etiqueta="MCP · Passo a passo" titulo={<>Um pedido do mundo real,<br />sem <span className="text-[#77c5ef]">tecnês.</span></>} subtitulo="Vamos traduzir o fluxo de uma automação típica. A IA sabe o que você quer; o MCP dá a ela um caminho controlado para usar as ferramentas certas.">
          <FluxoMcp />
          <p className="mt-8 text-center text-sm text-[#90a7c1]">Na prática, o app de IA usa um <strong className="text-[#f4f0e9]">cliente MCP</strong> para conversar com <strong className="text-[#f4f0e9]">servidores MCP</strong>, que expõem dados ou ações de sistemas externos. [3]</p>
        </Moldura>;
      case 13:
        return <Moldura numero={13} etiqueta="Comparação · 4 min" titulo={<>Não confunda <span className="text-[#ff8174]">cabo</span><br />com <span className="text-[#77c5ef]">manual.</span></>} subtitulo="Skills e MCPs trabalham muito bem juntos, mas têm papéis diferentes. Essa é a comparação que mais evita confusão.">
          <div className="overflow-hidden rounded-[2rem] border border-white/10"><div className="grid grid-cols-[0.72fr_1fr_1fr] border-b border-white/10 bg-white/[0.04] text-sm font-bold"><div className="p-5 text-[#90a7c1]">Pergunta</div><div className="p-5 text-[#9dd7f8]">Skill</div><div className="p-5 text-[#ff9c91]">MCP</div></div>{[["O que é?", "Instruções reutilizáveis para fazer um trabalho.", "Protocolo para conectar IA a dados e ações."], ["Analogia", "Manual de procedimentos.", "Cabo/USB-C que conecta ao mundo."], ["Pergunta que resolve", "‘Como a IA deve executar isto?’", "‘A que sistema a IA precisa acessar?’"], ["Exemplo", "Padronizar resumo de reunião.", "Buscar vendas no banco e enviar e-mail."]].map(([pergunta, skill, mcp]) => <div key={pergunta} className="grid grid-cols-[0.72fr_1fr_1fr] border-b border-white/10 last:border-0 text-sm"><div className="bg-white/[0.025] p-5 font-bold text-[#d7e2ec]">{pergunta}</div><div className="p-5 leading-relaxed text-[#b5c8dc]">{skill}</div><div className="p-5 leading-relaxed text-[#b5c8dc]">{mcp}</div></div>)}</div>
          <div className="mt-6 rounded-2xl border border-[#ff6958]/25 bg-[#ff6958]/[0.08] p-5 text-center text-base text-[#f7dad6]"><strong>Juntos:</strong> o MCP dá acesso ao CRM; a Skill ensina a IA a qualificar uma oportunidade e registrar o resultado do jeito certo.</div>
        </Moldura>;
      case 14:
        return <Moldura numero={14} etiqueta="Decisão · 4 min" titulo={<>Qual recurso<br />você escolheria?</>} subtitulo="Clique em uma situação. A resposta aparece com a lógica — a meta é sair daqui sabendo fazer a primeira triagem.">
          <div className="grid gap-4 sm:grid-cols-2">{[["repetido", "Faço o mesmo pedido de formatação toda semana.", BookOpen], ["dados", "Preciso que a IA consulte nosso CRM ou envie um e-mail.", Link2], ["complexo", "Tenho uma auditoria grande de código para investigar.", UsersRound], ["contexto", "A IA precisa saber sempre as regras e materiais do Cliente Aurora.", FolderKanban]].map(([chave, texto, Icone]) => { const ComponenteIcone = Icone as typeof BookOpen; return <button onClick={() => setCenario(chave as string)} key={chave as string} className="choice-button flex items-start gap-5 rounded-2xl p-6 text-left"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#77b9e4]/10 text-[#9dd7f8]"><ComponenteIcone size={20} /></div><span className="text-base leading-relaxed text-[#e4edf5]">{texto as string}</span></button>})}</div>
          <AnimatePresence mode="wait">{cenario && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-6 rounded-[1.5rem] border border-[#ff6958]/30 bg-[#ff6958]/[0.1] p-6"><Etiqueta cor="coral">Resposta: {respostaCenario[cenario][0]}</Etiqueta><p className="mt-4 text-lg leading-relaxed text-[#f6d8d4]">{respostaCenario[cenario][1]}</p></motion.div>}</AnimatePresence>
        </Moldura>;
      case 15:
        return <Moldura numero={15} etiqueta="Fechamento · 4 min" titulo={<>Mini quiz.<br /><span className="text-[#ff8174]">Sem pressão.</span></>} subtitulo="Teste a sua nova intuição. Qual recurso combina melhor com o caso abaixo?">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[#10203a] p-7 md:p-10"><Etiqueta>O cenário</Etiqueta><p className="editorial-title mt-6 text-3xl leading-tight text-[#f7f3ec]">“Quero que a IA verifique todos os arquivos de um projeto, procure riscos de segurança e me devolva só os pontos críticos.”</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{[["skill", "Skill"], ["mcp", "MCP"], ["subagente", "Subagente"]].map(([chave, nome]) => <button key={chave} onClick={() => setRespostaQuiz(chave)} className={`choice-button rounded-xl px-5 py-4 text-sm font-bold ${respostaQuiz === chave ? "border-[#ff6958] bg-[#ff6958]/15 text-[#ffb4aa]" : "text-[#e5edf4]"}`}>{nome}</button>)}</div><AnimatePresence>{respostaQuiz && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 rounded-2xl p-5 text-sm leading-relaxed ${respostaQuiz === "subagente" ? "bg-[#77b9e4]/10 text-[#cceafa]" : "bg-[#ff6958]/10 text-[#ffcdc7]"}`}>{respostaQuiz === "subagente" ? <><CheckCircle2 className="mr-2 inline text-[#9dd7f8]" size={18} /><strong>Isso.</strong> É uma investigação profunda que deve ocorrer isoladamente, para devolver um resumo útil sem poluir a conversa principal.</> : <><XCircle className="mr-2 inline text-[#ff9c91]" size={18} /><strong>Quase.</strong> MCP poderia dar acesso aos arquivos; uma Skill poderia orientar o método. Mas quem deve executar a investigação profunda, isolada e resumida é o <strong>Subagente</strong>.</>}</motion.div>}</AnimatePresence></div>
        </Moldura>;
      default:
        return <Moldura numero={16} etiqueta="A síntese · 4 min" titulo={<>A pergunta certa<br />não é “qual sigla?”</>} subtitulo="É: qual parte do trabalho eu preciso organizar agora?">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[[BookOpen, "Skill", "Preciso de um método reutilizável."], [FolderKanban, "Projeto", "Preciso de contexto de fundo."], [UsersRound, "Subagente", "Preciso delegar trabalho profundo."], [Link2, "MCP", "Preciso acessar o mundo externo."]].map(([Icone, nome, frase]) => { const ComponenteIcone = Icone as typeof BookOpen; return <div key={nome as string} className="slide-card rounded-2xl p-6"><ComponenteIcone className="text-[#ff8174]" size={25} /><p className="mt-12 text-lg font-bold">{nome as string}</p><p className="mt-3 text-sm leading-relaxed text-[#a9bad0]">{frase as string}</p></div>})}</div>
          <div className="mt-8 grid gap-5 rounded-[2rem] border border-[#ff6958]/30 bg-gradient-to-r from-[#ff6958]/15 to-[#ff6958]/[0.03] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9"><div><p className="editorial-title text-3xl leading-tight text-[#f7f3ec]">Comece pequeno. Observe repetição. Organize o contexto.</p><p className="mt-3 text-sm text-[#f1c4bf]">Isso é engenharia de contexto: menos ruído, mais foco, melhores resultados.</p></div><button onClick={() => irPara(0)} className="nav-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold">Recomeçar <ArrowLeft size={16} /></button></div>
          <div className="mt-8 text-center text-xs text-[#829bb6]">Fontes: vídeo-base indicado · Anthropic, “Effective context engineering for AI agents” [1] · Anthropic, “Introducing the Model Context Protocol” [2] · Google Cloud, “What is the MCP and how does it work?” [3].</div>
        </Moldura>;
    }
  };

  return (
    <main className="presentation-shell">
      <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-8">
        <button onClick={() => irPara(0)} className="flex items-center gap-3 text-left"><img src={imagens.logo} alt="Símbolo Nexo" className="h-12 w-12 object-contain" /><span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[#dce8f2] sm:block">Nexo / IA</span><NexoRota compacta /></button>
        <div className="hidden items-center gap-3 md:flex"><button onClick={() => setMostrarNotas(!mostrarNotas)} className={`nav-button rounded-full px-4 py-2 text-xs font-bold ${mostrarNotas ? "border-[#ff6958]/60 text-[#ff9c91]" : ""}`}>{mostrarNotas ? "Notas ativas" : "Notas do apresentador"}</button><button onClick={() => setRoteiroAberto(!roteiroAberto)} className="nav-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold">Roteiro <ChevronDown size={14} /></button></div>
        <button onClick={() => setMenuAberto(!menuAberto)} className="nav-button flex h-10 w-10 items-center justify-center rounded-full md:hidden" aria-label="Abrir menu">{menuAberto ? <X size={18} /> : <Menu size={18} />}</button>
      </header>

      <div className="fixed bottom-0 left-0 top-0 z-20 hidden w-[5px] md:block"><div className="progress-rail h-full w-full" style={{ "--progress": progresso } as React.CSSProperties} /></div>

      <AnimatePresence mode="wait"><motion.div key={slideAtual} {...transicao}>{renderizarSlide()}</motion.div></AnimatePresence>

      {mostrarNotas && <div className="fixed bottom-24 left-5 z-30 max-w-md rounded-2xl border border-[#ff6958]/30 bg-[#10223b]/95 p-4 text-xs leading-relaxed text-[#d5e4ef] shadow-2xl backdrop-blur md:left-10">{slideAtual === 0 ? "Abra dizendo que ninguém precisa sair daqui decorando siglas. A missão é aprender a reconhecer o problema e escolher o recurso correto." : slideAtual === 3 ? "Destaque que contexto cheio não é garantia de qualidade: a IA precisa de informação relevante, organizada e carregada no momento correto." : slideAtual === 11 ? "Use a analogia do USB-C: o MCP padroniza a conexão; ele não decide o que fazer por conta própria." : slideAtual === 16 ? "Feche com a pergunta decisória: método repetível, contexto persistente, trabalho profundo ou acesso externo?" : "Use a analogia da Empresa da IA. Ela reduz a ansiedade do público e transforma siglas em papéis de trabalho."}</div>}

      <nav className="deck-counter fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full px-2 py-2"><button onClick={anterior} disabled={slideAtual === 0} className="nav-button flex h-10 w-10 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-35" aria-label="Slide anterior"><ArrowLeft size={17} /></button><span className="min-w-24 px-1 text-center text-[10px] font-bold tracking-[0.15em] text-[#b7c9db]">LÂMINA {String(slideAtual + 1).padStart(2, "0")} <span className="text-[#ff8174]">/</span> {TOTAL_SLIDES}</span><button onClick={proximo} disabled={slideAtual === TOTAL_SLIDES - 1} className="coral-button flex h-10 w-10 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-35" aria-label="Próximo slide"><ArrowRight size={17} /></button></nav>

      <AnimatePresence>{(menuAberto || roteiroAberto) && <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.22 }} className="fixed right-5 top-20 z-40 max-h-[76vh] w-[min(360px,calc(100vw-2.5rem))] overflow-y-auto rounded-[1.5rem] border border-white/15 bg-[#10213b]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-bold">{roteiroAberto ? "Roteiro de 60 minutos" : "Navegação"}</p><p className="mt-1 text-xs text-[#8ea6c0]">{roteiroAberto ? "Ritmo sugerido para apresentar" : "Clique para ir direto a uma tela"}</p></div><button onClick={() => { setMenuAberto(false); setRoteiroAberto(false); }} className="text-[#9db2c8]"><X size={18} /></button></div>{roteiroAberto ? <div className="space-y-2">{roteiro.map(([tempo, tema]) => <div key={tempo} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-3"><span className="shrink-0 text-xs font-bold text-[#ff9c91]">{tempo}</span><span className="text-sm leading-relaxed text-[#d7e4ed]">{tema}</span></div>)}</div> : <div className="space-y-1">{["Abertura", "A pessoa genial", "Contexto", "Context rot", "O mapa", "Prompt", "Skills", "Skill na prática", "Projeto", "Subagentes", "Paralelismo", "MCP", "MCP em ação", "Skill x MCP", "Decisão", "Quiz", "Síntese"].map((item, indice) => <button key={item} onClick={() => irPara(indice)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${slideAtual === indice ? "bg-[#ff6958]/14 text-[#ffb1a8]" : "text-[#c7d6e3] hover:bg-white/[0.06]"}`}><span className="w-5 text-[10px] font-bold text-[#7890aa]">{String(indice + 1).padStart(2, "0")}</span>{item}</button>)}</div>}</motion.aside>}</AnimatePresence>
    </main>
  );
}

export default Home;
