# Arquitetura de módulos da biblioteca

| Menu | URL | Estado inicial |
|---|---|---|
| Skill | `/skill` | Página completa com o conteúdo atual e tutorial Java/IntelliJ. |
| MCPs | `/mcps` | Página própria pronta para receber o próximo conteúdo. |
| Subagentes | `/subagentes` | Página própria de preparação. |
| RAG | `/rag` | Página própria de preparação. |

## Regra de navegação

Os itens do menu deixam de navegar internamente pela página de Skill. Cada assunto aponta para sua própria URL e seu próprio estado de conteúdo. O menu mantém a mesma aparência entre páginas, destacando apenas o módulo ativo.

## Regra de imagens

Todo print aparece em uma moldura clicável. O clique abre um leitor sobreposto que mostra a imagem original em tamanho máximo compatível com a tela, sem substituí-la por uma miniatura ou versão comprimida.
