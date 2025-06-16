# ONEC Backend - Gestão de Negociações e Contratos

## 📌 Sobre o Projeto

O **ONEC Backend** é responsável pela gestão de **negociações, contratos e parceiros**, fornecendo automação de fluxos de trabalho empresariais. Desenvolvido como freelancer com foco em performance e segurança, utiliza **Fastify**, **Drizzle ORM** e autenticação JWT.

---

## 🚀 Tecnologias Utilizadas

**Dependências Principais:**

* **Fastify** → Framework HTTP de alta performance
* **Drizzle ORM** → ORM tipado para SQL
* **Postgres** → Banco de dados relacional
* **Zod** → Validação de dados e variáveis de ambiente
* **bcrypt** → Hash de senhas
* **jose** → Geração e verificação de JWT
* **Day.js** → Manipulação de datas
* **dotenv** → Carregamento de variáveis de ambiente
* **@fastify/\*** plugins (CORS, JWT, multipart, Swagger)
* **@paralleldrive/cuid2** → IDs únicos
* **cloudinary** → Upload de mídia
* **xlsx** → Excel import/export

**Ferramentas de Desenvolvimento:**

* **TypeScript** → Tipagem estática
* **Tsup** → Bundler para TypeScript
* **TSX** → Execução de TS nativa
* **Vitest** → Testes unitários
* **Drizzle Kit** → CLI de migrações
* **dotenv-cli** → Scripts com .env específico
* **Biome** → Lint e formatação

---

## 📦 Estrutura do Projeto

```
onec-backend/
├─ src/
│  ├─ application/
│  │  └─ services/         # Lógica de negócio (AuthService, ContractService, etc.)
│  ├─ domain/
│  │  ├─ entities/         # Modelos de domínio
│  │  └─ repositories/      # Interfaces e implementações (Memory, Drizzle)
│  ├─ infrastructure/
│  │  ├─ config/           # Configurações (e.g., jwt.ts com Zod)
│  │  ├─ db/
│  │  │  ├─ migrations/    # Migrações Drizzle Kit
│  │  │  └─ seed.ts        # Seed de dados
│  │  └─ server.ts         # Inicia Fastify e plugins
│  └─ tests/
│     └─ application/      # Testes dos services
├─ .env                    # Variáveis para dev/prod
├─ .env.test               # Variáveis para testes
├─ drizzle.config.ts       # Configuração Drizzle Kit
├─ tsconfig.json           # TS config
└─ package.json            # Dependências e scripts
```

---

## 🔧 Variáveis de Ambiente

Validação via Zod (`src/env.ts`):

```ts
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional().default('production'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  ADMIN1_EMAIL: z.string(),
  ADMIN1_PASSWORD: z.string(),
  ADMIN2_EMAIL: z.string(),
  ADMIN2_PASSWORD: z.string(),
  ADMIN3_EMAIL: z.string(),
  ADMIN3_PASSWORD: z.string(),
});
```

Arquivos de ambiente:

* **.env** → ambiente de dev/prod
* **.env.test** → ambiente de testes

---

## 🛠️ Scripts e Execução

* `pnpm install` → Instalar dependências
* `pnpm run dev` → Dev-mode (TSX watch + .env)
* `pnpm run build` → Gerar bundle (Tsup)
* `pnpm run start` → Executar build em produção
* `pnpm run seed` → Popular banco com seed
* `pnpm run db:migrate:test` → Migrações com `.env.test`
* `pnpm run test` → Testes unitários (Vitest)
* `pnpm run test:watch` → Testes em watch
* `pnpm run test:ci` → Testes para CI

---

## 🔗 Endpoints (Swagger)

Após iniciar o servidor em `http://localhost:3000`:

```
GET /docs
```

Acesse a interface Swagger para explorar e testar endpoints.

---

## 📝 Licença

Desenvolvido como freelancer; sem licença pública.

---

## 🤝 Contato

📧 [guilhermebuenoreis@gmail.com](mailto:guilhermebuenoreis@gmail.com)
