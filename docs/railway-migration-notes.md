# Migração para Railway — dados verificados

Em 19 de agosto de 2026, foi confirmado acesso ao projeto Railway informado pelo usuário: `workshop-ai-architeture`, no ambiente `production`.

O serviço existente chama-se `workshop-IA-architecture` e está online, implantado pelo GitHub. A URL Railway atual é `https://workshop-ia-architecture-production.up.railway.app`.

O serviço não possui variáveis de ambiente configuradas pelo usuário. O painel indica oito variáveis internas adicionadas pela Railway. Ainda não existe um serviço de banco de dados no diagrama do projeto; será necessário criar um banco MySQL, configurar `DATABASE_URL` e transferir as tabelas da aplicação de origem.

O banco MySQL foi criado no ambiente `production` em 19 de agosto de 2026. O serviço está online e inclui o volume persistente `mysql-volume`. As variáveis de conexão internas serão vinculadas ao serviço de aplicação na próxima etapa.

O MySQL disponibiliza as referências `MYSQL_URL`, `MYSQL_DATABASE`, `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER` e `MYSQLPASSWORD`. Os valores permanecem mascarados no painel e devem ser consumidos por referência interna, sem cópia de segredos para código ou documentação.

O serviço `workshop-IA-architecture` recebeu a variável `DATABASE_URL` apontando para `${{MySQL.MYSQL_URL}}`. A alteração foi aplicada no Railway e desencadeou uma nova implantação do serviço.

No momento da configuração, a implantação anterior permanecia ativa e a nova implantação estava em fase de construção. A Railway informa execução em `US West`, com um réplica Node.js, e expõe o domínio provisório `https://workshop-ia-architecture-production.up.railway.app`.

Também foi configurada uma `JWT_SECRET` aleatória diretamente como segredo do serviço, sem registrar seu valor em arquivos. O painel do MySQL oferece as áreas `Database` e `Console`, que serão usadas para aplicar as quatro migrações versionadas e importar os dados sem abrir as credenciais de conexão.

## Bloqueio atual de implantação

O serviço Railway mostra a origem `julianopbinder/workshop-IA-architecture`, porém o painel informa **“GitHub Repo not found”**. Ao tentar editar a origem, a integração da Railway só oferece acesso ao repositório `julianopbinder/desafio-votos`. Assim, a Railway permanece na implantação anterior e ainda não recebeu a versão corrigida enviada ao repositório da aplicação. É necessário conceder à aplicação GitHub da Railway acesso ao repositório `julianopbinder/workshop-IA-architecture` e reconectar a origem para que o deploy atual seja aplicado.

## Diagnóstico confirmado posteriormente

O domínio Railway responde, porém as chamadas do Quiz retornam HTTP 500 porque a implantação ativa ainda usa um comando que inicia somente o servidor, sem executar as migrações. A tabela `quiz_rounds` ainda não existe no MySQL Railway. Além disso, o painel de configurações do serviço voltou a indicar **Connect Source**, confirmando que a origem GitHub continua desconectada. Ao reconectar `julianopbinder/workshop-IA-architecture`, deve ser executada a versão que inclui o `railway.json`, cuja inicialização aplica `pnpm drizzle-kit migrate` antes de iniciar a aplicação.

Em tentativas posteriores, a lista do Railway exibiu o repositório correto, mas a seleção fechou a janela sem persistir o vínculo: a tela permaneceu em **Connect Source**. Portanto, não há uma implantação nova em andamento e a etapa de conexão da origem requer intervenção pelo painel autenticado da Railway.

Foi verificada a configuração disponível nesta sessão e não existe conector ou cliente Railway autenticado que permita disparar o vínculo ou a implantação fora do painel web. O repositório permanece visível na lista da Railway, mas a operação de vínculo ainda não é persistida pelo painel automatizado.

## Publicação iniciada

Em 19/08/2026, o repositório `julianopbinder/workshop-IA-architecture` foi conectado novamente à branch `main` e a publicação foi confirmada no painel Railway. A implantação `df860c52-e746-49ae-8632-0de53c234ca0` iniciou a construção da versão que contém as correções. Os registros de build confirmam o comando de início `pnpm drizzle-kit migrate && pnpm start`, que deve criar as tabelas do Quiz antes de subir o servidor. Os avisos de Docker sobre `JWT_SECRET` e `NIXPACKS_PATH` foram apresentados como avisos de lint durante a criação da imagem, sem indicar falha de build naquele momento.
