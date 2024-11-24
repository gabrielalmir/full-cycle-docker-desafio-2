# Desafio Full Cycle - NGINX, Node.js e MySQL com Docker

Este projeto faz parte de um desafio Full Cycle para demonstrar a configuração e uso do NGINX como proxy reverso para uma aplicação Node.js. A aplicação realiza uma conexão com o banco de dados MySQL, insere um registro em cada visita e exibe uma lista de registros.

## Descrição do Projeto

A aplicação é composta por:
- **NGINX** como proxy reverso, para direcionar as requisições recebidas na porta 8080 para o servidor Node.js.
- **Aplicação Node.js** que responde às requisições, insere um nome aleatório no banco de dados e retorna uma lista de todos os nomes cadastrados com a mensagem **"Full Cycle Rocks!"**.
- **MySQL** como banco de dados para armazenar os nomes.

## Estrutura do Projeto

```
.
├── docker-compose.yml
├── nginx
│   └── default.conf
├── app
│   ├── Dockerfile
│   ├── src
│   │   ├── main.js
│   │   └── db.js
│   └── package.json
└── README.md
```

## Como Executar o Projeto

### Pré-Requisitos

- **Docker** e **Docker Compose** instalados

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/gabrielalmir/full-cycle-docker-desafio-2
   cd full-cycle-docker-desafio-2
   ```

2. **Suba os containers**:

   Execute o comando abaixo para construir e iniciar todos os serviços em segundo plano:

   ```bash
   docker-compose up -d
   ```

   Isso iniciará os seguintes containers:
   - **nginx**: disponível na porta 8080
   - **app** (Node.js): disponível internamente na porta 3000
   - **mysql**: banco de dados MySQL com as credenciais fornecidas no `docker-compose.yml`

3. **Acesse a aplicação**:

   Abra o navegador e acesse [http://localhost:8080](http://localhost:8080). Cada visita à aplicação:
   - Adicionará um novo nome no banco de dados.
   - Exibirá a mensagem **"Full Cycle Rocks!"** seguida da lista de nomes cadastrados.

### Para Parar os Containers

Para encerrar todos os containers, use:

```bash
docker-compose down
```

## Estrutura dos Arquivos Principais

- **docker-compose.yml**: Configuração de todos os serviços (nginx, Node.js, MySQL) e rede interna.
- **nginx/default.conf**: Configuração do NGINX como proxy reverso.
- **app/Dockerfile**: Dockerfile para a construção da imagem da aplicação Node.js.
- **app/src/main.js**: Código principal do servidor em Node.js, que conecta ao MySQL e manipula as requisições HTTP.
- **app/src/db.js**: Conexão e configuração do banco de dados MySQL.
- **app/package.json**: Dependências e scripts da aplicação Node.js.
