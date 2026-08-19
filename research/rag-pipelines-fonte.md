# Referência técnica — RAG, ingestão e consulta

Fonte consultada: NVIDIA Technical Blog, [RAG 101: Demystifying Retrieval-Augmented Generation Pipelines](https://developer.nvidia.com/blog/rag-101-demystifying-retrieval-augmented-generation-pipelines/), 18 dez. 2023.

Pontos usados no módulo, reescritos em linguagem para iniciantes:

- Um RAG costuma separar o processamento de documentos, feito antes e de forma recorrente, da consulta feita quando uma pessoa envia uma pergunta.
- A ingestão pode carregar documentos, separar textos longos em trechos, gerar embeddings e guardar texto, origem e vetores em uma base apropriada para busca.
- Na consulta, a pergunta é comparada com os itens armazenados; os trechos mais relevantes são enviados ao modelo como contexto para a geração da resposta.
- RAG oferece conhecimento recuperado ao modelo. Um agente pode usar essa capacidade como parte de uma tarefa maior, mas os dois conceitos têm papéis diferentes.
