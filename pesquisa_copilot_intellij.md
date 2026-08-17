# Referências de pesquisa — GitHub Copilot no IntelliJ IDEA

## Instalação e acesso

A documentação oficial do GitHub indica que o plugin GitHub Copilot para JetBrains permite sugestões de código enquanto a pessoa digita e chat dentro da IDE. Para instalar no IntelliJ IDEA: abrir **Settings > Plugins**, buscar **GitHub Copilot** no Marketplace, instalar, reiniciar a IDE e então acessar **Tools > GitHub Copilot > Login to GitHub** para autorizar a conta. O IntelliJ IDEA Community, Ultimate e Educational estão na lista de IDEs compatíveis. [1]

## Primeiro uso: sugestões no editor

No editor Java, o Copilot pode sugerir um corpo de classe ou método em texto acinzentado enquanto a pessoa digita. A sugestão pode ser aceita com **Tab** ou descartada com **Esc**. Também é possível começar com um comentário em linguagem natural para orientar uma sugestão de código. O usuário deve revisar e editar a sugestão antes de adotar o resultado. [2]

## Perguntas e alterações pelo chat

O Copilot Chat é adequado para explicar código, propor testes, sugerir correções e responder a perguntas sobre o projeto. A documentação recomenda avaliar a resposta e fazer perguntas de acompanhamento. Em ambientes JetBrains, a modalidade Edit pode fazer alterações controladas em múltiplos arquivos; a disponibilidade pode depender da versão do plugin e das políticas da organização. [3]

## Instruções do repositório

O GitHub documenta instruções personalizadas de repositório em `.github/copilot-instructions.md`. O arquivo é Markdown com regras e preferências do projeto; as instruções ficam disponíveis automaticamente para solicitações ao Copilot. A documentação também descreve arquivos de instrução por caminho em `.github/instructions/*.instructions.md` e recomenda confirmar referências usadas pela resposta do chat. [4]

## Aplicação didática escolhida para o site

O guia do site ensinará quatro práticas seguras e diretas: instalar/autenticar; aceitar ou descartar uma sugestão pequena; usar Chat para entender e pedir um teste para um arquivo selecionado; registrar convenções repetidas em `copilot-instructions.md`. Para tarefas de múltiplos arquivos, o guia orienta a revisar o plano/diff antes de aceitar qualquer edição.

## Fontes

[1] https://docs.github.com/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment

[2] https://docs.github.com/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot

[3] https://docs.github.com/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide

[4] https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide
