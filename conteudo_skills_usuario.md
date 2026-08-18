# Conteúdo organizado — Skills

## Abertura

**Skill é uma habilidade que você entrega para um agente de IA.** Ela pode ser um fluxo para executar uma tarefa específica ou uma definição de padrão que o agente deve sempre obedecer.

> Pense em uma Skill como uma receita: você define tudo que é necessário, passo a passo, para criar um “prato” que deseja repetir.

## Dois tipos de Skill

| Tipo | Para que serve | Exemplos |
|---|---|---|
| Skill de referência | Definir convenções e padrões que o agente deve seguir. | Convenções de código, guias de estilo, padrão de documentação e estrutura de PRD. |
| Skill de tarefa | Executar um fluxo completo para concluir uma tarefa específica. | Code review, troubleshooting de Kubernetes, criação de pipeline e criação de documento. |

## Estrutura de uma Skill

Cada Skill vive em seu próprio diretório e inclui obrigatoriamente um arquivo `SKILL.md` em maiúsculas. O arquivo reúne os metadados, a descrição e as instruções da habilidade. Dependendo da complexidade, a Skill pode ter referências detalhadas, templates e scripts executáveis.

| Item | Função |
|---|---|
| `SKILL.md` | Arquivo obrigatório: nome, descrição e instruções da Skill. |
| `references/` | Documentação e detalhamentos para fluxos mais complexos. |
| `assets/` | Templates de documentos, Dockerfile, manifestos Kubernetes e outros recursos. |
| `scripts/` | Automação que evita o agente recriar procedimentos ou código do zero. |

## Como a Skill é carregada

Ao iniciar, o agente lê somente os metadados e a descrição curta. Ele carrega o conteúdo completo da Skill apenas quando a tarefa exige aquela habilidade; a ativação pode ser automática, pela descrição, ou manual, pelo nome da Skill. Assim, regras, templates e scripts não ocupam contexto sem necessidade.

## Quando usar

Uma Skill é uma boa escolha quando há um fluxo bem definido que precisa ser reutilizado ou quando a IA deve seguir sempre o mesmo padrão. Em vez de copiar e colar comandos, o time cria uma Skill e a compartilha entre projetos e agentes.

Exemplos diretos: criação de deploy no Kubernetes conforme o padrão da empresa; criação de pipelines conforme o padrão do time; processo de troubleshooting; code review; criação de PRD; estrutura de documentos e convenções de nomenclatura.
