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
