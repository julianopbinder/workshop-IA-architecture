# Correção didática — Passo 03

## O que precisa ficar explícito

1. Uma Skill genérica fica em uma pasta própria com o arquivo obrigatório `SKILL.md`, por exemplo: `skills/java-api-review/SKILL.md`.
2. Em um agente que suporta Skills, a pessoa pode pedir `Use a Skill java-api-review para revisar esta validação` ou chamar a Skill pelo nome, quando aquele agente oferece esse comando.
3. Ao reconhecer a tarefa ou o nome, o agente lê a descrição, abre o `SKILL.md`, segue as regras e executa o fluxo definido, como propor testes e revisar riscos.
4. O plugin padrão do GitHub Copilot no IntelliJ não é um carregador genérico de `SKILL.md`. Para ele, as regras equivalentes devem ficar em `.github/copilot-instructions.md`, e a pessoa pode referenciá-las ao conversar com o Copilot.

## Novo roteiro do exemplo

| Etapa | Ação | Resultado |
|---:|---|---|
| 1 | Criar `skills/java-api-review/SKILL.md` | O processo de revisão passa a existir. |
| 2 | Chamar `java-api-review` em um agente com suporte a Skills | O agente lê a Skill e executa as regras. |
| 3 | No IntelliJ, copiar as regras para `.github/copilot-instructions.md` | O Copilot recebe as convenções do repositório. |
| 4 | Selecionar o método Java e pedir testes | A pessoa revisa e testa a proposta. |
