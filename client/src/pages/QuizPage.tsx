// Sala de Controle Editorial: quiz de verificação com uma pergunta por vez em cada frente de conhecimento.
import { useMemo, useState } from "react";
import { Check, ChevronRight, CircleHelp, RotateCcw, X } from "lucide-react";
import { LibraryNav } from "@/components/LibraryNav";
import "./QuizPage.css";

type Tema = "skill" | "mcps" | "subagentes" | "rag";

type Questao = {
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
};

// Reúne perguntas curtas, com uma única resposta correta, para revisar cada módulo da biblioteca.
const quiz: Record<Tema, { nome: string; subtitulo: string; perguntas: Questao[] }> = {
  skill: {
    nome: "Skill",
    subtitulo: "Regras e fluxos reutilizáveis",
    perguntas: [
      { id: "skill-1", enunciado: "Qual é a melhor definição de uma Skill?", alternativas: ["Uma instrução reutilizável com regras ou passos", "Um banco de dados de documentos", "Um modelo de IA treinado do zero"], correta: 0, explicacao: "Skills registram instruções, padrões e fluxos que a IA pode reaplicar." },
      { id: "skill-2", enunciado: "Quando uma Skill é especialmente útil?", alternativas: ["Quando o time quer repetir um processo aprovado", "Quando é preciso substituir o Java", "Quando a IA precisa acessar uma API externa"], correta: 0, explicacao: "Use uma Skill para manter consistência em tarefas repetidas, como revisão de código." },
      { id: "skill-3", enunciado: "Qual arquivo costuma ser obrigatório em uma Skill estruturada?", alternativas: ["SKILL.md", "RESPOSTA.txt", "BancoDeDados.sql"], correta: 0, explicacao: "O arquivo SKILL.md descreve nome, finalidade e instruções da Skill." },
      { id: "skill-4", enunciado: "Uma Skill de referência normalmente define:", alternativas: ["Convenções de código e guias de estilo", "Permissões para bancos de dados", "A velocidade da internet"], correta: 0, explicacao: "Skills de referência orientam padrões que o time quer manter." },
      { id: "skill-5", enunciado: "Qual problema uma Skill ajuda a evitar?", alternativas: ["Copiar e colar o mesmo processo toda vez", "Escrever testes automatizados", "Abrir o editor de código"], correta: 0, explicacao: "A Skill centraliza um processo para que ele seja reutilizado com consistência." },
    ],
  },
  mcps: {
    nome: "MCPs",
    subtitulo: "Ponte para ferramentas e serviços",
    perguntas: [
      { id: "mcp-1", enunciado: "Qual é o papel principal de um MCP?", alternativas: ["Conectar a IA a ferramentas e serviços", "Substituir um desenvolvedor", "Guardar a memória da conversa"], correta: 0, explicacao: "O MCP organiza como uma IA acessa ferramentas, prompts e recursos externos." },
      { id: "mcp-2", enunciado: "No exemplo Python, server.py faz o quê?", alternativas: ["Guarda a ferramenta MCP disponível", "Mostra apenas uma imagem", "Executa o teste JUnit"], correta: 0, explicacao: "server.py define a ferramenta que será oferecida pelo servidor MCP." },
      { id: "mcp-3", enunciado: "No exemplo Python, testar_mcp.py faz o quê?", alternativas: ["Chama uma ferramenta e mostra a resposta", "Cria o banco de dados vetorial", "Instala o IntelliJ"], correta: 0, explicacao: "O arquivo de teste simula o uso da ferramenta e exibe o retorno no terminal." },
      { id: "mcp-4", enunciado: "Qual item de um MCP representa uma ação que a IA pode executar?", alternativas: ["Tool", "Resource", "Histórico"], correta: 0, explicacao: "Uma Tool é uma ação disponível, como consultar ou criar um registro." },
      { id: "mcp-5", enunciado: "MCP é mais indicado quando a IA precisa:", alternativas: ["Usar um sistema externo de forma organizada", "Repetir um padrão de documentação", "Dividir uma tarefa em especialistas"], correta: 0, explicacao: "MCP é a ponte para ações e dados em serviços externos." },
    ],
  },
  subagentes: {
    nome: "SubAgentes",
    subtitulo: "Frentes especializadas de trabalho",
    perguntas: [
      { id: "sub-1", enunciado: "O que caracteriza um SubAgente?", alternativas: ["Uma frente de IA com contexto e foco próprios", "Uma cópia do banco de dados", "Um arquivo de configuração de rede"], correta: 0, explicacao: "SubAgentes podem atuar com missão, contexto e permissões específicos." },
      { id: "sub-2", enunciado: "Por que usar SubAgentes em uma tarefa complexa?", alternativas: ["Para delegar frentes e receber resultados resumidos", "Para trocar a linguagem de programação", "Para armazenar documentos"], correta: 0, explicacao: "O agente principal coordena enquanto especialistas executam partes da missão." },
      { id: "sub-3", enunciado: "O contexto de um SubAgente normalmente é:", alternativas: ["Isolado da conversa principal", "Idêntico a todos os usuários", "Um endereço de internet"], correta: 0, explicacao: "O isolamento ajuda a manter cada investigação ou execução focada." },
      { id: "sub-4", enunciado: "Qual combinação é um bom exemplo de SubAgente?", alternativas: ["Pesquisa, DevOps e Qualidade trabalhando em paralelo", "Três cópias da mesma senha", "Um único prompt sem objetivo"], correta: 0, explicacao: "Especialistas podem trabalhar em paralelo e retornar ao coordenador." },
      { id: "sub-5", enunciado: "Como uma Skill pode ajudar um SubAgente?", alternativas: ["Dando um playbook que ele deve seguir", "Substituindo a permissão de acesso", "Apagando o resultado do trabalho"], correta: 0, explicacao: "A Skill padroniza o método; o SubAgente aplica esse método em uma missão." },
    ],
  },
  rag: {
    nome: "RAG",
    subtitulo: "Consulta baseada em conhecimento confiável",
    perguntas: [
      { id: "rag-1", enunciado: "RAG é um agente de IA?", alternativas: ["Não; é um processo de busca e contexto", "Sim; sempre decide e executa ações", "Sim; é um tipo de banco de dados"], correta: 0, explicacao: "RAG recupera informação relevante para enriquecer a resposta do modelo." },
      { id: "rag-2", enunciado: "Qual é o objetivo do pipeline de ingestão?", alternativas: ["Preparar documentos para busca posterior", "Responder diretamente à pergunta do usuário", "Criar novas regras de código"], correta: 0, explicacao: "A ingestão lê, organiza, divide e indexa os documentos antes das consultas." },
      { id: "rag-3", enunciado: "Qual é o objetivo do pipeline de consulta?", alternativas: ["Encontrar trechos relevantes para a pergunta", "Instalar bibliotecas Python", "Delegar uma missão a SubAgentes"], correta: 0, explicacao: "Na consulta, o sistema busca os melhores trechos e monta o contexto para o modelo." },
      { id: "rag-4", enunciado: "O que são chunks em um RAG?", alternativas: ["Partes menores de um documento", "Erros do modelo", "Servidores MCP"], correta: 0, explicacao: "Documentos são divididos em chunks para facilitar uma busca precisa." },
      { id: "rag-5", enunciado: "Como um agente pode usar RAG?", alternativas: ["Consultando a base antes de decidir ou responder", "Transformando RAG em uma Tool automaticamente", "Eliminando a necessidade de fontes"], correta: 0, explicacao: "O agente pode usar o resultado da consulta RAG como informação para sua próxima ação." },
    ],
  },
};

// Permite responder, conferir a explicação e trocar de assunto sem perder o progresso atual.
export default function QuizPage() {
  const [tema, setTema] = useState<Tema>("skill");
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const atual = quiz[tema];
  const pontos = useMemo(() => atual.perguntas.filter((pergunta) => respostas[pergunta.id] === pergunta.correta).length, [atual.perguntas, respostas]);
  const respondidas = atual.perguntas.filter((pergunta) => respostas[pergunta.id] !== undefined).length;

  function selecionar(perguntaId: string, alternativa: number) {
    setRespostas((anteriores) => ({ ...anteriores, [perguntaId]: alternativa }));
  }

  function reiniciarTema() {
    setRespostas((anteriores) => {
      const proximas = { ...anteriores };
      atual.perguntas.forEach((pergunta) => delete proximas[pergunta.id]);
      return proximas;
    });
  }

  return (
    <main className="skill-reference quiz-page">
      <LibraryNav ativo="quiz" />
      <section className="quiz-hero">
        <div className="page-width quiz-hero-grid">
          <div><p className="quiz-kicker"><CircleHelp size={15} />CENTRAL DE VERIFICAÇÃO</p><h1>Teste o que você <em>entendeu.</em></h1><p>Escolha uma frente, responda cinco perguntas e confira a explicação logo abaixo de cada resposta.</p></div>
          <div className="quiz-overview"><span>20</span><div><b>perguntas no total</b><small>5 para cada assunto da apresentação.</small></div></div>
        </div>
      </section>

      <section className="quiz-workspace">
        <div className="page-width">
          <nav className="quiz-topic-tabs" aria-label="Assuntos do quiz">
            {(Object.keys(quiz) as Tema[]).map((id, indice) => <button key={id} type="button" className={tema === id ? "active" : ""} onClick={() => setTema(id)}><b>0{indice + 1}</b>{quiz[id].nome}</button>)}
          </nav>
          <header className="quiz-section-heading"><div><p>ROTA ATIVA · {atual.subtitulo.toUpperCase()}</p><h2>{atual.nome}: cinco perguntas.</h2></div><div className="quiz-score"><span><b>{pontos}</b>/{atual.perguntas.length} corretas</span><small>{respondidas} respondida{respondidas === 1 ? "" : "s"}</small><button type="button" onClick={reiniciarTema}><RotateCcw size={14} />REINICIAR</button></div></header>
          <div className="quiz-questions" aria-label="Estações de decisão do quiz">
            {atual.perguntas.map((pergunta, indice) => {
              const resposta = respostas[pergunta.id];
              const foiRespondida = resposta !== undefined;
              return <article className="quiz-question" key={pergunta.id}><header><span>EST. 0{indice + 1}</span><h3>{pergunta.enunciado}</h3></header><div className="quiz-options">{pergunta.alternativas.map((alternativa, alternativaIndex) => { const selecionada = resposta === alternativaIndex; const correta = alternativaIndex === pergunta.correta; return <button key={alternativa} type="button" disabled={foiRespondida} onClick={() => selecionar(pergunta.id, alternativaIndex)} className={foiRespondida ? (correta ? "correct" : selecionada ? "wrong" : "") : ""}><i>{String.fromCharCode(65 + alternativaIndex)}</i><span>{alternativa}</span>{foiRespondida && correta && <Check size={18} />}{foiRespondida && selecionada && !correta && <X size={18} />}</button>; })}</div>{foiRespondida && <p className={`quiz-feedback ${resposta === pergunta.correta ? "correct" : "wrong"}`}><b>{resposta === pergunta.correta ? "Capacidade desbloqueada." : "Rota a revisar."}</b>{pergunta.explicacao}</p>}</article>;
            })}
          </div>
          {respondidas === atual.perguntas.length && <aside className="quiz-complete"><Check size={21} /><div><p>FRENTE CONCLUÍDA</p><strong>Você acertou {pontos} de {atual.perguntas.length} perguntas.</strong></div><button type="button" onClick={() => setTema((Object.keys(quiz) as Tema[])[((Object.keys(quiz) as Tema[]).indexOf(tema) + 1) % 4])}>PRÓXIMO ASSUNTO <ChevronRight size={16} /></button></aside>}
        </div>
      </section>
    </main>
  );
}
