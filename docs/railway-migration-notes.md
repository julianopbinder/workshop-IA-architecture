# Migração para Railway — dados verificados

Em 19 de agosto de 2026, foi confirmado acesso ao projeto Railway informado pelo usuário: `workshop-ai-architeture`, no ambiente `production`.

O serviço existente chama-se `workshop-IA-architecture` e está online, implantado pelo GitHub. A URL Railway atual é `https://workshop-ia-architecture-production.up.railway.app`.

O serviço não possui variáveis de ambiente configuradas pelo usuário. O painel indica oito variáveis internas adicionadas pela Railway. Ainda não existe um serviço de banco de dados no diagrama do projeto; será necessário criar um banco MySQL, configurar `DATABASE_URL` e transferir as tabelas da aplicação de origem.

O banco MySQL foi criado no ambiente `production` em 19 de agosto de 2026. O serviço está online e inclui o volume persistente `mysql-volume`. As variáveis de conexão internas serão vinculadas ao serviço de aplicação na próxima etapa.

O MySQL disponibiliza as referências `MYSQL_URL`, `MYSQL_DATABASE`, `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER` e `MYSQLPASSWORD`. Os valores permanecem mascarados no painel e devem ser consumidos por referência interna, sem cópia de segredos para código ou documentação.

O serviço `workshop-IA-architecture` recebeu a variável `DATABASE_URL` apontando para `${{MySQL.MYSQL_URL}}`. A alteração foi aplicada no Railway e desencadeou uma nova implantação do serviço.

No momento da configuração, a implantação anterior permanecia ativa e a nova implantação estava em fase de construção. A Railway informa execução em `US West`, com um réplica Node.js, e expõe o domínio provisório `https://workshop-ia-architecture-production.up.railway.app`.

Também foi configurada uma `JWT_SECRET` aleatória diretamente como segredo do serviço, sem registrar seu valor em arquivos. O painel do MySQL oferece as áreas `Database` e `Console`, que serão usadas para aplicar as quatro migrações versionadas e importar os dados sem abrir as credenciais de conexão.
