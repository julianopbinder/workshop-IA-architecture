// Central de Verificação: perguntas, identificação simples, rodadas cronometradas e placar compartilhado.
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, CircleHelp, Clock3, Crown, Loader2, Medal, RotateCcw, Send, Trophy, UserRound, X } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";
import { trpc } from "@/lib/trpc";
import { getQuizRoundRemainingMilliseconds, isQuizRoundOpen } from "@shared/quizRound";
import "./QuizPage.css";

type Tema = "skill" | "mcps" | "subagentes" | "rag";
type Questao = { id: string; enunciado: string; alternativas: string[]; correta: number; explicacao: string };
type FrenteQuiz = { nome: string; subtitulo: string; perguntas: Questao[] };

// As respostas corretas estão distribuídas entre A, B e C para evitar um padrão previsível.
const quiz: Record<Tema, FrenteQuiz> = {
  skill: { nome: "Skill", subtitulo: "Regras e fluxos reutilizáveis", perguntas: [
    { id: "skill-1", enunciado: "Qual é a melhor definição de uma Skill?", alternativas: ["Um banco de dados de documentos", "Um modelo de IA treinado do zero", "Uma instrução reutilizável com regras ou passos"], correta: 2, explicacao: "Skills registram instruções, padrões e fluxos que a IA pode reaplicar." },
    { id: "skill-2", enunciado: "Quando uma Skill é especialmente útil?", alternativas: ["Quando o time quer repetir um processo aprovado", "Quando é preciso substituir o Java", "Quando a IA precisa acessar uma API externa"], correta: 0, explicacao: "Use uma Skill para manter consistência em tarefas repetidas, como revisão de código." },
    { id: "skill-3", enunciado: "Qual arquivo costuma ser obrigatório em uma Skill estruturada?", alternativas: ["BancoDeDados.sql", "SKILL.md", "RESPOSTA.txt"], correta: 1, explicacao: "O arquivo SKILL.md descreve nome, finalidade e instruções da Skill." },
    { id: "skill-4", enunciado: "Uma Skill de referência normalmente define:", alternativas: ["Permissões para bancos de dados", "A velocidade da internet", "Convenções de código e guias de estilo"], correta: 2, explicacao: "Skills de referência orientam padrões que o time quer manter." },
    { id: "skill-5", enunciado: "Qual problema uma Skill ajuda a evitar?", alternativas: ["Escrever testes automatizados", "Copiar e colar o mesmo processo toda vez", "Abrir o editor de código"], correta: 1, explicacao: "A Skill centraliza um processo para que ele seja reutilizado com consistência." },
  ] },
  mcps: { nome: "MCPs", subtitulo: "Ponte para ferramentas e serviços", perguntas: [
    { id: "mcp-1", enunciado: "Qual é o papel principal de um MCP?", alternativas: ["Guardar a memória da conversa", "Conectar a IA a ferramentas e serviços", "Substituir um desenvolvedor"], correta: 1, explicacao: "O MCP organiza como uma IA acessa ferramentas, prompts e recursos externos." },
    { id: "mcp-2", enunciado: "No exemplo Python, server.py faz o quê?", alternativas: ["Guarda a ferramenta MCP disponível", "Mostra apenas uma imagem", "Executa o teste JUnit"], correta: 0, explicacao: "server.py define a ferramenta que será oferecida pelo servidor MCP." },
    { id: "mcp-3", enunciado: "No exemplo Python, testar_mcp.py faz o quê?", alternativas: ["Instala o IntelliJ", "Cria o banco de dados vetorial", "Chama uma ferramenta e mostra a resposta"], correta: 2, explicacao: "O arquivo de teste simula o uso da ferramenta e exibe o retorno no terminal." },
    { id: "mcp-4", enunciado: "Qual item de um MCP representa uma ação que a IA pode executar?", alternativas: ["Tool", "Histórico", "Resource"], correta: 0, explicacao: "Uma Tool é uma ação disponível, como consultar ou criar um registro." },
    { id: "mcp-5", enunciado: "MCP é mais indicado quando a IA precisa:", alternativas: ["Repetir um padrão de documentação", "Dividir uma tarefa em especialistas", "Usar um sistema externo de forma organizada"], correta: 2, explicacao: "MCP é a ponte para ações e dados em serviços externos." },
  ] },
  subagentes: { nome: "SubAgentes", subtitulo: "Frentes especializadas de trabalho", perguntas: [
    { id: "sub-1", enunciado: "O que caracteriza um SubAgente?", alternativas: ["Um arquivo de configuração de rede", "Uma cópia do banco de dados", "Uma frente de IA com contexto e foco próprios"], correta: 2, explicacao: "SubAgentes podem atuar com missão, contexto e permissões específicos." },
    { id: "sub-2", enunciado: "Por que usar SubAgentes em uma tarefa complexa?", alternativas: ["Para delegar frentes e receber resultados resumidos", "Para trocar a linguagem de programação", "Para armazenar documentos"], correta: 0, explicacao: "O agente principal coordena enquanto especialistas executam partes da missão." },
    { id: "sub-3", enunciado: "O contexto de um SubAgente normalmente é:", alternativas: ["Idêntico a todos os usuários", "Isolado da conversa principal", "Um endereço de internet"], correta: 1, explicacao: "O isolamento ajuda a manter cada investigação ou execução focada." },
    { id: "sub-4", enunciado: "Qual combinação é um bom exemplo de SubAgentes?", alternativas: ["Pesquisa, DevOps e Qualidade trabalhando em paralelo", "Três cópias da mesma senha", "Um único prompt sem objetivo"], correta: 0, explicacao: "Especialistas podem trabalhar em paralelo e retornar ao coordenador." },
    { id: "sub-5", enunciado: "Como uma Skill pode ajudar um SubAgente?", alternativas: ["Substituindo a permissão de acesso", "Apagando o resultado do trabalho", "Dando um playbook que ele deve seguir"], correta: 2, explicacao: "A Skill padroniza o método; o SubAgente aplica esse método em uma missão." },
  ] },
  rag: { nome: "RAG", subtitulo: "Consulta baseada em conhecimento confiável", perguntas: [
    { id: "rag-1", enunciado: "RAG é um agente de IA?", alternativas: ["Sim; sempre decide e executa ações", "Não; é um processo de busca e contexto", "Sim; é um tipo de banco de dados"], correta: 1, explicacao: "RAG recupera informação relevante para enriquecer a resposta do modelo." },
    { id: "rag-2", enunciado: "Qual é o objetivo do pipeline de ingestão?", alternativas: ["Criar novas regras de código", "Responder diretamente à pergunta do usuário", "Preparar documentos para busca posterior"], correta: 2, explicacao: "A ingestão lê, organiza, divide e indexa os documentos antes das consultas." },
    { id: "rag-3", enunciado: "Qual é o objetivo do pipeline de consulta?", alternativas: ["Encontrar trechos relevantes para a pergunta", "Instalar bibliotecas Python", "Delegar uma missão a SubAgentes"], correta: 0, explicacao: "Na consulta, o sistema busca os melhores trechos e monta o contexto para o modelo." },
    { id: "rag-4", enunciado: "O que são chunks em um RAG?", alternativas: ["Erros do modelo", "Partes menores de um documento", "Servidores MCP"], correta: 1, explicacao: "Documentos são divididos em chunks para facilitar uma busca precisa." },
    { id: "rag-5", enunciado: "Como um agente pode usar RAG?", alternativas: ["Eliminando a necessidade de fontes", "Transformando RAG em uma Tool automaticamente", "Consultando a base antes de decidir ou responder"], correta: 2, explicacao: "O agente pode usar o resultado da consulta RAG como informação para sua próxima ação." },
  ] },
};

const temas = Object.keys(quiz) as Tema[];
const participantNameStorageKey = "nexo-quiz-participant-name";
const participantIdStorageKey = "nexo-quiz-participant-id";

function getStoredName() { return typeof window === "undefined" ? "" : window.localStorage.getItem(participantNameStorageKey) ?? ""; }
function getParticipantKey() {
  if (typeof window === "undefined") return "00000000-0000-4000-8000-000000000000";
  const existingKey = window.localStorage.getItem(participantIdStorageKey);
  if (existingKey) return existingKey;
  const newKey = crypto.randomUUID();
  window.localStorage.setItem(participantIdStorageKey, newKey);
  return newKey;
}
function formatClock(milliseconds: number) {
  const seconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}
function RankingMedal({ position }: { position: number }) {
  if (position === 1) return <Crown className="leaderboard-gold" size={19} aria-label="Medalha de ouro" />;
  if (position === 2) return <Medal className="leaderboard-silver" size={19} aria-label="Medalha de prata" />;
  if (position === 3) return <Medal className="leaderboard-bronze" size={19} aria-label="Medalha de bronze" />;
  return <span className="leaderboard-position">{String(position).padStart(2, "0")}</span>;
}

export default function QuizPage() {
  const [tema, setTema] = useState<Tema>("skill");
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [participantName, setParticipantName] = useState(getStoredName);
  const [participantKey] = useState(getParticipantKey);
  const [participantReady, setParticipantReady] = useState(false);
  const [nameError, setNameError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const atual = quiz[tema];
  const trpcUtils = trpc.useUtils();
  const leaderboardQuery = trpc.quiz.leaderboard.useQuery(undefined, { refetchInterval: 5_000 });
  const round = leaderboardQuery.data?.round;
  const participation = leaderboardQuery.data?.participation ?? { started: 0, completed: 0 };
  const remainingMilliseconds = getQuizRoundRemainingMilliseconds(round, now);
  const roundOpen = isQuizRoundOpen(round, now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!round?.id) {
      setParticipantReady(false);
      return;
    }

    const joinedRoundId = Number(window.localStorage.getItem("quiz-participant-round-id"));
    setParticipantReady(Boolean(participantName && joinedRoundId === round.id));
  }, [round?.id]);

  const pointsByTheme = useMemo(() => temas.reduce((accumulator, currentTheme) => {
    accumulator[currentTheme] = quiz[currentTheme].perguntas.filter((pergunta) => respostas[pergunta.id] === pergunta.correta).length;
    return accumulator;
  }, {} as Record<Tema, number>), [respostas]);
  const totalScore = temas.reduce((total, currentTheme) => total + pointsByTheme[currentTheme], 0);
  const totalAnswered = temas.reduce((total, currentTheme) => total + quiz[currentTheme].perguntas.filter((pergunta) => respostas[pergunta.id] !== undefined).length, 0);
  const points = pointsByTheme[tema];
  const answered = atual.perguntas.filter((pergunta) => respostas[pergunta.id] !== undefined).length;
  const quizComplete = totalAnswered === 20;

  const submitScore = trpc.quiz.submitScore.useMutation({
    onSuccess: async () => { setSubmissionMessage("Sua pontuação entrou no placar desta rodada."); await trpcUtils.quiz.leaderboard.invalidate(); },
    onError: (error) => setSubmissionMessage(error.message || "Não foi possível registrar agora. Verifique a conexão e tente novamente."),
  });
  const joinRound = trpc.quiz.joinRound.useMutation({
    onSuccess: async ({ round: joinedRound, joinedAt }, input) => {
      window.localStorage.setItem(participantNameStorageKey, input.participantName);
      window.localStorage.setItem("quiz-participant-round-id", String(joinedRound.id));
      setParticipantName(input.participantName);
      setParticipantReady(true);
      setNameError("");
      setSubmissionMessage(`Entrada registrada às ${new Date(joinedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.`);
      await trpcUtils.quiz.leaderboard.invalidate();
    },
    onError: (error) => setNameError(error.message || "Não foi possível registrar sua entrada agora."),
  });
  const startNextRound = trpc.quiz.startNextRound.useMutation({
    onSuccess: async () => {
      setRespostas({}); setTema("skill"); setParticipantReady(false); setSubmissionMessage("Nova rodada aberta. O relógio foi reiniciado em 10:00.");
      await trpcUtils.quiz.leaderboard.invalidate();
    },
    onError: () => setSubmissionMessage("Não foi possível começar uma nova rodada agora. Tente novamente em instantes."),
  });
  const finishRound = trpc.quiz.finishRound.useMutation({
    onSuccess: async () => {
      setSubmissionMessage("Quiz finalizado. O placar desta rodada permanece disponível para consulta.");
      await trpcUtils.quiz.leaderboard.invalidate();
    },
    onError: () => setSubmissionMessage("Não foi possível finalizar o Quiz agora. Tente novamente em instantes."),
  });

  function confirmarParticipante(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = participantName.replace(/\s+/g, " ").trim();
    if (normalizedName.length < 2) { setNameError("Digite pelo menos dois caracteres para entrar no placar."); return; }
    if (normalizedName.includes(" ")) { setNameError("Use somente seu primeiro nome no placar."); return; }
    setParticipantName(normalizedName); setNameError("");
    joinRound.mutate({ participantName: normalizedName, participantKey });
  }
  function selecionar(questionId: string, alternative: number) { if (roundOpen) setRespostas((previousAnswers) => ({ ...previousAnswers, [questionId]: alternative })); }
  function reiniciarTema() {
    setRespostas((previousAnswers) => {
      const nextAnswers = { ...previousAnswers }; atual.perguntas.forEach((question) => delete nextAnswers[question.id]); return nextAnswers;
    });
    setSubmissionMessage("");
  }
  function enviarPontuacao() {
    if (!roundOpen) { setSubmissionMessage("O tempo desta rodada terminou. Aguarde o próximo COMEÇAR QUIZ."); return; }
    if (!quizComplete || !participantReady || submitScore.isPending) return;
    setSubmissionMessage("");
    submitScore.mutate({ participantName, participantKey, totalScore, skillScore: pointsByTheme.skill, mcpScore: pointsByTheme.mcps, subagentsScore: pointsByTheme.subagentes, ragScore: pointsByTheme.rag });
  }
  function comecarQuiz() {
    if (!window.confirm("Começar o Quiz para a equipe? O relógio terá 10 minutos.")) return;
    startNextRound.mutate();
  }
  function finalizarQuiz() {
    if (!window.confirm("Finalizar o Quiz agora? Nenhuma nova resposta poderá entrar no placar desta rodada.")) return;
    finishRound.mutate();
  }

  return <main className="skill-reference quiz-page">
    <LibraryNav ativo="quiz" />
    <section className="quiz-hero"><div className="page-width quiz-hero-grid">
      <div><p className="quiz-kicker"><CircleHelp size={15} />CENTRAL DE VERIFICAÇÃO</p><h1>Teste o que você <em>entendeu.</em></h1><p>Clique em COMEÇAR QUIZ na sua máquina. Durante dez minutos, toda a equipe entra pelo primeiro nome e responde as quatro frentes.</p></div>
      <div className="quiz-round-control"><div className={`quiz-round-clock ${roundOpen ? "" : "is-closed"}`}><Clock3 size={19} /><div><small>{roundOpen ? "QUIZ EM ANDAMENTO · TEMPO RESTANTE" : "QUIZ AGUARDANDO INÍCIO"}</small><strong>{leaderboardQuery.isLoading ? "--:--" : formatClock(remainingMilliseconds)}</strong></div></div><div className="quiz-round-buttons"><button type="button" onClick={comecarQuiz} disabled={roundOpen || startNextRound.isPending}>{startNextRound.isPending ? <><Loader2 size={14} className="quiz-spin" />COMEÇANDO…</> : "COMEÇAR QUIZ"}</button><button type="button" className="quiz-finish-button" onClick={finalizarQuiz} disabled={!roundOpen || finishRound.isPending}>{finishRound.isPending ? <><Loader2 size={14} className="quiz-spin" />FINALIZANDO…</> : "FINALIZAR QUIZ"}</button></div></div>
    </div></section>
    <section className="quiz-workspace"><div className="page-width">
      {!leaderboardQuery.isLoading && !roundOpen && <aside className="quiz-round-closed"><Clock3 size={22} /><div><p>QUIZ AGUARDANDO INÍCIO</p><strong>O Quiz ainda não começou ou já foi finalizado.</strong><span>Clique em COMEÇAR QUIZ acima. Quando iniciar, todos terão dez minutos para responder.</span></div></aside>}
      {roundOpen && <div className="quiz-participation-summary"><span>PARTICIPAÇÃO DA RODADA</span><strong>{participation.started} {participation.started === 1 ? "entrou" : "entraram"} · {participation.completed} {participation.completed === 1 ? "concluiu" : "concluíram"}</strong></div>}
      {roundOpen && !participantReady && <div className="quiz-name-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-name-title"><form className="quiz-name-modal-card" onSubmit={confirmarParticipante}>
        <div className="quiz-identity-icon"><UserRound size={23} /></div><p>ENTRAR NA RODADA</p><h2 id="quiz-name-title">Qual é o seu primeiro nome?</h2><small>Use somente o nome para registrar sua participação nesta rodada.</small>
        <label><span>SEU NOME</span><input autoFocus value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Ex.: Ana" maxLength={60} autoComplete="given-name" /></label><button type="submit" disabled={joinRound.isPending}>{joinRound.isPending ? "ENTRANDO…" : <><span>COMEÇAR A RESPONDER</span><ChevronRight size={16} /></>}</button>{nameError && <strong className="quiz-identity-error" role="alert">{nameError}</strong>}
      </form></div>}
      {roundOpen && participantReady && <div className="quiz-participant-bar"><span><UserRound size={15} />PARTICIPANTE</span><strong>{participantName}</strong><small>Seu resultado será atualizado no placar ao concluir as 20 perguntas.</small></div>}
      {roundOpen && participantReady && <>
        <nav className="quiz-topic-tabs" aria-label="Assuntos do quiz">{temas.map((id, index) => <button key={id} type="button" className={tema === id ? "active" : ""} onClick={() => setTema(id)}><b>0{index + 1}</b>{quiz[id].nome}</button>)}</nav>
        <header className="quiz-section-heading"><div><p>ROTA ATIVA · {atual.subtitulo.toUpperCase()}</p><h2>{atual.nome}: cinco perguntas.</h2></div><div className="quiz-score"><span><b>{points}</b>/{atual.perguntas.length} corretas</span><small>{answered} respondida{answered === 1 ? "" : "s"}</small><button type="button" onClick={reiniciarTema}><RotateCcw size={14} />REINICIAR</button></div></header>
        <div className="quiz-questions" aria-label="Estações de decisão do quiz">{atual.perguntas.map((question, index) => {
          const answer = respostas[question.id]; const wasAnswered = answer !== undefined;
          return <article className="quiz-question" key={question.id}><header><span>EST. 0{index + 1}</span><h3>{question.enunciado}</h3></header><div className="quiz-options">{question.alternativas.map((alternative, alternativeIndex) => { const selected = answer === alternativeIndex; const correct = alternativeIndex === question.correta; return <button key={`${question.id}-${alternativeIndex}`} type="button" disabled={wasAnswered} onClick={() => selecionar(question.id, alternativeIndex)} className={wasAnswered ? (correct ? "correct" : selected ? "wrong" : "") : ""}><i>{String.fromCharCode(65 + alternativeIndex)}</i><span>{alternative}</span>{wasAnswered && correct && <Check size={18} />}{wasAnswered && selected && !correct && <X size={18} />}</button>; })}</div>{wasAnswered && <p className={`quiz-feedback ${answer === question.correta ? "correct" : "wrong"}`}><b>{answer === question.correta ? "Capacidade desbloqueada." : "Rota a revisar."}</b>{question.explicacao}</p>}</article>;
        })}</div>
        {answered === atual.perguntas.length && <aside className="quiz-complete"><Check size={21} /><div><p>FRENTE CONCLUÍDA</p><strong>Você acertou {points} de {atual.perguntas.length} perguntas.</strong></div><button type="button" onClick={() => setTema(temas[(temas.indexOf(tema) + 1) % temas.length])}>PRÓXIMO ASSUNTO <ChevronRight size={16} /></button></aside>}
      </>}
      <section className="quiz-leaderboard-section" aria-live="polite">
        {roundOpen && quizComplete && participantReady && <div className="quiz-final-score"><div><p>MISSÃO CONCLUÍDA</p><h2>{participantName}, você acertou <em>{totalScore}/20</em>.</h2><span>Skill {pointsByTheme.skill}/5 · MCPs {pointsByTheme.mcps}/5 · SubAgentes {pointsByTheme.subagentes}/5 · RAG {pointsByTheme.rag}/5</span></div><button type="button" onClick={enviarPontuacao} disabled={submitScore.isPending}>{submitScore.isPending ? <><Loader2 size={16} className="quiz-spin" />REGISTRANDO</> : <><Send size={15} />ENVIAR AO PLACAR</>}</button></div>}
        {submissionMessage && <p className={`quiz-submission-message ${submitScore.isError ? "error" : ""}`}>{submissionMessage}</p>}
        <div className="leaderboard-heading"><div><p><Trophy size={15} />PLACAR COMPARTILHADO</p><h2>Classificação da <em>equipe.</em></h2></div><span>ATUALIZAÇÃO AUTOMÁTICA</span></div>
        <div className="leaderboard-panel">{leaderboardQuery.isLoading && <p className="leaderboard-status"><Loader2 size={17} className="quiz-spin" />Carregando o placar da equipe...</p>}{leaderboardQuery.isError && <p className="leaderboard-status leaderboard-error">O placar ficará disponível assim que a conexão com a base for restabelecida.</p>}{!leaderboardQuery.isLoading && !leaderboardQuery.isError && leaderboardQuery.data?.scores.length === 0 && <p className="leaderboard-status">Ainda não há resultados nesta rodada. O primeiro participante a concluir aparece aqui.</p>}{leaderboardQuery.data?.scores.map((score, index) => <div className={`leaderboard-row ${score.participantKey === participantKey ? "is-current" : ""}`} key={score.id}><RankingMedal position={index + 1} /><strong>{score.participantName}{score.participantKey === participantKey && <small>VOCÊ</small>}</strong><span>{score.totalScore}<i>/20</i></span></div>)}</div>
        <p className="leaderboard-note">Ouro, prata e bronze representam as três primeiras posições. Em caso de empate, vale quem concluiu primeiro.</p>
      </section>
    </div></section>
  </main>;
}
