# Central de Prática — GitHub Copilot no IntelliJ IDEA

## Missão 1 — Preparar a bancada

**Objetivo:** validar que o Copilot está disponível antes de usar qualquer prompt. No IntelliJ, abra `Settings > Plugins`, procure o plugin **GitHub Copilot**, instale-o, reinicie a IDE e faça login em `Tools > GitHub Copilot > Login to GitHub`. Ao terminar, abra um arquivo Java e aguarde uma sugestão acinzentada simples. [1]

> Regra da equipe: não avance para um exemplo com código de negócio, dados sensíveis ou credenciais. Comece em um projeto de demonstração ou em um arquivo sem dados pessoais.

## Missão 2 — Pedir uma sugestão pequena

**Cenário:** precisamos validar uma entrada de pedido. Em um arquivo Java de demonstração, escreva um comentário claro e comece o método.

```java
// Return true only when the order id is present and contains digits only.
boolean hasValidOrderId(String orderId) {
```

O Copilot pode propor o restante em texto acinzentado; aceite apenas se entender a proposta, usando **Tab**, ou descarte com **Esc**. Em Windows/Linux, `Alt+]` e `Alt+[` ajudam a navegar entre sugestões alternativas. [2]

## Missão 3 — Fazer uma pergunta antes de alterar

**Cenário:** há um método de frete que ninguém conhece bem. Selecione o método e abra o Copilot Chat. Faça a pergunta abaixo, substituindo os termos entre colchetes.

```text
Explique este método para alguém novo no projeto. Diga: 
1) qual problema ele resolve; 
2) quais entradas e saídas importam; 
3) quais cenários de erro devo testar. 
Não altere nenhum arquivo.
```

O resultado esperado é uma explicação que aponta para o próprio código selecionado. Se houver uma suposição, pergunte em seguida: **“Em qual linha ou regra do código você se baseou?”**

## Missão 4 — Pedir um teste, não uma mudança grande

**Cenário:** queremos proteger uma regra já existente. No Chat, use:

```text
Com base na classe selecionada, proponha testes unitários JUnit 5 para os 3 comportamentos mais importantes. 
Explique os casos antes de escrever o código. Use o padrão de nomes e mocks que já existe neste repositório.
```

Revise primeiro a lista de casos. Só depois aceite ou copie o teste proposto. O Copilot Chat pode explicar código, gerar testes e sugerir correções, mas a revisão do time continua obrigatória. [3]

## Missão 5 — Ensinar convenções uma vez

**Cenário:** o time repete as mesmas regras a cada conversa. Crie `.github/copilot-instructions.md` e registre convenções curtas, verificáveis e úteis.

```markdown
# Convenções do projeto

- Use Java 21 e Spring Boot; mantenha serviços pequenos.
- Para mudanças de regra, escreva ou atualize testes JUnit 5.
- Não registre dados pessoais, tokens ou senhas em logs.
- Preserve as convenções existentes de nomes e tratamento de erros.
- Antes de editar múltiplos arquivos, explique o plano e os riscos.
```

As instruções do repositório são adicionadas automaticamente às solicitações do Copilot e podem ser conferidas na lista de referências da resposta. [4]

## A regra de ouro

> Use o Copilot como um colega que propõe, explica e acelera. O desenvolvedor continua responsável por contexto, revisão, testes e decisão.

## Referências

[1] [Instalação do GitHub Copilot em IDEs JetBrains](https://docs.github.com/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment)

[2] [Sugestões de código do Copilot em IDEs JetBrains](https://docs.github.com/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)

[3] [Perguntas ao Copilot no editor](https://docs.github.com/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)

[4] [Instruções personalizadas por repositório](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide)
