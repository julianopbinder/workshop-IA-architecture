# Exemplo guiado — Skill para revisão de API Java

## Cenário

O time mantém uma API Java e quer que toda alteração de validação siga as mesmas regras: Java 21, testes JUnit 5, nenhum dado sensível em logs e explicação do plano antes de modificar vários arquivos.

## Skill de referência

```markdown
---
name: java-api-review
description: Use esta Skill ao criar ou revisar validações de endpoints Java.
---

# Regras

1. Use Java 21 e mantenha métodos pequenos.
2. Crie ou atualize testes JUnit 5 para cada regra nova.
3. Não registre tokens, senhas ou dados pessoais em logs.
4. Antes de editar vários arquivos, explique o plano e os riscos.
```

## Exemplo de código

```java
public boolean hasValidOrderId(String orderId) {
    return orderId != null
        && !orderId.isBlank()
        && orderId.matches("\\d+");
}
```

## Tutorial no IntelliJ com Copilot

1. Instale e entre no GitHub Copilot pelo menu `Settings > Plugins`.
2. Para o uso cotidiano do Copilot no IntelliJ, registre as regras equivalentes em `.github/copilot-instructions.md`. O padrão de diretório com `SKILL.md` continua sendo a referência para plataformas de agentes que suportam Skills.
3. Selecione o método `hasValidOrderId` e pergunte no chat: “Explique esta validação e proponha três testes JUnit 5. Não altere arquivos.”
4. Leia a proposta, compare com a Skill e só então copie ou aceite o teste.
5. Execute os testes do projeto e revise o diff antes de finalizar.

## Resultado esperado

O Copilot não substitui a decisão do desenvolvedor. Ele trabalha com mais contexto e repete melhor o padrão que o time definiu.
