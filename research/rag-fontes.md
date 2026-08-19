# Referências de pesquisa — módulo RAG

## Curso indicado

- Vídeo: [RAG is Not an AI Agent: The Difference Most People Ignore](https://www.youtube.com/watch?v=aYEa5svlzC0), canal Full Cycle.
- Síntese aplicada: RAG é um fluxo de recuperar informação externa, anexar contexto à pergunta e então gerar uma resposta. O vídeo diferencia esse fluxo de um agente: o agente pode usar RAG para se informar, mas RAG não é, sozinho, um agente que planeja ou executa ações.

## Fontes técnicas consultadas

| Fonte | Pontos incorporados ao módulo |
| --- | --- |
| [AWS — What is RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/) | RAG recupera dados em uma base de conhecimento antes de gerar a resposta; documentos podem ser preparados, representados e atualizados fora do modelo. |
| [IBM — What is RAG](https://www.ibm.com/think/topics/retrieval-augmented-generation) | O fluxo essencial é pergunta, recuperação, contexto aumentado e geração. RAG pode reduzir respostas sem base, mas não torna a IA infalível. |
| [Databricks — What is RAG](https://www.databricks.com/blog/what-is-retrieval-augmented-generation) | Casos adequados incluem documentos internos, suporte e busca com respostas; a qualidade da recuperação define a qualidade da resposta. |
| [NVIDIA — Traditional vs. Agentic RAG](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/) | RAG tradicional segue pergunta, busca e resposta. Um agente pode decidir e refinar como busca informações, usando RAG como um recurso. |

## Decisões editoriais

1. O módulo usará o fluxo simples **Pergunta → Busca → Contexto → Resposta** como entrada para leigos.
2. O diagrama enviado pelo usuário será usado como referência visual clicável, com explicação original ao lado.
3. A demonstração será uma consulta ao manual interno de reembolso, para mostrar informação privada e atualizada sem exigir programação.
4. O material explicará que RAG melhora a resposta ao fornecer fontes adequadas, mas ainda exige curadoria, acesso correto e validação humana.
