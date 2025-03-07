# ONEC Backend - Gestão de Negociações e Contratos

## 📌 Sobre o Projeto

O **ONEC Backend** é um sistema desenvolvido para a gestão de **negociações, contratos e parceiros**, trazendo mais eficiência e automação para a administração de processos empresariais. O projeto foi desenvolvido como um **freelancer** para atender necessidades específicas de gerenciamento e controle.

Este backend é baseado no **Fastify**, garantindo alta performance e escalabilidade, e utiliza **Drizzle ORM** para gerenciamento de banco de dados, além de autenticação JWT e outras ferramentas modernas para segurança e confiabilidade.

---

## 🚀 Tecnologias Utilizadas

### 🔹 **Principais Dependências:**
- **[Fastify](https://www.fastify.io/)** → Framework web rápido e leve.
- **[Drizzle ORM](https://orm.drizzle.team/)** → ORM moderno e tipado para bancos SQL.
- **[Postgres](https://www.postgresql.org/)** → Banco de dados relacional robusto.
- **[Zod](https://zod.dev/)** → Validação de dados com tipagem forte.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** → Hash de senhas para segurança dos usuários.
- **[JWT (JSON Web Token)](https://www.npmjs.com/package/jose)** → Autenticação segura.
- **[Day.js](https://day.js.org/)** → Manipulação de datas de forma eficiente.

### 🔹 **Ferramentas de Desenvolvimento:**
- **[Vitest](https://vitest.dev/)** → Testes unitários rápidos e eficientes.
- **[TypeScript](https://www.typescriptlang.org/)** → Tipagem estática para maior confiabilidade no código.
- **[Tsup](https://github.com/egoist/tsup)** → Empacotamento eficiente do TypeScript.
- **[TSX](https://www.npmjs.com/package/tsx)** → Execução de arquivos TypeScript diretamente.
- **[Drizzle Kit](https://orm.drizzle.team/docs/cli)** → Ferramenta para migrações e manipulação de banco de dados.

---

## 📦 Estrutura do Projeto

```
📂 onec-backend
 ┣ 📂 src
 ┃ ┣ 📂 application
 ┃ ┃ ┣ 📂 services → Regras de negócio e lógica de autenticação.
 ┃ ┣ 📂 domain
 ┃ ┃ ┣ 📂 entities → Definição das entidades do sistema.
 ┃ ┃ ┣ 📂 repositories → Interfaces dos repositórios.
 ┃ ┣ 📂 infrastructure
 ┃ ┃ ┣ 📂 db → Configuração do banco de dados e migrações.
 ┃ ┃ ┣ 📂 server.ts → Inicialização do servidor Fastify.
 ┣ 📂 tests
 ┃ ┣ 📂 application → Testes dos serviços e regras de negócio.
 ┣ 📄 package.json → Dependências e scripts do projeto.
 ┣ 📄 .env → Configurações sensíveis (banco de dados, JWT, etc.).
```

---

## 🛠️ Configuração e Execução

### 🔹 **1. Pré-requisitos**
- Node.js `>=18.12`
- PNPM `>=10.4.1`
- Banco de Dados **PostgreSQL**

### 🔹 **2. Clonar o Repositório**
```sh
$ git clone https://github.com/seu-usuario/onec-backend.git
$ cd onec-backend
```

### 🔹 **3. Instalar Dependências**
```sh
$ pnpm install
```

### 🔹 **4. Configurar Variáveis de Ambiente**
Crie um arquivo **.env** na raiz do projeto e adicione as configurações necessárias, como conexão com o banco de dados:

```
DATABASE_URL=postgres://usuario:senha@localhost:5432/onec
JWT_SECRET=seu_token_secreto
```

### 🔹 **5. Rodar as Migrações do Banco de Dados**
```sh
$ pnpm run db:migrate:test
```

### 🔹 **6. Iniciar o Servidor em Modo de Desenvolvimento**
```sh
$ pnpm run dev
```

### 🔹 **7. Rodar os Testes**
```sh
$ pnpm run test
```

---

## ✅ Testes Automatizados
Este projeto possui **testes unitários** para garantir o funcionamento correto dos serviços.

Para rodar os testes:
```sh
$ pnpm run test
```
Ou em modo **watch**:
```sh
$ pnpm run test:watch
```

Os testes utilizam **Vitest**, garantindo um feedback rápido e preciso.

---

## 📤 Deploy e CI/CD
O projeto está configurado para rodar os testes automaticamente a cada commit no GitHub, utilizando **GitHub Actions**.

- Toda vez que um commit for feito na branch `main`, os testes serão executados automaticamente.
- Em caso de falha, o commit será identificado como problemático.

---

## 🔗 Endpoints (Swagger)
Este backend expõe uma documentação interativa via **Swagger UI**.

Após iniciar o servidor, acesse:
```
http://localhost:3000/docs
```
para visualizar e testar os endpoints disponíveis.

---

## 📝 Licença
Este projeto foi desenvolvido como freelancer e não possui uma licença pública.

---

## 🤝 Contato
Caso tenha dúvidas ou precise de suporte, entre em contato:

📧 **guilhermebuenoreis@gmail.com**

🚀 **ONEC Backend - Gestão eficiente de negociações e contratos!**

