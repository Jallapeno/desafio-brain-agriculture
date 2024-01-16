## DESAFIO BRAIN AGRICULTURE 1.0.0
### Início

  - 1 - Na raiz do projeto, renomeie o arquivo ````.env.example```` para ````.env````

  - 2 -  Após clonar o projeto e executar o comando ```` $ npm install ```` então em seu terminal execute ````$ docker-compose up -d```` para subir o dkcer que contém a imagem do banco de dados Postgres.

  - 3 - Execute em seu terminal o comando ````$ npx prisma migrate dev```` para gerar a migration e o banco de dados ````brainagriculturedb```` e suas respectivas tabelas no server docker gerado anteriormente.
---
### Testes e execução

  - 1 -  ````$ npm test```` para executar todos os testes.

  - 2 - ````$ npm run test:coverage```` para testar e gerar relatório de cobertura dos testes

  - 3 - ````$ npm start ```` executa o build da API e iniciar o server em ````http://localhost:3000````.

  - 4 - ````$ npm run lint```` e ````$ npm run lint:fix```` para fazer o uso do eslint.
---
### Rotas

  1. **Cadastrar um novo produtor**
    - Cria um novo produtor.

    - curl --request POST \
    --url http://localhost:3000/api/producer \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/8.5.1' \
    --data '{
    "cpfCnpj": "70671643037",
      "name": "Rick Sanchez",
      "farmName": "stardew valley",
      "city": "brasilia",
      "state": "df",
      "totalArea": 2000,
      "arableArea": 500,
      "vegetationArea": 700,
      "crops": ["milho", "soja", "trigo"]
    }'

  2. **Atualizar dados do produtor**
    - Atualiza os dados de um produtor existente.

    -  curl --request PUT \
    --url http://localhost:3000/api/producer/28 \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/8.5.1' \
    --data '{
    "cpfCnpj": "43746394031",
    "name": "Morty Sanchez",
    "farmName": "stardew valley",
    "city": "brasilia",
    "state": "df",
    "totalArea": 100,
    "arableArea": 100,
    "vegetationArea": 100,
    "crops": ["milho", "soja", "trigo"]
    }'

  3. **Listar todos os produtores cadastrados**
    - Retorna uma lista de todos os produtores cadastrados.

    - curl --request GET \
    --url http://localhost:3000/api/producer \
    --header 'User-Agent: insomnia/8.5.1'

  4. **Listar produtor por ID**
    - Retorna os detalhes de um produtor específico com base no ID.

    - curl --request GET \
    --url http://localhost:3000/api/producer/28 \
    --header 'User-Agent: insomnia/8.5.1'

  5. **Rota da Dashboard**
    - Retorna dados da dashboard.

    curl --request GET \
    --url http://localhost:3000/api/producer/dashboard \
    --header 'User-Agent: insomnia/8.5.1'
---

### Tecnologias utilizadas
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/) [![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) [![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/) [![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)](https://expressjs.com/) [![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/) [![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/) [![Husky](https://img.shields.io/badge/-Husky-4B32C3?logo=husky&logoColor=white)](https://typicode.github.io/husky/#/) [![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)


