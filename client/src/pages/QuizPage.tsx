// Central de Verificação: perguntas, identificação simples e placar compartilhado para a apresentação.
import { useMemo, useState } from "react";
import { Check, ChevronRight, CircleHelp, Crown, Loader2, Medal, RotateCcw, Send, Trophy, UserRound, X } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { LibraryNav } from "@/components/LibraryNav";
import { trpc } from "@/lib/trpc";
import "./QuizPage.css";

type Tema = "skill" | "mcps" | "subagentes" | "rag";

type Questao = {
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
};

type FrenteQuiz = { nome: string; subtitulo: string; perguntas: Questao[] };

// Reúne perguntas curtas. A alternativa correta é distribuída entre A, B e C para evitar um padrão previsível.
const quiz: Record<Tema, FrenteQuiz> = {
  skill: {
    nome: "Skill",
    subtitulo: "Regras e fluxos reutilizáveis",
    perguntas: [
      { id: "skill-1", enunciado: "Qual é a melhor definição de uma Skill?", alternativas: ["Um banco de dados de documentos", "Um modelo de IA treinado do zero", "Uma instrução reutilizável com regras ou passos"], correta: 2, explicacao: "Skills registram instruções, padrões e fluxos que a IA pode reaplicar." },
      { id: "skill-2", enunciado: "Quando uma Skill é especialmente útil?", alternativas: ["Quando o time quer repetir um processo aprovado", "Quando é preciso substituir o Java", "Quando a IA precisa acessar uma API externa"], correta: 0, explicacao: "Use uma Skill para manter consistência em tarefas repetidas, como revisão de código." },
      { id: "skill-3", enunciado: "Qual arquivo costuma ser obrigatório em uma Skill estruturada?", alternativas: ["BancoDeDados.sql", "SKILL.md", "RESPOSTA.txt"], correta: 1, explicacao: "O arquivo SKILL.md descreve nome, finalidade e instruções da Skill." },
      { id: "skill-4", enunciado: "Uma Skill de referência normalmente define:", alternativas: ["Permissões para bancos de dados", "A velocidade da internet", "Convenções de código e guias de estilo"], correta: 2, explicacao: "Skills de referência orientam padrões que o time quer manter." },
      { id: "skill-5", enunciado: "Qual problema uma Skill ajuda a evitar?", alternativas: ["Escrever testes automatizados", "Copiar e colar o mesmo processo toda vez", "Abrir o editor de código"], correta: 1, explicacao: "A Skill centraliza um processo para que ele seja reutilizado com consistência." },
    ],
  },
  mcps: {
    nome: "MCPs",
    subtitulo: "Ponte para ferramentas e serviços",
    perguntas: [
      { id: "mcp-1", enunciado: "Qual é o papel principal de um MCP?", alternativas: ["Guardar a memória da conversa", "Conectar a IA a ferramentas e serviços", "Substituir um desenvolvedor"], correta: 1, explicacao: "O MCP organiza como uma IA acessa ferramentas, prompts e recursos externos." },
      { id: "mcp-2", enunciado: "No exemplo Python, server.py faz o quê?", alternativas: ["Guarda a ferramenta MCP disponível", "Mostra apenas uma imagem", "Executa o teste JUnit"], correta: 0, explicacao: "server.py define a ferramenta que será oferecida pelo servidor MCP." },
      { id: "mcp-3", enunciado: "No exemplo Python, testar_mcp.py faz o quê?", alternativas: ["Instala o IntelliJ", "Cria o banco de dados vetorial", "Chama uma ferramenta e mostra a resposta"], correta: 2, explicacao: "O arquivo de teste simula o uso da ferramenta e exibe o retorno no terminal." },
      { id: "mcp-4", enunciado: "Qual item de um MCP representa uma ação que a IA pode executar?", alternativas: ["Tool", "Histórico", "Resource"], correta: 0, explicacao: "Uma Tool é uma ação disponível, como consultar ou criar um registro." },
      { id: "mcp-5", enunciado: "MCP é mais indicado quando a IA precisa:", alternativas: ["Repetir um padrão de documentação", "Dividir uma tarefa em especialistas", "Usar um sistema externo de forma organizada"], correta: 2, explicacao: "MCP é a ponte para ações e dados em serviços externos." },
    ],
  },
  subagentes: {
    nome: "SubAgentes",
    subtitulo: "Frentes especializadas de trabalho",
    perguntas: [
      { id: "sub-1", enunciado: "O que caracteriza um SubAgente?", alternativas: ["Um arquivo de configuração de rede", "Uma cópia do banco de dados", "Uma frente de IA com contexto e foco próprios"], correta: 2, explicacao: "SubAgentes podem atuar com missão, contexto e permissões específicos." },
      { id: "sub-2", enunciado: "Por que usar SubAgentes em uma tarefa complexa?", alternativas: ["Para delegar frentes e receber resultados resumidos", "Para trocar a linguagem de programação", "Para armazenar documentos"], correta: 0, explicacao: "O agente principal coordena enquanto especialistas executam partes da missão." },
      { id: "sub-3", enunciado: "O contexto de um SubAgente normalmente é:", alternativas: ["Idêntico a todos os usuários", "Isolado da conversa principal", "Um endereço de internet"], correta: 1, explicacao: "O isolamento ajuda a manter cada investigação ou execução focada." },
      { id: "sub-4", enunciado: "Qual combinação é um bom exemplo de SubAgentes?", alternativas: ["Pesquisa, DevOps e Qualidade trabalhando em paralelo", "Três cópias da mesma senha", "Um único prompt sem objetivo"], correta: 0, explicacao: "Especialistas podem trabalhar em paralelo e retornar ao coordenador." },
      { id: "sub-5", enunciado: "Como uma Skill pode ajudar um SubAgente?", alternativas: ["Substituindo a permissão de acesso", "Apagando o resultado do trabalho", "Dando um playbook que ele deve seguir"], correta: 2, explicacao: "A Skill padroniza o método; o SubAgente aplica esse método em uma missão." },
    ],
  },
  rag: {
    nome: "RAG",
    subtitulo: "Consulta baseada em conhecimento confiável",
    perguntas: [
      { id: "rag-1", enunciado: "RAG é um agente de IA?", alternativas: ["Sim; sempre decide e executa ações", "Não; é um processo de busca e contexto", "Sim; é um tipo de banco de dados"], correta: 1, explicacao: "RAG recupera informação relevante para enriquecer a resposta do modelo." },
      { id: "rag-2", enunciado: "Qual é o objetivo do pipeline de ingestão?", alternativas: ["Criar novas regras de código", "Responder diretamente à pergunta do usuário", "Preparar documentos para busca posterior"], correta: 2, explicacao: "A ingestão lê, organiza, divide e indexa os documentos antes das consultas." },
      { id: "rag-3", enunciado: "Qual é o objetivo do pipeline de consulta?", alternativas: ["Encontrar trechos relevantes para a pergunta", "Instalar bibliotecas Python", "Delegar uma missão a SubAgentes"], correta: 0, explicacao: "Na consulta, o sistema busca os melhores trechos e monta o contexto para o modelo." },
      { id: "rag-4", enunciado: "O que são chunks em um RAG?", alternativas: ["Erros do modelo", "Partes menores de um documento", "Servidores MCP"], correta: 1, explicacao: "Documentos são divididos em chunks para facilitar uma busca precisa." },
      { id: "rag-5", enunciado: "Como um agente pode usar RAG?", alternativas: ["Eliminando a necessidade de fontes", "Transformando RAG em uma Tool automaticamente", "Consultando a base antes de decidir ou responder"], correta: 2, explicacao: "O agente pode usar o resultado da consulta RAG como informação para sua próxima ação." },
    ],
  },
};

const temas = Object.keys(quiz) as Tema[];
const participantNameStorageKey = "nexo-quiz-participant-name";
const participantIdStorageKey = "nexo-quiz-participant-id";

/** Recupera o nome salvo neste navegador sem exigir criação de conta. */
function getStoredName() {
  return typeof window === "undefined" ? "" : window.localStorage.getItem(participantNameStorageKey) ?? "";
}

/** Cria uma chave anônima por navegador para atualizar somente o próprio resultado. */
function getParticipantKey() {
  if (typeof window === "undefined") return "00000000-0000-4000-8000-000000000000";
  const existingKey = window.localStorage.getItem(participantIdStorageKey);
  if (existingKey) return existingKey;
  const newKey = crypto.randomUUID();
  window.localStorage.setItem(participantIdStorageKey, newKey);
  return newKey;
}

/** Retorna o ícone de medalha de acordo com as três primeiras posições. */
function RankingMedal({ position }: { position: number }) {
  if (position === 1) return <Crown className="leaderboard-gold" size={19} aria-label="Medalha de ouro" />;
  if (position === 2) return <Medal className="leaderboard-silver" size={19} aria-label="Medalha de prata" />;
  if (position === 3) return <Medal className="leaderboard-bronze" size={19} aria-label="Medalha de bronze" />;
  return <span className="leaderboard-position">{String(position).padStart(2, "0")}</span>;
}

// Permite responder, conferir explicações e concluir uma única pontuação consolidada no placar da apresentação.
export default function QuizPage() {
  const [tema, setTema] = useState<Tema>("skill");
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [participantName, setParticipantName] = useState(getStoredName);
  const [participantKey] = useState(getParticipantKey);
  const [participantReady, setParticipantReady] = useState(() => Boolean(getStoredName()));
  const [nameError, setNameError] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const atual = quiz[tema];
  const trpcUtils = trpc.useUtils();
  const { user } = useAuth();
  const leaderboardQuery = trpc.quiz.leaderboard.useQuery(undefined, { refetchInterval: 15_000 });

  const pointsByTheme = useMemo(() => {
    return temas.reduce((accumulator, currentTheme) => {
      accumulator[currentTheme] = quiz[currentTheme].perguntas.filter((pergunta) => respostas[pergunta.id] === pergunta.correta).length;
      return accumulator;
    }, {} as Record<Tema, number>);
  }, [respostas]);

  const totalScore = temas.reduce((total, currentTheme) => total + pointsByTheme[currentTheme], 0);
  const totalAnswered = temas.reduce((total, currentTheme) => total + quiz[currentTheme].perguntas.filter((pergunta) => respostas[pergunta.id] !== undefined).length, 0);
  const points = pointsByTheme[tema];
  const answered = atual.perguntas.filter((pergunta) => respostas[pergunta.id] !== undefined).length;
  const quizComplete = totalAnswered === 20;

  const submitScore = trpc.quiz.submitScore.useMutation({
    onSuccess: async () => {
      setSubmissionMessage("Sua pontuação entrou no placar compartilhado.");
      await trpcUtils.quiz.leaderboard.invalidate();
    },
    onError: () => setSubmissionMessage("Não foi possível registrar agora. Verifique a conexão e tente novamente."),
  });

  const clearLeaderboard = trpc.quiz.clearLeaderboard.useMutation({
    onSuccess: async () => {
      setSubmissionMessage("O placar foi reiniciado para uma nova rodada.");
      await trpcUtils.quiz.leaderboard.invalidate();
    },
    onError: () => setSubmissionMessage("Não foi possível reiniciar o placar. Tente novamente como organizador."),
  });

  function confirmarParticipante(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = participantName.replace(/\s+/g, " ").trim();
    if (normalizedName.length < 2) {
      setNameError("Digite pelo menos dois caracteres para entrar no placar.");
      return;
    }
    if (normalizedName.includes(" ")) {
      setNameError("Use somente seu primeiro nome no placar.");
      return;
    }
    window.localStorage.setItem(participantNameStorageKey, normalizedName);
    setParticipantName(normalizedName);
    setParticipantReady(true);
    setNameError("");
  }

  function selecionar(questionId: string, alternative: number) {
    setRespostas((previousAnswers) => ({ ...previousAnswers, [questionId]: alternative }));
  }

  function reiniciarTema() {
    setRespostas((previousAnswers) => {
      const nextAnswers = { ...previousAnswers };
      atual.perguntas.forEach((question) => delete nextAnswers[question.id]);
      return nextAnswers;
    });
    setSubmissionMessage("");
  }

  function enviarPontuacao() {
    if (!quizComplete || !participantReady || submitScore.isPending) return;
    setSubmissionMessage("");
    submitScore.mutate({
      participantName,
      participantKey,
      totalScore,
      skillScore: pointsByTheme.skill,
      mcpScore: pointsByTheme.mcps,
      subagentsScore: pointsByTheme.subagentes,
      ragScore: pointsByTheme.rag,
    });
  }

  function reiniciarPlacar() {
    if (!window.confirm("Deseja apagar todas as pontuações e iniciar uma nova rodada?")) return;
    clearLeaderboard.mutate();
  }

  return (
    <main className="skill-reference quiz-page">
      <LibraryNav ativo="quiz" />
      <section className="quiz-hero">
        <div className="page-width quiz-hero-grid">
          <div><p className="quiz-kicker"><CircleHelp size={15} />CENTRAL DE VERIFICAÇÃO</p><h1>Teste o que você <em>entendeu.</em></h1><p>Informe seu primeiro nome, responda as quatro frentes e acompanhe a classificação compartilhada da equipe.</p></div>
          <div className="quiz-overview"><span>20</span><div><b>perguntas no total</b><small>5 para cada assunto da apresentação.</small></div></div>
        </div>
      </section>

      <section className="quiz-workspace">
        <div className="page-width">
          {!participantReady ? (
            <form className="quiz-identity" onSubmit={confirmarParticipante}>
              <div className="quiz-identity-icon"><UserRound size={22} /></div>
              <div><p>ANTES DE COMEÇAR</p><h2>Como você quer aparecer no placar?</h2><small>Pedimos somente o primeiro nome. Não é necessário criar conta.</small></div>
              <label><span>SEU NOME</span><input value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Ex.: Ana" maxLength={60} autoComplete="given-name" /></label>
              <button type="submit">ENTRAR NO QUIZ <ChevronRight size={16} /></button>
              {nameError && <strong className="quiz-identity-error" role="alert">{nameError}</strong>}
            </form>
          ) : (
            <div className="quiz-participant-bar"><span><UserRound size={15} />PARTICIPANTE</span><strong>{participantName}</strong><small>Seu resultado será atualizado no placar ao concluir as 20 perguntas.</small></div>
          )}

          {participantReady && <>
            <nav className="quiz-topic-tabs" aria-label="Assuntos do quiz">
              {temas.map((id, index) => <button key={id} type="button" className={tema === id ? "active" : ""} onClick={() => setTema(id)}><b>0{index + 1}</b>{quiz[id].nome}</button>)}
            </nav>
            <header className="quiz-section-heading"><div><p>ROTA ATIVA · {atual.subtitulo.toUpperCase()}</p><h2>{atual.nome}: cinco perguntas.</h2></div><div className="quiz-score"><span><b>{points}</b>/{atual.perguntas.length} corretas</span><small>{answered} respondida{answered === 1 ? "" : "s"}</small><button type="button" onClick={reiniciarTema}><RotateCcw size={14} />REINICIAR</button></div></header>
            <div className="quiz-questions" aria-label="Estações de decisão do quiz">
              {atual.perguntas.map((question, index) => {
                const answer = respostas[question.id];
                const wasAnswered = answer !== undefined;
                return <article className="quiz-question" key={question.id}><header><span>EST. 0{index + 1}</span><h3>{question.enunciado}</h3></header><div className="quiz-options">{question.alternativas.map((alternative, alternativeIndex) => { const selected = answer === alternativeIndex; const correct = alternativeIndex === question.correta; return <button key={`${question.id}-${alternativeIndex}`} type="button" disabled={wasAnswered} onClick={() => selecionar(question.id, alternativeIndex)} className={wasAnswered ? (correct ? "correct" : selected ? "wrong" : "") : ""}><i>{String.fromCharCode(65 + alternativeIndex)}</i><span>{alternative}</span>{wasAnswered && correct && <Check size={18} />}{wasAnswered && selected && !correct && <X size={18} />}</button>; })}</div>{wasAnswered && <p className={`quiz-feedback ${answer === question.correta ? "correct" : "wrong"}`}><b>{answer === question.correta ? "Capacidade desbloqueada." : "Rota a revisar."}</b>{question.explicacao}</p>}</article>;
              })}
            </div>
            {answered === atual.perguntas.length && <aside className="quiz-complete"><Check size={21} /><div><p>FRENTE CONCLUÍDA</p><strong>Você acertou {points} de {atual.perguntas.length} perguntas.</strong></div><button type="button" onClick={() => setTema(temas[(temas.indexOf(tema) + 1) % temas.length])}>PRÓXIMO ASSUNTO <ChevronRight size={16} /></button></aside>}
          </>}

          <section className="quiz-leaderboard-section" aria-live="polite">
            {quizComplete && participantReady && <div className="quiz-final-score"><div><p>MISSÃO CONCLUÍDA</p><h2>{participantName}, você acertou <em>{totalScore}/20</em>.</h2><span>Skill {pointsByTheme.skill}/5 · MCPs {pointsByTheme.mcps}/5 · SubAgentes {pointsByTheme.subagentes}/5 · RAG {pointsByTheme.rag}/5</span></div><button type="button" onClick={enviarPontuacao} disabled={submitScore.isPending}>{submitScore.isPending ? <><Loader2 size={16} className="quiz-spin" />REGISTRANDO</> : <><Send size={15} />ENVIAR AO PLACAR</>}</button></div>}
            {submissionMessage && <p className={`quiz-submission-message ${submitScore.isError ? "error" : ""}`}>{submissionMessage}</p>}
            <div className="leaderboard-heading"><div><p><Trophy size={15} />PLACAR COMPARTILHADO</p><h2>Classificação da <em>equipe.</em></h2></div><div className="leaderboard-heading-actions"><span>ATUALIZAÇÃO AUTOMÁTICA</span>{user?.role === "admin" && <button type="button" onClick={reiniciarPlacar} disabled={clearLeaderboard.isPending}>{clearLeaderboard.isPending ? "LIMPANDO…" : "LIMPAR PLACAR"}</button>}</div></div>
            <div className="leaderboard-panel">
              {leaderboardQuery.isLoading && <p className="leaderboard-status"><Loader2 size={17} className="quiz-spin" />Carregando o placar da equipe...</p>}
              {leaderboardQuery.isError && <p className="leaderboard-status leaderboard-error">O placar ficará disponível assim que a conexão com a base for restabelecida.</p>}
              {!leaderboardQuery.isLoading && !leaderboardQuery.isError && leaderboardQuery.data?.length === 0 && <p className="leaderboard-status">Ainda não há resultados. O primeiro participante a concluir aparece aqui.</p>}
              {leaderboardQuery.data?.map((score, index) => <div className={`leaderboard-row ${score.participantKey === participantKey ? "is-current" : ""}`} key={score.id}><RankingMedal position={index + 1} /><strong>{score.participantName}{score.participantKey === participantKey && <small>VOCÊ</small>}</strong><span>{score.totalScore}<i>/20</i></span></div>)}
            </div>
            <p className="leaderboard-note">Ouro, prata e bronze representam as três primeiras posições. Em caso de empate, vale quem concluiu primeiro.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
