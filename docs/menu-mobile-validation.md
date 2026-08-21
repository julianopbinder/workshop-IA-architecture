# Validação do painel móvel

Data: 2026-08-21.

O painel foi validado em navegador isolado com viewport de **375 × 812 px**. Na abertura, o painel apresentou fundo `rgb(255, 255, 255)`, opacidade `1`, largura de `320 px` e altura de `812 px`. Um toque na área externa, fora do painel, removeu corretamente os estados `is-open` da camada externa e do painel.

A prévia local foi compilada com sucesso e a suíte de 24 testes passou. O commit `6b89429b` foi sincronizado à branch `main`; a Railway continua respondendo publicamente e a atualização do bundle de produção está em propagação no momento deste registro.
