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

// src/routes/get-portal-controll-by-id.ts
var get_portal_controll_by_id_exports = {};
__export(get_portal_controll_by_id_exports, {
  getPortalControllsBySelectByIdRoute: () => getPortalControllsBySelectByIdRoute
});
module.exports = __toCommonJS(get_portal_controll_by_id_exports);
var import_zod2 = require("zod");

// src/domain/entities/Portal-Controlls.ts
var import_cuid2 = require("@paralleldrive/cuid2");
var PortalControll = class {
  constructor(id = (0, import_cuid2.createId)(), monthOfCalculation, competenceMonth, contract, enterprise, product, percentageHonorary, compensation, honorary, tax, tj, value, situation, partnerId) {
    this.id = id;
    this.monthOfCalculation = monthOfCalculation;
    this.competenceMonth = competenceMonth;
    this.contract = contract;
    this.enterprise = enterprise;
    this.product = product;
    this.percentageHonorary = percentageHonorary;
    this.compensation = compensation;
    this.honorary = honorary;
    this.tax = tax;
    this.tj = tj;
    this.value = value;
    this.situation = situation;
    this.partnerId = partnerId;
  }
};

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
var import_cuid22 = require("@paralleldrive/cuid2");
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
  email: (0, import_pg_core2.text)("email").notNull().unique(),
  passwordHash: (0, import_pg_core2.text)("password_hash").notNull(),
  role: (0, import_pg_core2.text)("role").notNull(),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var pendingIssues = (0, import_pg_core2.pgTable)("pending_issues", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
  channelHead: (0, import_pg_core2.text)("channel_head"),
  partner: (0, import_pg_core2.text)("partner"),
  cnpj: (0, import_pg_core2.text)("cnpj"),
  agentIndicator: (0, import_pg_core2.text)("agent_indicator"),
  createdAt: (0, import_pg_core2.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core2.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow()
});
var clients = (0, import_pg_core2.pgTable)("clients", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()),
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

// src/infrastructure/db/cruds/drizzle-portal-controll-repository.ts
var import_drizzle_orm = require("drizzle-orm");
var DrizzlePortalControllRepository = class {
  async create(portalControllData) {
    const portalControll = new PortalControll(
      void 0,
      portalControllData.monthOfCalculation,
      portalControllData.competenceMonth,
      portalControllData.contract,
      portalControllData.enterprise,
      portalControllData.product,
      portalControllData.percentageHonorary,
      portalControllData.compensation,
      portalControllData.honorary,
      portalControllData.tax,
      portalControllData.tj,
      portalControllData.value,
      portalControllData.situation,
      portalControllData.partnerId
    );
    const response = await db.insert(portalControls).values({
      id: portalControll.id,
      monthOfCalculation: portalControll.monthOfCalculation,
      competenceMonth: portalControll.competenceMonth,
      contract: portalControll.contract,
      enterprise: portalControll.enterprise,
      product: portalControll.product,
      percentageHonorary: portalControll.percentageHonorary,
      compensation: portalControll.compensation,
      honorary: portalControll.honorary,
      tax: portalControll.tax,
      tj: portalControll.tj,
      value: portalControll.value,
      situation: portalControll.situation,
      partnerId: portalControll.partnerId
    }).returning();
    const created = response[0];
    if (!created) {
      throw new Error("Falha ao criar controle de portal.");
    }
    return {
      ...created,
      partnerId: created.partnerId ?? ""
    };
  }
  async select() {
    const response = await db.select({
      id: portalControls.id,
      monthOfCalculation: portalControls.monthOfCalculation,
      competenceMonth: portalControls.competenceMonth,
      contract: portalControls.contract,
      enterprise: portalControls.enterprise,
      product: portalControls.product,
      percentageHonorary: portalControls.percentageHonorary,
      compensation: portalControls.compensation,
      honorary: portalControls.honorary,
      tax: portalControls.tax,
      tj: portalControls.tj,
      value: portalControls.value,
      situation: portalControls.situation,
      partnerId: portalControls.partnerId
    }).from(portalControls);
    return response.map((item) => ({
      ...item,
      partnerId: item.partnerId ?? ""
    }));
  }
  async selectByPartner(partnerId) {
    const response = await db.select({
      id: portalControls.id,
      monthOfCalculation: portalControls.monthOfCalculation,
      competenceMonth: portalControls.competenceMonth,
      contract: portalControls.contract,
      enterprise: portalControls.enterprise,
      product: portalControls.product,
      percentageHonorary: portalControls.percentageHonorary,
      compensation: portalControls.compensation,
      honorary: portalControls.honorary,
      tax: portalControls.tax,
      tj: portalControls.tj,
      value: portalControls.value,
      situation: portalControls.situation,
      partnerId: portalControls.partnerId
    }).from(portalControls).where((0, import_drizzle_orm.eq)(portalControls.partnerId, partnerId));
    return response.map((item) => ({
      ...item,
      partnerId: item.partnerId ?? ""
    }));
  }
  async update(id, portalControll) {
    const response = await db.update(portalControls).set(portalControll).where((0, import_drizzle_orm.eq)(portalControls.id, id)).returning();
    const updated = response[0];
    if (!updated) {
      return null;
    }
    return {
      ...updated,
      partnerId: updated.partnerId ?? ""
    };
  }
  async delete(id) {
    const response = await db.delete(portalControls).where((0, import_drizzle_orm.eq)(portalControls.id, id)).returning();
    return response.length > 0;
  }
  async getControllById(id) {
    const response = await db.select({
      id: portalControls.id,
      monthOfCalculation: portalControls.monthOfCalculation,
      competenceMonth: portalControls.competenceMonth,
      contract: portalControls.contract,
      enterprise: portalControls.enterprise,
      product: portalControls.product,
      percentageHonorary: portalControls.percentageHonorary,
      compensation: portalControls.compensation,
      honorary: portalControls.honorary,
      tax: portalControls.tax,
      tj: portalControls.tj,
      value: portalControls.value,
      situation: portalControls.situation,
      partnerId: portalControls.partnerId
    }).from(portalControls).where((0, import_drizzle_orm.eq)(portalControls.id, id));
    return response;
  }
};

// src/routes/get-portal-controll-by-id.ts
function sanitizeNumber(value) {
  return typeof value === "number" && !Number.isNaN(value) ? value : null;
}
function sanitizeItem(item, keys) {
  const result = { ...item };
  for (const key of keys) {
    result[key] = sanitizeNumber(result[key]);
  }
  return result;
}
var NUMERIC_FIELDS = [
  "contract",
  "percentageHonorary",
  "compensation",
  "honorary",
  "tax",
  "value"
];
var getPortalControllsBySelectByIdRoute = async (app) => {
  app.get(
    "/portal/portalcontrolls/:id",
    {
      schema: {
        operationId: "getPortalControllsBySelectById",
        tags: ["portalcontrolls"],
        description: "Retorna todos os registros de PortalControlls para o parceiro informado via querystring",
        params: import_zod2.z.object({
          id: import_zod2.z.string()
        }),
        response: {
          200: import_zod2.z.array(
            import_zod2.z.object({
              id: import_zod2.z.string(),
              monthOfCalculation: import_zod2.z.string().nullable(),
              competenceMonth: import_zod2.z.string().nullable(),
              contract: import_zod2.z.number().nullable(),
              enterprise: import_zod2.z.string().nullable(),
              product: import_zod2.z.string().nullable(),
              percentageHonorary: import_zod2.z.number().nullable(),
              compensation: import_zod2.z.number().nullable(),
              honorary: import_zod2.z.number().nullable(),
              tax: import_zod2.z.number().nullable(),
              tj: import_zod2.z.number().nullable(),
              value: import_zod2.z.number().nullable(),
              situation: import_zod2.z.string().nullable(),
              partnerId: import_zod2.z.string()
            })
          ),
          500: import_zod2.z.object({ error: import_zod2.z.string() })
        }
      }
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const repo = new DrizzlePortalControllRepository();
        const rawResponse = await repo.getControllById(id);
        const sanitizedResponse = (rawResponse ?? []).map(
          (item) => sanitizeItem(item, [...NUMERIC_FIELDS])
        );
        return reply.status(200).send(sanitizedResponse);
      } catch (err) {
        request.log.error(err, "\u274C Erro em selectByPartner");
        return reply.status(500).send({ error: "Erro interno no servidor" });
      }
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPortalControllsBySelectByIdRoute
});
