# Direção de Design — Skills, MCPs e Subagentes

## Três direções exploradas

| Tema | Introdução breve | Probabilidade |
|---|---|---:|
| **Sala de Controle Editorial** | Uma experiência clara e sofisticada que transforma conceitos técnicos em uma narrativa visual de operação, com painéis de comando, cartões explicativos e movimento de fluxo. | 0.07 |
| **Caderno de Campo Analógico** | Um universo cálido de anotações, diagramas desenhados e fichas de estudo, para tornar a IA acolhedora e humana. | 0.03 |
| **Estação Orbital de Contexto** | Uma metáfora espacial de sinais, módulos e conexões, com alto contraste e elementos técnicos sutis. | 0.09 |

## Abordagem escolhida: Sala de Controle Editorial

### Movimento de design
**Editorial data storytelling** combinado a uma interface de sala de controle: conhecimento complexo apresentado como uma sequência de descobertas visuais, em vez de um painel técnico denso.

### Princípios centrais

1. **Primeiro a metáfora, depois o termo técnico.** Cada ideia começa na Empresa da IA e só então recebe seu nome formal.
2. **Uma ideia dominante por tela.** O espaço em branco e a hierarquia tipográfica evitam cansar um público iniciante.
3. **Comparar para ensinar.** Diagramas, fluxos e escolhas guiadas mostram onde cada recurso se encaixa.
4. **Interação como descoberta.** Cliques, atalhos e um quiz curto conduzem o ritmo do apresentador.

### Filosofia de cor
O fundo será um azul-noite quase preto, que cria foco de auditório sem usar a estética neon. Tons de papel mineral, azul de monitor e coral de sinalização organizam informação em camadas. O **coral de sinal** é reservado para decisões, alertas e ações — uma cor que o público aprende a reconhecer no decorrer da apresentação.

### Paradigma de layout
O site se comporta como um **deck de apresentação imersivo**, não como uma página comum: slides de ocupação total com uma coluna vertical de trilha de progresso, uma régua temporal e grandes composições assimétricas. A navegação fixa é discreta para nunca competir com a história principal.

### Elementos de assinatura

1. **Linha de sinal**: uma linha pontilhada coral que conecta conceitos e se anima conforme o avanço da apresentação.
2. **Cartões de função**: blocos de bordas finas e etiquetas de categoria, inspirados em fichas operacionais.
3. **Pulso de contexto**: círculos concêntricos e barras de atenção que tornam visível o que a IA consegue processar.

### Filosofia de interação
Toda interação deve responder rapidamente e ensinar algo. A navegação por seta/teclado simula o controle de uma apresentação; decisões no quiz mostram a resposta e a lógica; elementos técnicos revelam camadas apenas quando solicitados.

### Animação
As entradas ocorrem por deslizamento curto e opacidade, com variações de 30–80 ms entre itens. Fluxos seguem a linha de sinal, e diagramas são desenhados de forma progressiva. As transições de slide devem ficar entre 300 e 450 ms, com `prefers-reduced-motion` respeitado. Não haverá animações decorativas contínuas.

### Sistema tipográfico
**DM Sans** organiza textos, rótulos e explicações pelo seu tom humano e preciso. **Bodoni Moda** é usada exclusivamente em títulos e palavras-chave, conferindo presença editorial. Títulos usam contraste de peso e escala; frases explicativas se mantêm curtas e muito legíveis.

### Essência da marca
**Uma sessão visual que torna a arquitetura de IA compreensível para quem está começando — sem sacrificar profundidade.** Personalidade: lúcida, envolvente e confiante.

### Voz da marca
Títulos falam com clareza provocativa; CTAs convidam para uma descoberta concreta; microcopy remove ansiedade técnica.

> "A IA é brilhante. Mas sua mesa é pequena."

> "Não decore siglas. Entenda quem faz o quê."

### Wordmark e logo
O logotipo é o **Nexo**: três trilhas que convergem em um nó central, representando conhecimento (skill), ação externa (MCP) e trabalho especializado (subagente). O símbolo não inclui texto e funciona em favicon, marca d'água e navegação.

### Cor de assinatura
**Coral de Sinal — `#FF6958`**. Um coral quente e inequívoco, usado com parcimônia para orientar decisões e trajetos de aprendizado.

## Style Decisions

- A **linha de sinal coral** atravessa cada lâmina relevante como trilha pontilhada ou rota direcional; ela sempre indica avanço narrativo, uma conexão ou uma decisão.
- O **Nexo** é uma marca sem texto feita de três trilhas que convergem em um nó central. A mesma geometria se repete na navegação e nas rotas visuais, para que o sistema seja reconhecível mesmo sem o nome.
- Imagens e diagramas partem da metáfora da **Empresa da IA**: primeiro apresentam funções e relações humanas; só depois introduzem o nome técnico de cada recurso.

## Evolução: Missão “Primeiro Superpoder”

A experiência deixa de ser somente uma explicação de conceitos e passa a ser uma **missão guiada**. A abertura desafia o grupo a resolver uma situação corporativa simples — entender um bug, aplicar um padrão de código e consultar uma informação — e a cada ato revela qual “superpoder” de IA resolve aquela parte. O público não assiste a uma lista de siglas: acompanha uma operação que ganha capacidade a cada escolha.

O novo menu, **Central de Prática**, funciona como uma pequena sala de treinamento para o IntelliJ com GitHub Copilot. Ele organiza quatro momentos: preparar o ambiente, perguntar sobre um arquivo, pedir uma alteração segura e revisar o resultado. Cada etapa terá uma imagem instrucional, um prompt pronto para copiar e uma definição direta de “o que observar”.

### Regras da evolução

- Cada conceito passa a estar ligado a um cenário comum de trabalho — bug, melhoria, revisão ou busca de informação — antes de qualquer definição técnica.
- A apresentação ganha um marcador de missão e um placar de superpoderes para tornar a progressão mais tangível e participativa.
- A Central de Prática usa visuais no estilo de uma oficina de código: telas organizadas, realces coral somente nas ações e passos numerados em sequência.

## Decisões de estilo — missão e prática

- A primeira tela começa pela missão humana — uma IA genial com uma mesa pequena — e deixa as siglas técnicas para a descoberta posterior.
- O coral significa uma rota de decisão ativa; cada módulo de missão deve revelar qual ação ou capacidade está sendo desbloqueada.
- O símbolo Nexo de três rotas convergentes aparece como marca independente na navegação e em composições principais, não somente acompanhado por texto.
- A promessa prática de IntelliJ + Copilot aparece como rota paralela desde o início: a pessoa entende o conceito e pode praticá-lo com segurança em seguida.

## Style Decisions

- O módulo MCP usa uma **missão de treinamento**: descobrir a ponte, criar a ferramenta e confirmar a resposta. A pessoa sempre sabe em qual etapa está.
- A linha coral acompanha etapas e conexões reais; ela não é decoração. No roteiro prático, ela marca o avanço de cada passo concluído.
- O símbolo **Nexo** reaparece como três rotas que convergem para um nó: agente, servidor MCP e ferramenta. O fundo mineral permanece dominante, pois é uma exigência explícita deste material para iniciantes.
- A imagem técnica de arquitetura MCP entra em uma moldura editorial azul-noite, com rótulo de estação e legenda explicativa; assim, ela é apresentada como parte da missão, não como uma captura solta.
- As capacidades Tools, Prompts e Resources recebem marcadores sequenciais de capacidade para reforçar que o coral indica um desbloqueio ou rota ativa.
- A prática em Windows é uma sequência de estações: cada passo começa na linha coral, apresenta uma ação dominante e termina em uma confirmação visual. O Nexo reaparece no fluxo final como comando, MCP e resposta convergindo no mesmo resultado.
- O módulo Subagentes será uma **Central de Operação**: um agente principal distribui uma missão para especialistas de pesquisa, DevOps e qualidade, que trabalham com contexto próprio e retornam relatórios curtos. A metáfora é uma operação corporativa coordenada, não uma cozinha.
- O diagrama principal usa a geometria Nexo como caminho de delegação e retorno: coral indica missão enviada, azul-noite indica contexto isolado e verde discreto indica resultado consolidado. A combinação **Subagentes + Skills** aparece como um kit operacional: especialista + manual reutilizável.

## Style Decisions

- A leitura do módulo Subagentes é uma missão de cinco atos: delegar, orquestrar, delimitar, padronizar e decidir. Cada ato declara a capacidade que foi desbloqueada.
- A trilha coral é estrutural: conecta os atos, sinaliza a missão ativa e aparece como três rotas Nexo entre envio, contextos isolados e retorno consolidado.

## Decisões de estilo — Resumo

- A página **Resumo** é o fechamento da apresentação em três lâminas: padrão, acesso e execução. Uma régua coral marca o avanço entre elas.
- A síntese usa a metáfora de uma **Central de Operação**: Skill é playbook, MCP é ponte de acesso e Subagente é frente especializada. Não usar metáforas de cozinha, receitas ou sous-chefs.
- O diagrama final é nativo do sistema Nexo: três rotas convergem da demanda do agente principal para um resultado consolidado; coral indica rota ativa e verde discreto confirma a entrega.

## Style Decisions — missão RAG

- O módulo RAG é organizado como uma sequência de **estações de consulta**: pergunta, fonte, contexto e resposta verificável.
- A linha coral é uma rota operacional visível. Ela sempre mostra direção, decisão ou validação; nunca é apenas sublinhado decorativo.
- Diagramas externos entram como **evidência de estação**: moldura azul-noite, rótulo curto, legenda e conexão visual com a geometria Nexo.
