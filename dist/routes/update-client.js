"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/update-client.ts
var update_client_exports = {};
__export(update_client_exports, {
  updateClientRoute: () => updateClientRoute
});
module.exports = __toCommonJS(update_client_exports);
var import_zod2 = require("zod");

// src/infrastructure/db/cruds/drizzle-client-repository.ts
var import_drizzle_orm = require("drizzle-orm");

// src/infrastructure/db/index.ts
var import_postgres_js = require("drizzle-orm/postgres-js");
var import_postgres = __toESM(require("postgres"));

// src/infrastructure/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  clientReceipt: () => clientReceipt,
  clients: () => clients,
  contracts: () => contracts,
  credentials: () => credentials,
  negotiations: () => negotiations,
  partners: () => partners,
  pendingCategoryEnum: () => pendingCategoryEnum,
  pendingIssues: () => pendingIssues,
  pendingStatusEnum: () => pendingStatusEnum,
  portalControls: () => portalControls,
  statusEnum: () => statusEnum,
  users: () => users
});
var import_cuid2 = require("@paralleldrive/cuid2");
var import_pg_core = require("drizzle-orm/pg-core");
var import_pg_core2 = require("drizzle-orm/pg-core");
var statusEnum = (0, import_pg_core.pgEnum)("status", [
  "Ativos",
  "Finalizados",
  "Em Andamento",
  "Em migra\xE7\xE3o"
]);
var pendingStatusEnum = (0, import_pg_core.pgEnum)("pending_status", [
  "Aberto",
  "Encaminhado",
  "Pendente",
  "Conclu\xEDdo"
]);
var pendingCategoryEnum = (0, import_pg_core.pgEnum)("pending_category", [
  "SAC",
  "Atendimento",
  "Financeiro",
  "Diretoria",
  "Comercial",
  "Auditoria"
]);
var partners = (0, import_pg_core2.pgTable)("partners", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  name: (0, import_pg_core2.text)("name"),
  cpfOrCnpj: (0, import_pg_core2.text)("cpf_or_cnpj"),
  city: (0, import_pg_core2.text)("city"),
  state: (0, import_pg_core2.text)("state"),
  commission: (0, import_pg_core2.real)("commission"),
  portal: (0, import_pg_core2.text)("portal"),
  channelHead: (0, import_pg_core2.text)("channel_head"),
  regional: (0, import_pg_core2.text)("regional"),
  coordinator: (0, import_pg_core2.text)("coordinator"),
  agent: (0, import_pg_core2.text)("agent"),
  indicator: (0, import_pg_core2.text)("indicator"),
  contract: (0, import_pg_core2.text)("contract"),
  phone: (0, import_pg_core2.text)("phone"),
  email: (0, import_pg_core2.text)("email"),
  responsible: (0, import_pg_core2.text)("responsible"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var negotiations = (0, import_pg_core2.pgTable)("negotiation_imports", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  title: (0, import_pg_core2.text)("title"),
  client: (0, import_pg_core2.text)("client"),
  user: (0, import_pg_core2.text)("user"),
  tags: (0, import_pg_core2.text)("tags"),
  step: (0, import_pg_core2.text)("step"),
  status: (0, import_pg_core2.text)("status"),
  value: (0, import_pg_core2.real)("value"),
  startsDate: (0, import_pg_core2.text)("starts_date"),
  observation: (0, import_pg_core2.text)("observation"),
  partnerId: (0, import_pg_core2.text)("partner_id"),
  averageGuide: (0, import_pg_core2.real)("average_guide"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var contracts = (0, import_pg_core2.pgTable)("contracts", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  city: (0, import_pg_core2.text)("city"),
  client: (0, import_pg_core2.text)("clients"),
  state: (0, import_pg_core2.text)("state"),
  cnpj: (0, import_pg_core2.text)("cnpj"),
  sindic: (0, import_pg_core2.text)("sindic"),
  year: (0, import_pg_core2.text)("year"),
  matter: (0, import_pg_core2.text)("matter"),
  forecast: (0, import_pg_core2.text)("forecast"),
  contractTotal: (0, import_pg_core2.text)("contract_total"),
  percentage: (0, import_pg_core2.real)("percentage"),
  signedContract: (0, import_pg_core2.text)("signed_contract"),
  status: (0, import_pg_core2.text)("status"),
  averageGuide: (0, import_pg_core2.real)("average_guide"),
  partner: (0, import_pg_core2.text)("partner"),
  partnerCommission: (0, import_pg_core2.real)("partner_commission"),
  counter: (0, import_pg_core2.text)("counter"),
  email: (0, import_pg_core2.text)("email"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var users = (0, import_pg_core2.pgTable)("users", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  email: (0, import_pg_core2.text)("email").notNull().unique(),
  passwordHash: (0, import_pg_core2.text)("password_hash").notNull(),
  role: (0, import_pg_core2.text)("role").notNull(),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var pendingIssues = (0, import_pg_core2.pgTable)("pending_issues", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  client: (0, import_pg_core2.text)("client"),
  callReason: (0, import_pg_core2.text)("call_reason"),
  status: pendingStatusEnum(),
  priority: (0, import_pg_core2.text)("priority"),
  responsible: (0, import_pg_core2.text)("Responsible"),
  category: pendingCategoryEnum(),
  description: (0, import_pg_core2.text)("description"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var portalControls = (0, import_pg_core2.pgTable)("portal_controls", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  monthOfCalculation: (0, import_pg_core2.text)("month_of_calculation"),
  competenceMonth: (0, import_pg_core2.text)("competence_month"),
  contract: (0, import_pg_core2.real)("contract"),
  enterprise: (0, import_pg_core2.text)("enterprise"),
  product: (0, import_pg_core2.text)("product"),
  percentageHonorary: (0, import_pg_core2.real)("percentage_honorary"),
  compensation: (0, import_pg_core2.real)("compensation"),
  honorary: (0, import_pg_core2.real)("honorary"),
  tax: (0, import_pg_core2.real)("tax"),
  tj: (0, import_pg_core2.real)("tj"),
  value: (0, import_pg_core2.real)("value"),
  situation: (0, import_pg_core2.text)("situation"),
  partnerId: (0, import_pg_core2.text)("partner_id").notNull().references(() => partners.id),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var credentials = (0, import_pg_core2.pgTable)("credentials", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  channelHead: (0, import_pg_core2.text)("channel_head"),
  partner: (0, import_pg_core2.text)("partner"),
  cnpj: (0, import_pg_core2.text)("cnpj"),
  agentIndicator: (0, import_pg_core2.text)("agent_indicator"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var clients = (0, import_pg_core2.pgTable)("clients", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  enterprise: (0, import_pg_core2.text)("enterprise"),
  cnpj: (0, import_pg_core2.text)("cnpj"),
  product: (0, import_pg_core2.text)("product"),
  competenceMonth: (0, import_pg_core2.text)("competence_month"),
  contestation: (0, import_pg_core2.text)("contestation"),
  returned: (0, import_pg_core2.text)("return"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var clientReceipt = (0, import_pg_core2.pgTable)("client_receipt", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()),
  receiptDate: (0, import_pg_core2.text)("receipt_date"),
  competence: (0, import_pg_core2.text)("competence"),
  cnpj: (0, import_pg_core2.text)("cnpj"),
  clientName: (0, import_pg_core2.text)("client_name"),
  percentage: (0, import_pg_core2.real)("percentage"),
  compensationMonth: (0, import_pg_core2.text)("compensation_month"),
  honorary: (0, import_pg_core2.real)("honorary"),
  tax: (0, import_pg_core2.real)("tax"),
  status: (0, import_pg_core2.text)("status"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});

// src/env.ts
var import_zod = __toESM(require("zod"));
var envSchema = import_zod.default.object({
  NODE_ENV: import_zod.default.enum(["development", "test", "production"]).optional().default("production"),
  DATABASE_URL: import_zod.default.string().url(),
  JWT_SECRET: import_zod.default.string(),
  ADMIN1_EMAIL: import_zod.default.string(),
  ADMIN1_PASSWORD: import_zod.default.string(),
  ADMIN2_EMAIL: import_zod.default.string(),
  ADMIN2_PASSWORD: import_zod.default.string(),
  ADMIN3_EMAIL: import_zod.default.string(),
  ADMIN3_PASSWORD: import_zod.default.string()
});
var env = envSchema.parse(process.env);

// src/infrastructure/db/index.ts
var client = (0, import_postgres.default)(env.DATABASE_URL);
var db = (0, import_postgres_js.drizzle)(client, {
  schema: schema_exports,
  logger: env.NODE_ENV === "development"
});

// src/domain/entities/Client.ts
var import_cuid22 = require("@paralleldrive/cuid2");
var Client = class {
  constructor(id = (0, import_cuid22.createId)(), enterprise, cnpj, competenceMonth, product, contestation, returned) {
    this.id = id;
    this.enterprise = enterprise;
    this.cnpj = cnpj;
    this.competenceMonth = competenceMonth;
    this.product = product;
    this.contestation = contestation;
    this.returned = returned;
  }
};

// src/infrastructure/db/cruds/drizzle-client-repository.ts
var DrizzleClientRepository = class {
  async create(data) {
    const newClient = new Client(
      void 0,
      data.enterprise,
      data.competenceMonth,
      data.cnpj,
      data.product,
      data.contestation,
      data.returned
    );
    const response = await db.insert(clients).values(newClient).returning();
    const client2 = response[0];
    return client2;
  }
  async select() {
    const response = await db.select().from(clients);
    return response;
  }
  async update(id, data) {
    const response = await db.update(clients).set(data).where((0, import_drizzle_orm.eq)(clients.id, id)).returning();
    const updatedClient = response[0];
    return updatedClient;
  }
  async delete(id) {
    const response = await db.delete(clients).where((0, import_drizzle_orm.eq)(clients.id, id)).returning();
    return response.length > 0;
  }
};

// src/routes/update-client.ts
var updateClientRoute = async (app) => {
  app.put(
    "/client/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateClient",
        tags: ["client"],
        description: "Update a client",
        params: import_zod2.z.object({
          id: import_zod2.z.string()
        }),
        body: import_zod2.z.object({
          enterprise: import_zod2.z.string().nullable(),
          competenceMonth: import_zod2.z.string().nullable(),
          cnpj: import_zod2.z.string().nullable(),
          contestation: import_zod2.z.string().nullable(),
          returned: import_zod2.z.string().nullable(),
          product: import_zod2.z.string().nullable()
        }).partial(),
        response: {
          200: import_zod2.z.object({
            message: import_zod2.z.string()
          }),
          404: import_zod2.z.object({
            message: import_zod2.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleClientRepository();
      const updated = await repo.update(id, request.body);
      if (!updated) {
        return reply.status(404).send({ message: "Cliente n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Cliente atualizada com sucesso!" });
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateClientRoute
});
