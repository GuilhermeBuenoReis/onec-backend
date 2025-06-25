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

// src/infrastructure/server.ts
var import_fastify = require("fastify");
var import_cors = require("@fastify/cors");
var import_jwt = require("@fastify/jwt");
var import_swagger = require("@fastify/swagger");
var import_swagger_ui = require("@fastify/swagger-ui");
var import_dotenv = __toESM(require("dotenv"));

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

// src/infrastructure/server.ts
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");
var import_node_path = require("path");
var import_promises = require("fs/promises");
var import_multipart = __toESM(require("@fastify/multipart"));

// src/routes/create-partner-route.ts
var import_zod2 = require("zod");

// src/domain/entities/Partner.ts
var import_cuid2 = require("@paralleldrive/cuid2");
var Partner = class {
  constructor(id = (0, import_cuid2.createId)(), name, cpfOrCnpj, city, state, commission, portal, channelHead, regional, coordinator, agent, indicator, contract, phone, email, responsible) {
    this.id = id;
    this.name = name;
    this.cpfOrCnpj = cpfOrCnpj;
    this.city = city;
    this.state = state;
    this.commission = commission;
    this.portal = portal;
    this.channelHead = channelHead;
    this.regional = regional;
    this.coordinator = coordinator;
    this.agent = agent;
    this.indicator = indicator;
    this.contract = contract;
    this.phone = phone;
    this.email = email;
    this.responsible = responsible;
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

// src/infrastructure/db/index.ts
var client = (0, import_postgres.default)(env.DATABASE_URL);
var db = (0, import_postgres_js.drizzle)(client, {
  schema: schema_exports,
  logger: env.NODE_ENV === "development"
});

// src/infrastructure/db/cruds/drizzle-partner-repository.ts
var import_drizzle_orm = require("drizzle-orm");
var DrizzlePartnerRepository = class {
  async create(partnerData) {
    const partner = new Partner(
      void 0,
      partnerData.name,
      partnerData.cpfOrCnpj,
      partnerData.city,
      partnerData.state,
      partnerData.commission,
      partnerData.portal,
      partnerData.channelHead,
      partnerData.regional,
      partnerData.coordinator,
      partnerData.agent,
      partnerData.indicator,
      partnerData.contract,
      partnerData.phone,
      partnerData.email,
      partnerData.responsible
    );
    const response = await db.insert(partners).values({
      id: partner.id,
      name: partner.name,
      cpfOrCnpj: partner.cpfOrCnpj,
      city: partner.city,
      state: partner.state,
      commission: partner.commission,
      portal: partner.portal,
      channelHead: partner.channelHead,
      regional: partner.regional,
      coordinator: partner.coordinator,
      agent: partner.agent,
      indicator: partner.indicator,
      contract: partner.contract,
      phone: partner.phone,
      email: partner.email,
      responsible: partner.responsible
    }).returning();
    const createdPartner = response[0];
    if (!createdPartner) {
      throw new Error("Dados do parceiro incorretos!");
    }
    return createdPartner;
  }
  async select() {
    const response = await db.select({
      id: partners.id,
      name: partners.name,
      cpfOrCnpj: partners.cpfOrCnpj,
      city: partners.city,
      state: partners.state,
      commission: partners.commission,
      portal: partners.portal,
      channelHead: partners.channelHead,
      regional: partners.regional,
      coordinator: partners.coordinator,
      agent: partners.agent,
      indicator: partners.indicator,
      contract: partners.contract,
      phone: partners.phone,
      email: partners.email,
      responsible: partners.responsible
    }).from(partners);
    return response;
  }
  async update(id, partnerData) {
    const response = await db.update(partners).set(partnerData).where((0, import_drizzle_orm.eq)(partners.id, id)).returning();
    return response[0] ?? null;
  }
  async delete(id) {
    const response = await db.delete(partners).where((0, import_drizzle_orm.eq)(partners.id, id)).returning();
    return response.length > 0;
  }
  async selectOnePartner(id) {
    const response = await db.select({
      id: partners.id,
      name: partners.name,
      cpfOrCnpj: partners.cpfOrCnpj,
      city: partners.city,
      state: partners.state,
      commission: partners.commission,
      portal: partners.portal,
      channelHead: partners.channelHead,
      regional: partners.regional,
      coordinator: partners.coordinator,
      agent: partners.agent,
      indicator: partners.indicator,
      contract: partners.contract,
      phone: partners.phone,
      email: partners.email,
      responsible: partners.responsible
    }).from(partners).where((0, import_drizzle_orm.eq)(partners.id, id));
    return response[0] ?? null;
  }
};

// src/routes/create-partner-route.ts
var createPartnerRoute = async (app2) => {
  app2.post(
    "/partners",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createPartner",
        tags: ["partners"],
        description: "Create a new partner",
        body: import_zod2.z.object({
          name: import_zod2.z.string().nullable(),
          cpfOrCnpj: import_zod2.z.string().nullable(),
          city: import_zod2.z.string().nullable(),
          state: import_zod2.z.string().nullable(),
          commission: import_zod2.z.number().nullable(),
          portal: import_zod2.z.string().nullable(),
          channelHead: import_zod2.z.string().nullable(),
          regional: import_zod2.z.string().nullable(),
          coordinator: import_zod2.z.string().nullable(),
          agent: import_zod2.z.string().nullable(),
          indicator: import_zod2.z.string().nullable(),
          contract: import_zod2.z.string().nullable(),
          phone: import_zod2.z.string().nullable(),
          email: import_zod2.z.string().nullable(),
          responsible: import_zod2.z.string().nullable()
        }),
        response: {
          201: import_zod2.z.null()
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzlePartnerRepository();
      const {
        name,
        cpfOrCnpj,
        city,
        state,
        commission,
        portal,
        channelHead,
        regional,
        coordinator,
        agent,
        indicator,
        contract,
        phone,
        email,
        responsible
      } = request.body;
      await drizzleOrm.create({
        name,
        cpfOrCnpj,
        city,
        state,
        commission,
        portal,
        channelHead,
        regional,
        coordinator,
        agent,
        indicator,
        contract,
        phone,
        email,
        responsible
      });
      return reply.status(201).send();
    }
  );
};

// src/routes/get-patners-route.ts
var import_zod3 = require("zod");
var getPartnersRoute = async (app2) => {
  app2.get(
    "/partners",
    {
      schema: {
        operationId: "getPartners",
        tags: ["partners"],
        description: "Get a list of partners",
        response: {
          200: import_zod3.z.array(
            import_zod3.z.object({
              id: import_zod3.z.string(),
              name: import_zod3.z.string().nullable(),
              cpfOrCnpj: import_zod3.z.string().nullable(),
              city: import_zod3.z.string().nullable(),
              state: import_zod3.z.string().nullable(),
              commission: import_zod3.z.number().nullable(),
              portal: import_zod3.z.string().nullable(),
              channelHead: import_zod3.z.string().nullable(),
              regional: import_zod3.z.string().nullable(),
              coordinator: import_zod3.z.string().nullable(),
              agent: import_zod3.z.string().nullable(),
              indicator: import_zod3.z.string().nullable(),
              contract: import_zod3.z.string().nullable(),
              phone: import_zod3.z.string().nullable(),
              email: import_zod3.z.string().nullable(),
              responsible: import_zod3.z.string().nullable()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const partnerRepository = new DrizzlePartnerRepository();
      const partners2 = await partnerRepository.select();
      return reply.status(200).send(partners2);
    }
  );
};

// src/routes/update-partner-route.ts
var import_zod4 = require("zod");
var updatePartnerRoute = async (app2) => {
  app2.put(
    "/partners/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updatePartner",
        tags: ["partners"],
        description: "Update a partner",
        params: import_zod4.z.object({
          id: import_zod4.z.string()
        }),
        body: import_zod4.z.object({
          name: import_zod4.z.string().optional(),
          cpfOrCnpj: import_zod4.z.string().optional(),
          city: import_zod4.z.string().nullable().optional(),
          state: import_zod4.z.string().nullable().optional(),
          commission: import_zod4.z.number().nullable().optional(),
          portal: import_zod4.z.string().nullable().optional(),
          channelHead: import_zod4.z.string().nullable().optional(),
          regional: import_zod4.z.string().nullable().optional(),
          coordinator: import_zod4.z.string().nullable().optional(),
          agent: import_zod4.z.string().nullable().optional(),
          indicator: import_zod4.z.string().nullable().optional(),
          contract: import_zod4.z.string().nullable().optional(),
          phone: import_zod4.z.string().nullable().optional(),
          email: import_zod4.z.string().email().nullable().optional(),
          responsible: import_zod4.z.string().nullable().optional()
        }),
        response: {
          200: import_zod4.z.object({
            id: import_zod4.z.string(),
            name: import_zod4.z.string().nullable()
          }),
          404: import_zod4.z.object({
            message: import_zod4.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const partnerRepository = new DrizzlePartnerRepository();
      const updatedPartner = await partnerRepository.update(id, request.body);
      if (!updatedPartner) {
        return reply.status(404).send({ message: "Parceiro n\xE3o encontrado" });
      }
      return reply.status(200).send({
        id: updatedPartner.id,
        name: updatedPartner.name
      });
    }
  );
};

// src/routes/delete-partner-route.ts
var import_zod5 = require("zod");
var deletePartnerRoute = async (app2) => {
  app2.delete(
    "/partners/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deletePartner",
        tags: ["partners"],
        description: "Delete a partner",
        params: import_zod5.z.object({
          id: import_zod5.z.string()
        }),
        response: {
          200: import_zod5.z.object({
            message: import_zod5.z.string()
          }),
          404: import_zod5.z.object({
            message: import_zod5.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const partnerRepository = new DrizzlePartnerRepository();
      const deleted = await partnerRepository.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Parceiro n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Parceiro deletado com sucesso" });
    }
  );
};

// src/routes/create-data-negotiation.ts
var import_zod6 = require("zod");

// src/domain/entities/Negotiations.ts
var import_cuid23 = require("@paralleldrive/cuid2");
var ExelDataNegotiation = class {
  constructor(id = (0, import_cuid23.createId)(), title, client2, user, tags, status, step, value, startsDate, observation, partnerId, averageGuide) {
    this.id = id;
    this.title = title;
    this.client = client2;
    this.user = user;
    this.tags = tags;
    this.status = status;
    this.step = step;
    this.value = value;
    this.startsDate = startsDate;
    this.observation = observation;
    this.partnerId = partnerId;
    this.averageGuide = averageGuide;
  }
};

// src/infrastructure/db/cruds/drizzle-negotiation-repository.ts
var import_drizzle_orm2 = require("drizzle-orm");
var DrizzleExelDataNegotiationRepository = class {
  async create(data) {
    const negotiation = new ExelDataNegotiation(
      void 0,
      data.title,
      data.client,
      data.user,
      data.tags,
      data.status,
      data.step,
      data.value,
      data.startsDate,
      data.observation,
      data.partnerId,
      data.averageGuide
    );
    const response = await db.insert(negotiations).values({
      title: negotiation.title,
      client: negotiation.client,
      user: negotiation.user,
      tags: negotiation.tags,
      step: negotiation.step,
      status: negotiation.status,
      value: negotiation.value,
      startsDate: negotiation.startsDate,
      observation: negotiation.observation,
      partnerId: negotiation.partnerId,
      averageGuide: negotiation.averageGuide
    }).returning();
    const createdNegotiation = response[0];
    if (!createdNegotiation) {
      throw new Error("Dados da negocia\xE7\xE3o incorretos!");
    }
    return createdNegotiation;
  }
  async select() {
    const response = await db.select({
      id: negotiations.id,
      title: negotiations.title,
      client: negotiations.client,
      user: negotiations.user,
      tags: negotiations.tags,
      step: negotiations.step,
      status: negotiations.status,
      value: negotiations.value,
      startsDate: negotiations.startsDate,
      observation: negotiations.observation,
      averageGuide: negotiations.averageGuide,
      partnerId: negotiations.partnerId
    }).from(negotiations);
    return response;
  }
  async update(id, data) {
    const response = await db.update(negotiations).set(data).where((0, import_drizzle_orm2.eq)(negotiations.id, id)).returning();
    return response[0] || null;
  }
  async delete(id) {
    const response = await db.delete(negotiations).where((0, import_drizzle_orm2.eq)(negotiations.id, id)).returning();
    return response.length > 0;
  }
  async upsert(data) {
    if (!data.title) {
      const newData = {
        ...data,
        title: `untitled-${Date.now()}-${Math.floor(Math.random() * 1e6)}`
      };
      return await this.create(newData);
    }
    const existingRecords = await db.select({
      id: negotiations.id,
      title: negotiations.title,
      client: negotiations.client,
      user: negotiations.user,
      tags: negotiations.tags,
      step: negotiations.step,
      status: negotiations.status,
      value: negotiations.value,
      startsDate: negotiations.startsDate,
      observation: negotiations.observation,
      averageGuide: negotiations.averageGuide,
      partnerId: negotiations.partnerId
    }).from(negotiations).where((0, import_drizzle_orm2.eq)(negotiations.title, data.title)).limit(1);
    if (existingRecords.length > 0) {
      const existing = existingRecords[0];
      const updatedData = {
        title: data.title ?? existing.title,
        client: data.client ?? existing.client,
        user: data.user ?? existing.user,
        tags: data.tags ?? existing.tags,
        step: data.step ?? existing.step,
        status: data.status ?? existing.status,
        value: data.value ?? existing.value,
        startsDate: data.startsDate ?? existing.startsDate,
        observation: data.observation ?? existing.observation,
        partnerId: data.partnerId ?? existing.partnerId,
        averageGuide: data.averageGuide ?? existing.averageGuide
      };
      const updatedRecords = await db.update(negotiations).set(updatedData).where((0, import_drizzle_orm2.eq)(negotiations.id, existing.id)).returning();
      return updatedRecords[0];
    }
    return await this.create(data);
  }
  async selectById(id) {
    const response = await db.select({
      id: negotiations.id,
      title: negotiations.title,
      client: negotiations.client,
      user: negotiations.user,
      tags: negotiations.tags,
      step: negotiations.step,
      status: negotiations.status,
      value: negotiations.value,
      startsDate: negotiations.startsDate,
      observation: negotiations.observation,
      averageGuide: negotiations.averageGuide,
      partnerId: negotiations.partnerId
    }).from(negotiations).where((0, import_drizzle_orm2.eq)(negotiations.id, id));
    return response;
  }
};

// src/routes/create-data-negotiation.ts
var createDataNegotiationRoute = async (app2) => {
  app2.post(
    "/negotiation",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createDataNegotiation",
        tags: ["DataNegotiations"],
        description: "Create a new DataNegotiation",
        body: import_zod6.z.object({
          title: import_zod6.z.string().nullable(),
          client: import_zod6.z.string().nullable(),
          user: import_zod6.z.string().nullable(),
          tags: import_zod6.z.string().nullable(),
          step: import_zod6.z.string().nullable(),
          status: import_zod6.z.string().nullable(),
          value: import_zod6.z.number().nullable(),
          partnerId: import_zod6.z.string().nullable(),
          startsDate: import_zod6.z.string().nullable(),
          observation: import_zod6.z.string().nullable(),
          averageGuide: import_zod6.z.number().nullable()
        }),
        response: {
          201: import_zod6.z.object({
            id: import_zod6.z.string(),
            name: import_zod6.z.string()
          }),
          400: import_zod6.z.object({
            message: import_zod6.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const {
        title,
        client: client2,
        user,
        tags,
        step,
        status,
        value,
        startsDate,
        partnerId,
        observation,
        averageGuide
      } = request.body;
      await drizzleOrm.create({
        title,
        client: client2,
        user,
        tags,
        step,
        status,
        value,
        startsDate,
        observation,
        averageGuide,
        partnerId
      });
      return reply.status(201).send();
    }
  );
};

// src/routes/get-negotiation.ts
var import_zod7 = require("zod");
var getNegotiationRoute = async (app2) => {
  app2.get(
    "/negotiation",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getNegotiation",
        tags: ["negotiation"],
        description: "Get a list of Negotiation",
        response: {
          200: import_zod7.z.array(
            import_zod7.z.object({
              id: import_zod7.z.string(),
              title: import_zod7.z.string().nullable(),
              client: import_zod7.z.string().nullable(),
              user: import_zod7.z.string().nullable(),
              tags: import_zod7.z.string().nullable(),
              step: import_zod7.z.string().nullable(),
              status: import_zod7.z.string(),
              value: import_zod7.z.number().nullable(),
              startsDate: import_zod7.z.string().nullable(),
              observation: import_zod7.z.string().nullable(),
              averageGuide: import_zod7.z.number().nullable(),
              partnerId: import_zod7.z.string().nullable()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const negotiations2 = await drizzleOrm.select();
      const formattedNegotiations = negotiations2.map((item) => ({
        ...item,
        status: item.status ?? ""
      }));
      return reply.status(200).send(formattedNegotiations);
    }
  );
};

// src/routes/update-negotiation.ts
var import_zod8 = require("zod");
var updateNegotiationRoute = async (app2) => {
  app2.put(
    "/negotiation/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateNegotiation",
        tags: ["negotiation"],
        description: "Update a Negotiation",
        params: import_zod8.z.object({
          id: import_zod8.z.string()
        }),
        body: import_zod8.z.object({
          title: import_zod8.z.string().optional(),
          client: import_zod8.z.string().optional(),
          user: import_zod8.z.string().optional(),
          tags: import_zod8.z.string().optional(),
          step: import_zod8.z.string().optional(),
          status: import_zod8.z.string().optional(),
          value: import_zod8.z.number().optional(),
          startsDate: import_zod8.z.string().nullable().optional(),
          partnerId: import_zod8.z.string().nullable().optional(),
          observation: import_zod8.z.string().nullable().optional(),
          averageGuide: import_zod8.z.number().nullable().optional()
        }),
        response: {
          200: import_zod8.z.object({
            title: import_zod8.z.string().nullable()
          }),
          404: import_zod8.z.object({
            message: import_zod8.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const updatedNegotiation = await drizzleOrm.update(id, request.body);
      if (!updatedNegotiation) {
        return reply.status(404).send({ message: "Parceiro n\xE3o encontrado" });
      }
      return reply.status(200).send({
        title: updatedNegotiation.title
      });
    }
  );
};

// src/routes/delete-negotiation.ts
var import_zod9 = require("zod");
var deleteNegotiationRoute = async (app2) => {
  app2.delete(
    "/negotiation/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deleteNegotiation",
        tags: ["negotiation"],
        description: "Delete a negotiation",
        params: import_zod9.z.object({
          id: import_zod9.z.string()
        }),
        response: {
          200: import_zod9.z.object({
            message: import_zod9.z.string()
          }),
          404: import_zod9.z.object({
            message: import_zod9.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const deleted = await drizzleOrm.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Negocia\xE7\xE3o n\xE3o encontrada" });
      }
      return reply.status(200).send({ message: "Negocia\xE7\xE3o deletada com sucesso!" });
    }
  );
};

// src/routes/create-contract.ts
var import_zod10 = require("zod");

// src/infrastructure/db/cruds/drizzle-contract-repository.ts
var import_drizzle_orm3 = require("drizzle-orm");

// src/domain/entities/Contract.ts
var import_cuid24 = require("@paralleldrive/cuid2");
var Contract = class {
  constructor(id = (0, import_cuid24.createId)(), city, client2, state, cnpj, sindic, year, matter, forecast, contractTotal, percentage, signedContract, status, averageGuide, partner, partnerCommission, counter, email) {
    this.id = id;
    this.city = city;
    this.client = client2;
    this.state = state;
    this.cnpj = cnpj;
    this.sindic = sindic;
    this.year = year;
    this.matter = matter;
    this.forecast = forecast;
    this.contractTotal = contractTotal;
    this.percentage = percentage;
    this.signedContract = signedContract;
    this.status = status;
    this.averageGuide = averageGuide;
    this.partner = partner;
    this.partnerCommission = partnerCommission;
    this.counter = counter;
    this.email = email;
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o contrato para ser deletado!");
    }
  }
};

// src/infrastructure/db/cruds/drizzle-contract-repository.ts
var DrizzleContractRepository = class {
  async create(contractData) {
    const contract = new Contract(
      void 0,
      contractData.city,
      contractData.client,
      contractData.state,
      contractData.cnpj,
      contractData.sindic,
      contractData.year,
      contractData.matter,
      contractData.forecast,
      contractData.contractTotal,
      contractData.percentage,
      contractData.signedContract,
      contractData.status,
      contractData.averageGuide,
      contractData.partner,
      contractData.partnerCommission,
      contractData.counter,
      contractData.email
    );
    const response = await db.insert(contracts).values({
      id: contract.id,
      city: contract.city,
      client: contract.client,
      state: contract.state,
      cnpj: contract.cnpj,
      sindic: contract.sindic,
      year: contract.year,
      matter: contract.matter,
      forecast: contract.forecast,
      contractTotal: contract.contractTotal,
      percentage: contract.percentage,
      signedContract: contract.signedContract,
      status: contract.status,
      averageGuide: contract.averageGuide,
      partner: contract.partner,
      partnerCommission: contract.partnerCommission,
      counter: contract.counter,
      email: contract.email
    }).returning();
    const createdContract = response[0];
    if (!createdContract) {
      throw new Error("Dados do parceiro incorretos!");
    }
    return createdContract;
  }
  async select() {
    const response = await db.select({
      id: contracts.id,
      city: contracts.city,
      client: contracts.client,
      state: contracts.state,
      cnpj: contracts.cnpj,
      sindic: contracts.sindic,
      year: contracts.year,
      matter: contracts.matter,
      forecast: contracts.forecast,
      contractTotal: contracts.contractTotal,
      percentage: contracts.percentage,
      signedContract: contracts.signedContract,
      status: contracts.status,
      averageGuide: contracts.averageGuide,
      partner: contracts.partner,
      partnerCommission: contracts.partnerCommission,
      counter: contracts.counter,
      email: contracts.email
    }).from(contracts);
    return response;
  }
  async update(id, data) {
    const response = await db.update(contracts).set(data).where((0, import_drizzle_orm3.eq)(contracts.id, id)).returning();
    return response[0] || null;
  }
  async delete(id) {
    const response = await db.delete(contracts).where((0, import_drizzle_orm3.eq)(contracts.id, id)).returning();
    return response.length > 0;
  }
  async selectCountStatus() {
    const result = await db.select({
      status: contracts.status,
      count: import_drizzle_orm3.sql`COUNT(*)`.as("count")
    }).from(contracts).groupBy(contracts.status);
    return result;
  }
  async selectStatusFilter(filter) {
    const response = await db.select({
      status: contracts.status
    }).from(contracts).where(import_drizzle_orm3.sql`TRIM(${contracts.status}) ILIKE ${filter.trim()}`);
    return response;
  }
  async selectById(id) {
    const response = await db.select({
      id: contracts.id,
      city: contracts.city,
      client: contracts.client,
      state: contracts.state,
      cnpj: contracts.cnpj,
      sindic: contracts.sindic,
      year: contracts.year,
      matter: contracts.matter,
      forecast: contracts.forecast,
      contractTotal: contracts.contractTotal,
      percentage: contracts.percentage,
      signedContract: contracts.signedContract,
      status: contracts.status,
      averageGuide: contracts.averageGuide,
      partner: contracts.partner,
      partnerCommission: contracts.partnerCommission,
      counter: contracts.counter,
      email: contracts.email
    }).from(contracts).where((0, import_drizzle_orm3.eq)(contracts.id, id));
    return response[0] ?? null;
  }
};

// src/routes/create-contract.ts
var createContractRoute = async (app2) => {
  app2.post(
    "/contract",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createContract",
        tags: ["contract"],
        description: "Create a new Datacontract",
        body: import_zod10.z.object({
          city: import_zod10.z.string().nullable(),
          client: import_zod10.z.string().nullable(),
          state: import_zod10.z.string().nullable(),
          cnpj: import_zod10.z.string().nullable(),
          sindic: import_zod10.z.string().nullable(),
          year: import_zod10.z.string().nullable(),
          matter: import_zod10.z.string().nullable(),
          forecast: import_zod10.z.string().nullable(),
          contractTotal: import_zod10.z.string().nullable(),
          percentage: import_zod10.z.number().nullable(),
          signedContract: import_zod10.z.string().nullable(),
          status: import_zod10.z.string().nullable(),
          averageGuide: import_zod10.z.number().nullable(),
          partner: import_zod10.z.string().nullable(),
          partnerCommission: import_zod10.z.number().nullable(),
          counter: import_zod10.z.string().nullable(),
          email: import_zod10.z.string().nullable()
        }),
        response: {
          201: import_zod10.z.object({
            id: import_zod10.z.string(),
            name: import_zod10.z.string()
          }),
          400: import_zod10.z.object({
            message: import_zod10.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleContractRepository();
      const {
        city,
        client: client2,
        state,
        cnpj,
        sindic,
        year,
        matter,
        forecast,
        contractTotal,
        percentage,
        signedContract,
        status,
        averageGuide,
        partner,
        partnerCommission,
        counter,
        email
      } = request.body;
      await drizzleOrm.create({
        city,
        client: client2,
        state,
        cnpj,
        sindic,
        year,
        matter,
        forecast,
        contractTotal,
        percentage,
        signedContract,
        status,
        averageGuide,
        partner,
        partnerCommission,
        counter,
        email
      });
      return reply.status(201).send();
    }
  );
};

// src/routes/get-contracts.ts
var import_zod11 = require("zod");
var getContractRoute = async (app2) => {
  app2.get(
    "/contract",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getContract",
        tags: ["contract"],
        description: "Get a list of contract",
        response: {
          200: import_zod11.z.array(
            import_zod11.z.object({
              id: import_zod11.z.string(),
              city: import_zod11.z.string().nullable(),
              client: import_zod11.z.string().nullable(),
              state: import_zod11.z.string().nullable(),
              cnpj: import_zod11.z.string().nullable(),
              sindic: import_zod11.z.string().nullable(),
              year: import_zod11.z.string().nullable(),
              matter: import_zod11.z.string().nullable(),
              forecast: import_zod11.z.string().nullable(),
              contractTotal: import_zod11.z.string().nullable(),
              percentage: import_zod11.z.number().nullable(),
              signedContract: import_zod11.z.string().nullable(),
              status: import_zod11.z.string().nullable(),
              averageGuide: import_zod11.z.number().nullable(),
              partner: import_zod11.z.string().nullable(),
              partnerCommission: import_zod11.z.number().nullable(),
              counter: import_zod11.z.string().nullable(),
              email: import_zod11.z.string().nullable()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleContractRepository();
      const contracts2 = await drizzleOrm.select();
      return reply.status(200).send(contracts2);
    }
  );
};

// src/routes/update-contract.ts
var import_zod12 = require("zod");
var updateContractRoute = async (app2) => {
  app2.put(
    "/contract/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateContract",
        tags: ["contract"],
        description: "Update a contract",
        params: import_zod12.z.object({
          id: import_zod12.z.string()
        }),
        body: import_zod12.z.object({
          city: import_zod12.z.string().nullable().optional(),
          client: import_zod12.z.string().optional(),
          state: import_zod12.z.string().nullable().optional(),
          cnpj: import_zod12.z.string().nullable().optional(),
          sindic: import_zod12.z.string().nullable().optional(),
          year: import_zod12.z.string().nullable().optional(),
          matter: import_zod12.z.string().nullable().optional(),
          forecast: import_zod12.z.string().nullable().optional(),
          contractTotal: import_zod12.z.string().nullable().optional(),
          percentage: import_zod12.z.number().nullable().optional(),
          signedContract: import_zod12.z.string().nullable().optional(),
          status: import_zod12.z.string().nullable().optional(),
          averageGuide: import_zod12.z.number().nullable().optional(),
          partner: import_zod12.z.string().nullable().optional(),
          partnerCommission: import_zod12.z.number().nullable().optional(),
          counter: import_zod12.z.string().nullable().optional(),
          email: import_zod12.z.string().nullable().optional()
        }),
        response: {
          200: import_zod12.z.object({
            message: import_zod12.z.string()
          }),
          404: import_zod12.z.object({
            message: import_zod12.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleContractRepository();
      const updatedcontract = await drizzleOrm.update(id, request.body);
      if (!updatedcontract) {
        return reply.status(404).send({ message: "Algo deu errado!" });
      }
      return reply.status(200).send({
        message: "Item atualizado com sucesso!"
      });
    }
  );
};

// src/routes/delete-contracts.ts
var import_zod13 = require("zod");
var deleteContractRoute = async (app2) => {
  app2.delete(
    "/contract/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deleteContract",
        tags: ["contract"],
        description: "Delete a contract",
        params: import_zod13.z.object({
          id: import_zod13.z.string()
        }),
        response: {
          200: import_zod13.z.object({
            message: import_zod13.z.string()
          }),
          404: import_zod13.z.object({
            message: import_zod13.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleContractRepository();
      const deleted = await drizzleOrm.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Contrato n\xE3o encontrada" });
      }
      return reply.status(200).send({ message: "Contrato deletado com sucesso!" });
    }
  );
};

// src/routes/authenticate-user.ts
var import_zod14 = require("zod");
var import_bcrypt = __toESM(require("bcrypt"));

// src/config/jose.ts
var import_jose = require("jose");
async function generateToken(payload) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const token = await new import_jose.SignJWT(payload).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setIssuedAt().setExpirationTime("60d").sign(secret);
  return token;
}

// src/infrastructure/db/cruds/drizzle-user-repository.ts
var import_drizzle_orm4 = require("drizzle-orm");

// src/domain/entities/User.ts
var import_cuid25 = require("@paralleldrive/cuid2");
var User = class {
  constructor(id = (0, import_cuid25.createId)(), email, passwordHash, role) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }
};

// src/infrastructure/db/cruds/drizzle-user-repository.ts
var DrizzleUserRepository = class {
  async create(userData) {
    const user = new User(
      void 0,
      userData.email,
      userData.passwordHash,
      userData.role
    );
    const response = await db.insert(users).values({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role
    }).returning();
    const createdUser = response[0];
    if (!createdUser) {
      throw new Error("Erro ao criar usu\xE1rio!");
    }
    return createdUser;
  }
  async select() {
    const response = await db.select({
      id: users.id,
      email: users.email,
      passwordHash: users.passwordHash,
      role: users.role
    }).from(users);
    return response.map(
      (row) => new User(row.id, row.email, row.passwordHash, row.role)
    );
  }
  async update(id, data) {
    const response = await db.update(users).set(data).where((0, import_drizzle_orm4.eq)(users.id, id)).returning();
    return response[0] || null;
  }
  async delete(id) {
    const response = await db.delete(users).where((0, import_drizzle_orm4.eq)(users.id, id)).returning();
    return response.length > 0;
  }
  async findByEmail(email) {
    const response = await db.select({
      id: users.id,
      email: users.email,
      passwordHash: users.passwordHash,
      role: users.role
    }).from(users).where((0, import_drizzle_orm4.eq)(users.email, email)).limit(1);
    const foundUser = response[0];
    if (!foundUser) {
      return null;
    }
    return new User(
      foundUser.id,
      foundUser.email,
      foundUser.passwordHash,
      foundUser.role
    );
  }
};

// src/routes/authenticate-user.ts
var import_universal_cookie = __toESM(require("universal-cookie"));
var authenticateUserRoute = async (app2) => {
  app2.post(
    "/login",
    {
      schema: {
        operationId: "authenticateUser",
        tags: ["Authentication"],
        description: "Realiza o login do usu\xE1rio e retorna o token JWT com validade de 60 dias",
        body: import_zod14.z.object({
          email: import_zod14.z.string().email(),
          password: import_zod14.z.string()
        }),
        response: {
          200: import_zod14.z.object({
            token: import_zod14.z.string()
          }),
          401: import_zod14.z.object({
            error: import_zod14.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const userRepository = new DrizzleUserRepository();
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return reply.status(401).send({ error: "Credenciais inv\xE1lidas" });
      }
      const isValid = await import_bcrypt.default.compare(password, user.passwordHash);
      if (!isValid) {
        return reply.status(401).send({ error: "Credenciais inv\xE1lidas" });
      }
      const token = await generateToken({ id: user.id, role: user.role });
      const cookies = new import_universal_cookie.default(request.headers.cookie);
      cookies.set("token", token, {
        path: "/",
        maxAge: 60 * 24 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict"
      });
      const setCookieHeader = `token=${token}; Path=/; HttpOnly; Max-Age=${60 * 24 * 60 * 60}; SameSite=Strict${process.env.NODE_ENV === "development" ? "; Secure" : ""}`;
      reply.header("Set-Cookie", setCookieHeader);
      return reply.status(200).send({ token });
    }
  );
};

// src/routes/get-profile-user.ts
var import_zod15 = require("zod");
var getProfileUser = async (app2) => {
  app2.get(
    "/users",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getProfileUser",
        tags: ["Users"],
        description: "List all Users",
        response: {
          200: import_zod15.z.array(
            import_zod15.z.object({
              id: import_zod15.z.string(),
              email: import_zod15.z.string().email(),
              role: import_zod15.z.string()
            })
          ),
          400: import_zod15.z.object({
            message: import_zod15.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const userRepository = new DrizzleUserRepository();
      const users2 = await userRepository.select();
      return reply.status(200).send(users2);
    }
  );
};

// src/routes/update-user.ts
var import_zod16 = require("zod");
var import_bcrypt2 = __toESM(require("bcrypt"));
var updateUserRoute = async (app2) => {
  app2.put(
    "/users/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateUser",
        tags: ["Users"],
        description: "Update an existing User",
        params: import_zod16.z.object({
          id: import_zod16.z.string()
        }),
        body: import_zod16.z.object({
          email: import_zod16.z.string().email().optional(),
          password: import_zod16.z.string().min(6).optional(),
          role: import_zod16.z.string().optional()
        }),
        response: {
          200: import_zod16.z.object({
            message: import_zod16.z.string()
          }),
          400: import_zod16.z.object({
            message: import_zod16.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const { email, password, role } = request.body;
      const userRepository = new DrizzleUserRepository();
      const updateData = {};
      if (email) updateData.email = email;
      if (password) updateData.passwordHash = await import_bcrypt2.default.hash(password, 10);
      if (role) updateData.role = role;
      const updatedUser = await userRepository.update(id, updateData);
      if (!updatedUser) {
        return reply.status(400).send({ message: "Erro ao atualizar usu\xE1rio" });
      }
      return reply.status(200).send({ message: "Usu\xE1rio atualizado com sucesso" });
    }
  );
};

// src/routes/delete-user.ts
var import_zod17 = require("zod");
var deleteUserRoute = async (app2) => {
  app2.delete(
    "/users/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deleteUser",
        tags: ["Users"],
        description: "Delete an existing User",
        params: import_zod17.z.object({
          id: import_zod17.z.string()
        }),
        response: {
          200: import_zod17.z.object({
            message: import_zod17.z.string()
          }),
          400: import_zod17.z.object({
            message: import_zod17.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const userRepository = new DrizzleUserRepository();
      const deleted = await userRepository.delete(id);
      if (!deleted) {
        return reply.status(400).send({ message: "Erro ao excluir usu\xE1rio" });
      }
      return reply.status(200).send({ message: "Usu\xE1rio exclu\xEDdo com sucesso" });
    }
  );
};

// src/routes/create-new-pending-route.ts
var import_zod18 = require("zod");

// src/domain/entities/Pending.ts
var import_cuid26 = require("@paralleldrive/cuid2");
var Pending = class {
  constructor(id = (0, import_cuid26.createId)(), client2, callReason, status, priority, responsible, category, description, createdAt, updatedAt) {
    this.id = id;
    this.client = client2;
    this.callReason = callReason;
    this.status = status;
    this.priority = priority;
    this.responsible = responsible;
    this.category = category;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};

// src/infrastructure/db/cruds/drizzle-pending-repository.ts
var import_drizzle_orm5 = require("drizzle-orm");
var DrizzlePendingRepository = class {
  async create(pendingData) {
    const pending = new Pending(
      void 0,
      pendingData.client,
      pendingData.callReason,
      pendingData.status,
      pendingData.priority,
      pendingData.responsible,
      pendingData.category,
      pendingData.description,
      pendingData.createdAt,
      pendingData.updatedAt
    );
    const response = await db.insert(pendingIssues).values({
      client: pending.client,
      callReason: pending.callReason,
      status: pending.status,
      priority: pending.priority,
      responsible: pending.responsible,
      category: pending.category,
      description: pending.description
    }).returning();
    const createdPending = response[0];
    if (!createdPending) {
      throw new Error("Dados do parceiro incorretos!");
    }
    return createdPending;
  }
  async select() {
    const response = await db.select({
      id: pendingIssues.id,
      client: pendingIssues.client,
      callReason: pendingIssues.callReason,
      status: pendingIssues.status,
      priority: pendingIssues.priority,
      responsible: pendingIssues.responsible,
      category: pendingIssues.category,
      description: pendingIssues.description,
      createdAt: pendingIssues.createdAt,
      updatedAt: pendingIssues.updatedAt
    }).from(pendingIssues);
    return response;
  }
  async update(id, pendingData) {
    const response = await db.update(pendingIssues).set(pendingData).where((0, import_drizzle_orm5.eq)(pendingIssues.id, id)).returning();
    return response[0] ?? null;
  }
  async delete(id) {
    const response = await db.delete(pendingIssues).where((0, import_drizzle_orm5.eq)(pendingIssues.id, id)).returning();
    return response.length > 0;
  }
  async selectOnePending(id) {
    const response = await db.select({
      id: pendingIssues.id,
      client: pendingIssues.client,
      callReason: pendingIssues.callReason,
      status: pendingIssues.status,
      priority: pendingIssues.priority,
      responsible: pendingIssues.responsible,
      category: pendingIssues.category,
      description: pendingIssues.description,
      createdAt: pendingIssues.createdAt,
      updatedAt: pendingIssues.updatedAt
    }).from(pendingIssues).where((0, import_drizzle_orm5.eq)(pendingIssues.id, id));
    return response[0] ?? null;
  }
};

// src/routes/create-new-pending-route.ts
var createPendingRoute = async (app2) => {
  app2.post(
    "/pendings",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createPending",
        tags: ["pendings"],
        description: "Create a new pending",
        body: import_zod18.z.object({
          client: import_zod18.z.string().nullable(),
          callReason: import_zod18.z.string().nullable(),
          status: import_zod18.z.enum(["Aberto", "Encaminhado", "Pendente", "Conclu\xEDdo"]).nullable(),
          priority: import_zod18.z.string().nullable(),
          responsible: import_zod18.z.string().nullable(),
          category: import_zod18.z.enum([
            "SAC",
            "Atendimento",
            "Financeiro",
            "Diretoria",
            "Comercial",
            "Auditoria"
          ]),
          description: import_zod18.z.string().nullable()
        }),
        response: {
          201: import_zod18.z.object({
            id: import_zod18.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const pendingRepository = new DrizzlePendingRepository();
      const pending = await pendingRepository.create(request.body);
      if (!pending?.id) {
        throw new Error("Erro ao cadastrar a pend\xEAncia");
      }
      return reply.status(201).send({
        id: pending.id
      });
    }
  );
};

// src/routes/get-pendings.ts
var import_zod19 = require("zod");
var getPendingsRoute = async (app2) => {
  app2.get(
    "/pendings",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getPendings",
        tags: ["pendings"],
        description: "Get a list of pendings",
        response: {
          200: import_zod19.z.array(
            import_zod19.z.object({
              id: import_zod19.z.string(),
              client: import_zod19.z.string().nullable(),
              callReason: import_zod19.z.string().nullable(),
              status: import_zod19.z.enum(["Aberto", "Encaminhado", "Pendente", "Conclu\xEDdo"]).nullable(),
              priority: import_zod19.z.string().nullable(),
              responsible: import_zod19.z.string().nullable(),
              category: import_zod19.z.enum([
                "SAC",
                "Atendimento",
                "Financeiro",
                "Diretoria",
                "Comercial",
                "Auditoria"
              ]).nullable(),
              description: import_zod19.z.string().nullable(),
              createdAt: import_zod19.z.date().optional(),
              updatedAt: import_zod19.z.date().optional()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const pendingRepository = new DrizzlePendingRepository();
      const pendings = await pendingRepository.select();
      return reply.status(200).send(pendings);
    }
  );
};

// src/routes/delete-pending.ts
var import_zod20 = require("zod");
var deletePendingRoute = async (app2) => {
  app2.delete(
    "/pendings/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deletePending",
        tags: ["pendings"],
        description: "Delete a pending",
        params: import_zod20.z.object({
          id: import_zod20.z.string()
        }),
        response: {
          200: import_zod20.z.object({
            message: import_zod20.z.string()
          }),
          404: import_zod20.z.object({
            message: import_zod20.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const pendingRepository = new DrizzlePendingRepository();
      const deleted = await pendingRepository.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Pend\xEAncia n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Pend\xEAncia deletado com sucesso" });
    }
  );
};

// src/routes/update-pending.ts
var import_zod21 = require("zod");
var updatePendingRoute = async (app2) => {
  app2.put(
    "/pendings/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updatePending",
        tags: ["pendings"],
        description: "Update a pending",
        params: import_zod21.z.object({
          id: import_zod21.z.string()
        }),
        body: import_zod21.z.object({
          client: import_zod21.z.string().nullable().optional(),
          callReason: import_zod21.z.string().nullable().optional(),
          status: import_zod21.z.enum(["Aberto", "Encaminhado", "Pendente", "Conclu\xEDdo"]).nullable().optional(),
          priority: import_zod21.z.string().nullable().optional(),
          responsible: import_zod21.z.string().nullable().optional(),
          category: import_zod21.z.enum([
            "SAC",
            "Atendimento",
            "Financeiro",
            "Diretoria",
            "Comercial",
            "Auditoria"
          ]).nullable().optional(),
          description: import_zod21.z.string().nullable().optional()
        }),
        response: {
          200: import_zod21.z.object({
            id: import_zod21.z.string()
          }),
          404: import_zod21.z.object({
            message: import_zod21.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const pendingRepository = new DrizzlePendingRepository();
      const updatedPending = await pendingRepository.update(id, request.body);
      if (!updatedPending) {
        return reply.status(404).send({ message: "Parceiro n\xE3o encontrado" });
      }
      return reply.status(200).send({
        id: updatedPending.id
      });
    }
  );
};

// src/routes/create-portal-controll-route.ts
var import_zod22 = require("zod");

// src/domain/entities/Portal-Controlls.ts
var import_cuid27 = require("@paralleldrive/cuid2");
var PortalControll = class {
  constructor(id = (0, import_cuid27.createId)(), monthOfCalculation, competenceMonth, contract, enterprise, product, percentageHonorary, compensation, honorary, tax, tj, value, situation, partnerId) {
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

// src/infrastructure/db/cruds/drizzle-portal-controll-repository.ts
var import_drizzle_orm6 = require("drizzle-orm");
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
    }).from(portalControls).where((0, import_drizzle_orm6.eq)(portalControls.partnerId, partnerId));
    return response.map((item) => ({
      ...item,
      partnerId: item.partnerId ?? ""
    }));
  }
  async update(id, portalControll) {
    const response = await db.update(portalControls).set(portalControll).where((0, import_drizzle_orm6.eq)(portalControls.id, id)).returning();
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
    const response = await db.delete(portalControls).where((0, import_drizzle_orm6.eq)(portalControls.id, id)).returning();
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
    }).from(portalControls).where((0, import_drizzle_orm6.eq)(portalControls.id, id));
    return response;
  }
};

// src/routes/create-portal-controll-route.ts
var createPortalControllRoute = async (app2) => {
  app2.post(
    "/portalcontrolls",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createPortalControll",
        tags: ["portalcontrolls"],
        description: "Create a new portalcontroll",
        body: import_zod22.z.object({
          monthOfCalculation: import_zod22.z.string().nullable(),
          competenceMonth: import_zod22.z.string().nullable(),
          contract: import_zod22.z.number().nullable(),
          enterprise: import_zod22.z.string().nullable(),
          product: import_zod22.z.string().nullable(),
          percentageHonorary: import_zod22.z.number().nullable(),
          compensation: import_zod22.z.number().nullable(),
          honorary: import_zod22.z.number().nullable(),
          tax: import_zod22.z.number().nullable(),
          tj: import_zod22.z.number().nullable(),
          value: import_zod22.z.number().nullable(),
          situation: import_zod22.z.string().nullable(),
          partnerId: import_zod22.z.string()
          // ← novo campo obrigatório
        }),
        response: {
          201: import_zod22.z.object({ id: import_zod22.z.string() })
        }
      }
    },
    async (request, reply) => {
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const portalcontroll = await portalcontrollRepository.create(
        request.body
      );
      if (!portalcontroll?.id) {
        throw new Error("Erro ao cadastrar os dados do portal de controle");
      }
      return reply.status(201).send({ id: portalcontroll.id });
    }
  );
};

// src/routes/delete-portal-controll-route.ts
var import_zod23 = require("zod");
var deletePortalControllRoute = async (app2) => {
  app2.delete(
    "/portalcontrolls/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deletePortalControll",
        tags: ["portalcontrolls"],
        description: "Delete a portalcontroll",
        params: import_zod23.z.object({
          id: import_zod23.z.string()
        }),
        response: {
          200: import_zod23.z.object({
            message: import_zod23.z.string()
          }),
          404: import_zod23.z.object({
            message: import_zod23.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const deleted = await portalcontrollRepository.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Controle n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Controle deletado com sucesso" });
    }
  );
};

// src/routes/update-portal-controll.ts
var import_zod24 = require("zod");
var updatePortalControllRoute = async (app2) => {
  app2.put(
    "/portalcontrolls/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updatePortalControll",
        tags: ["portalcontrolls"],
        description: "Update a portalcontroll",
        params: import_zod24.z.object({ id: import_zod24.z.string() }),
        body: import_zod24.z.object({
          enterprise: import_zod24.z.string().nullable().optional(),
          product: import_zod24.z.string().nullable().optional(),
          percentageHonorary: import_zod24.z.number().nullable().optional(),
          compensation: import_zod24.z.number().nullable().optional(),
          honorary: import_zod24.z.number().nullable().optional(),
          tax: import_zod24.z.number().nullable().optional(),
          tj: import_zod24.z.number().nullable().optional(),
          value: import_zod24.z.number().nullable().optional(),
          situation: import_zod24.z.string().nullable().optional(),
          partnerId: import_zod24.z.string().optional()
        }),
        response: {
          200: import_zod24.z.object({ id: import_zod24.z.string() }),
          404: import_zod24.z.object({ message: import_zod24.z.string() })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const portalcontrollRepository = new DrizzlePortalControllRepository();
      const updated = await portalcontrollRepository.update(id, request.body);
      if (!updated) {
        return reply.status(404).send({ message: "Controle n\xE3o encontrado" });
      }
      return reply.status(200).send({ id: updated.id });
    }
  );
};

// src/routes/get-count-status.ts
var import_zod25 = require("zod");
var getContractStatusCountRoute = async (app2) => {
  app2.get(
    "/contract/status-count",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getContractStatusCount",
        tags: ["contract"],
        description: "Get count of contracts by status",
        response: {
          200: import_zod25.z.array(
            import_zod25.z.object({
              status: import_zod25.z.string().nullable(),
              count: import_zod25.z.number()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const drizzleOrm = new DrizzleContractRepository();
      const statusCounts = await drizzleOrm.selectCountStatus();
      const formattedStatusCounts = statusCounts.map((item) => ({
        status: item.status,
        count: Number(item.count)
      }));
      return reply.status(200).send(formattedStatusCounts);
    }
  );
};

// src/routes/get-status-filter.ts
var import_zod26 = require("zod");
var getContractStatusCountByFilterRoute = async (app2) => {
  app2.post(
    "/contract/status-count/filter",
    {
      schema: {
        operationId: "getContractStatusCountByFilter",
        tags: ["contract"],
        description: "Get count of contracts by status using a filter",
        body: import_zod26.z.object({
          filter: import_zod26.z.string()
        }),
        response: {
          200: import_zod26.z.array(
            import_zod26.z.object({
              status: import_zod26.z.string().nullable(),
              count: import_zod26.z.number()
            })
          )
        }
      }
    },
    async (request, reply) => {
      const { filter } = request.body;
      const drizzleOrm = new DrizzleContractRepository();
      const rows = await drizzleOrm.selectStatusFilter(filter);
      const aggregated = {};
      rows.forEach((row) => {
        const key = row.status !== null ? row.status.toLowerCase() : "null";
        if (!aggregated[key])
          aggregated[key] = { status: row.status, count: 0 };
        aggregated[key].count++;
      });
      return reply.status(200).send(Object.values(aggregated));
    }
  );
};

// src/routes/get-one-partner.ts
var import_zod27 = require("zod");
var getOnePartnerRoute = async (app2) => {
  app2.get(
    "/partners/:id",
    {
      schema: {
        operationId: "getOnePartner",
        tags: ["partners"],
        description: "Get a single partner by id",
        params: import_zod27.z.object({
          id: import_zod27.z.string()
        }),
        response: {
          200: import_zod27.z.object({
            id: import_zod27.z.string(),
            name: import_zod27.z.string().nullable(),
            cpfOrCnpj: import_zod27.z.string().nullable(),
            city: import_zod27.z.string().nullable(),
            state: import_zod27.z.string().nullable(),
            commission: import_zod27.z.number().nullable(),
            portal: import_zod27.z.string().nullable(),
            channelHead: import_zod27.z.string().nullable(),
            regional: import_zod27.z.string().nullable(),
            coordinator: import_zod27.z.string().nullable(),
            agent: import_zod27.z.string().nullable(),
            indicator: import_zod27.z.string().nullable(),
            contract: import_zod27.z.string().nullable(),
            phone: import_zod27.z.string().nullable(),
            email: import_zod27.z.string().nullable(),
            responsible: import_zod27.z.string().nullable()
          }),
          404: import_zod27.z.object({
            message: import_zod27.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const partnerRepository = new DrizzlePartnerRepository();
      const partner = await partnerRepository.selectOnePartner(id);
      if (!partner) {
        return reply.status(404).send({ message: "Partner not found" });
      }
      return reply.status(200).send(partner);
    }
  );
};

// src/routes/get-one-pending.ts
var import_zod28 = require("zod");
var getOnePendingRoute = async (app2) => {
  app2.get(
    "/pending/:id",
    {
      schema: {
        operationId: "getOnePending",
        tags: ["pendings"],
        description: "Get a single pending by id",
        params: import_zod28.z.object({
          id: import_zod28.z.string()
        }),
        response: {
          200: import_zod28.z.object({
            id: import_zod28.z.string(),
            client: import_zod28.z.string().nullable(),
            callReason: import_zod28.z.string().nullable(),
            status: import_zod28.z.enum(["Aberto", "Encaminhado", "Pendente", "Conclu\xEDdo"]).nullable(),
            priority: import_zod28.z.string().nullable(),
            responsible: import_zod28.z.string().nullable(),
            category: import_zod28.z.enum([
              "SAC",
              "Atendimento",
              "Financeiro",
              "Diretoria",
              "Comercial",
              "Auditoria"
            ]).nullable(),
            description: import_zod28.z.string().nullable(),
            createdAt: import_zod28.z.date().optional(),
            updatedAt: import_zod28.z.date().optional()
          }),
          404: import_zod28.z.object({
            message: import_zod28.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const pendingRepository = new DrizzlePendingRepository();
      const pending = await pendingRepository.selectOnePending(id);
      if (!pending) {
        return reply.status(404).send({ message: "Pending not found" });
      }
      return reply.status(200).send(pending);
    }
  );
};

// src/routes/create-credentials-route.ts
var import_zod29 = require("zod");

// src/infrastructure/db/cruds/drizzle-credential-repository.ts
var import_drizzle_orm7 = require("drizzle-orm");

// src/domain/entities/Credential.ts
var import_cuid28 = require("@paralleldrive/cuid2");
var Credential = class {
  constructor(id = (0, import_cuid28.createId)(), channelHead, partner, cnpj, agentIndicator) {
    this.id = id;
    this.channelHead = channelHead;
    this.partner = partner;
    this.cnpj = cnpj;
    this.agentIndicator = agentIndicator;
  }
};

// src/infrastructure/db/cruds/drizzle-credential-repository.ts
var DrizzleCredentialRepository = class {
  async createCredential(data) {
    const newCredential = new Credential(
      void 0,
      data.channelHead ?? null,
      data.partner ?? null,
      data.cnpj,
      data.agentIndicator
    );
    const response = await db.insert(credentials).values(newCredential).returning();
    if (response.length === 0) {
      return null;
    }
    const created = response[0];
    return new Credential(
      created.id,
      created.channelHead,
      created.partner,
      created.cnpj,
      created.agentIndicator
    );
  }
  select() {
    const response = db.select().from(credentials);
    return response;
  }
  async update(id, data) {
    const response = await db.update(credentials).set(data).where((0, import_drizzle_orm7.eq)(credentials.id, id)).returning();
    return response[0] || null;
  }
  async delete(id) {
    const response = await db.delete(credentials).where((0, import_drizzle_orm7.eq)(credentials.id, id)).returning();
    return response.length > 0;
  }
};

// src/routes/create-credentials-route.ts
var createCredentialRoute = async (app2) => {
  app2.post(
    "/credential",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createCredential",
        tags: ["credential"],
        description: "Create a new Credential",
        body: import_zod29.z.object({
          channelHead: import_zod29.z.string().nullable(),
          cnpj: import_zod29.z.string().nullable(),
          agentIndicator: import_zod29.z.string().nullable(),
          partner: import_zod29.z.string().nullable()
        }),
        response: {
          201: import_zod29.z.null(),
          400: import_zod29.z.object({
            message: import_zod29.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleCredentialRepository();
      const { channelHead, cnpj, agentIndicator, partner } = request.body;
      await drizzleOrm.createCredential({
        channelHead,
        cnpj,
        agentIndicator,
        partner
      });
      return reply.status(201).send();
    }
  );
};

// src/routes/create-client-route.ts
var import_zod30 = require("zod");

// src/infrastructure/db/cruds/drizzle-client-repository.ts
var import_drizzle_orm8 = require("drizzle-orm");

// src/domain/entities/Client.ts
var import_cuid29 = require("@paralleldrive/cuid2");
var Client = class {
  constructor(id = (0, import_cuid29.createId)(), enterprise, cnpj, competenceMonth, product, contestation, returned) {
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
    const response = await db.update(clients).set(data).where((0, import_drizzle_orm8.eq)(clients.id, id)).returning();
    const updatedClient = response[0];
    return updatedClient;
  }
  async delete(id) {
    const response = await db.delete(clients).where((0, import_drizzle_orm8.eq)(clients.id, id)).returning();
    return response.length > 0;
  }
};

// src/routes/create-client-route.ts
var createClientRoute = async (app2) => {
  app2.post(
    "/client",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createClient",
        tags: ["client"],
        description: "Create a new Client",
        body: import_zod30.z.object({
          enterprise: import_zod30.z.string().nullable(),
          competenceMonth: import_zod30.z.string().nullable(),
          cnpj: import_zod30.z.string().nullable(),
          contestation: import_zod30.z.string().nullable(),
          returned: import_zod30.z.string().nullable(),
          product: import_zod30.z.string().nullable()
        }),
        response: {
          201: import_zod30.z.null(),
          400: import_zod30.z.object({
            message: import_zod30.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleClientRepository();
      const {
        enterprise,
        competenceMonth,
        cnpj,
        contestation,
        returned,
        product
      } = request.body;
      request.body;
      await drizzleOrm.create({
        enterprise,
        competenceMonth,
        cnpj,
        contestation,
        returned,
        product
      });
      return reply.status(201).send();
    }
  );
};

// src/routes/get-credentials-and-clients.ts
var import_zod31 = require("zod");

// src/infrastructure/db/cruds/drizzle-credential-client-repository.ts
var import_drizzle_orm9 = require("drizzle-orm");
var import_cuid210 = require("@paralleldrive/cuid2");
var DrizzleCredentialClientRepository = class {
  async selectCredentialsAndClients() {
    const newId = (0, import_cuid210.createId)().toString();
    const result = await db.execute(import_drizzle_orm9.sql`
      WITH credentials_with_rn AS (
        SELECT 
          ROW_NUMBER() OVER (ORDER BY id) AS rn,
          id::text,
          channel_head::text AS "channelHead",
          partner::text,
          cnpj::text,
          agent_indicator::text AS "agentIndicator"
        FROM ${credentials}
      ),
      clients_with_rn AS (
        SELECT 
          ROW_NUMBER() OVER (ORDER BY id) AS rn,
          id::text,
          enterprise::text,
          competence_month::text AS "competenceMonth",
          cnpj::text,
          contestation::text,
          "return"::text AS returned
        FROM ${clients}
      )
      SELECT JSON_BUILD_OBJECT(
               'id', ${newId}::text,
               'credential', row_to_json(c),
               'client', row_to_json(cl)
             ) AS contestation
      FROM credentials_with_rn c
      JOIN clients_with_rn cl ON c.rn = cl.rn;
    `);
    return result;
  }
};

// src/routes/get-credentials-and-clients.ts
var getCredentialClientRoute = async (app2) => {
  app2.get(
    "/credential-client",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "listCredentialClient",
        tags: ["credential", "client"],
        description: "Lista os pares de credential e client agregados em um array JSON, com um novo id para cada objeto",
        response: {
          200: import_zod31.z.array(
            import_zod31.z.object({
              id: import_zod31.z.string(),
              credentials: import_zod31.z.object({
                id: import_zod31.z.string(),
                channelHead: import_zod31.z.string().nullable(),
                partner: import_zod31.z.string().nullable(),
                cnpj: import_zod31.z.string().nullable(),
                agentIndicator: import_zod31.z.string().nullable()
              }),
              clients: import_zod31.z.object({
                id: import_zod31.z.string(),
                enterprise: import_zod31.z.string(),
                competenceMonth: import_zod31.z.string(),
                cnpj: import_zod31.z.string(),
                contestation: import_zod31.z.string(),
                returned: import_zod31.z.string()
              })
            })
          ),
          400: import_zod31.z.object({
            message: import_zod31.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleCredentialClientRepository();
      const executedResult = await drizzleOrm.selectCredentialsAndClients();
      const response = executedResult.map((row) => {
        const contestation = row.contestation;
        return {
          id: contestation.id,
          credentials: contestation.credential,
          clients: contestation.client
        };
      });
      return reply.status(200).send(response);
    }
  );
};

// src/routes/update-credentials.ts
var import_zod32 = require("zod");
var updateCredentialRoute = async (app2) => {
  app2.put(
    "/credential/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateCredential",
        tags: ["credential"],
        description: "Update a credential",
        params: import_zod32.z.object({
          id: import_zod32.z.string()
        }),
        body: import_zod32.z.object({
          channelHead: import_zod32.z.string().nullable(),
          cnpj: import_zod32.z.string().nullable(),
          agentIndicator: import_zod32.z.string().nullable(),
          partner: import_zod32.z.string().nullable()
        }).partial(),
        response: {
          200: import_zod32.z.object({
            message: import_zod32.z.string()
          }),
          404: import_zod32.z.object({
            message: import_zod32.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleCredentialRepository();
      const updated = await repo.update(id, request.body);
      if (!updated) {
        return reply.status(404).send({ message: "Credencial n\xE3o encontrada" });
      }
      return reply.status(200).send({ message: "Credencial atualizada com sucesso!" });
    }
  );
};

// src/routes/delete-credentials.ts
var import_zod33 = require("zod");
var deleteCredentialRoute = async (app2) => {
  app2.delete(
    "/credential/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deleteCredential",
        tags: ["credential"],
        description: "Delete a credential",
        params: import_zod33.z.object({
          id: import_zod33.z.string()
        }),
        response: {
          200: import_zod33.z.object({
            message: import_zod33.z.string()
          }),
          404: import_zod33.z.object({
            message: import_zod33.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleCredentialRepository();
      const deleted = await drizzleOrm.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Credencial n\xE3o encontrada" });
      }
      return reply.status(200).send({ message: "Credencial deletada com sucesso!" });
    }
  );
};

// src/routes/get-client.ts
var import_zod34 = require("zod");
var getClientRoute = async (app2) => {
  app2.get(
    "/client",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getClient",
        tags: ["client"],
        description: "Get a list of client",
        response: {
          200: import_zod34.z.array(
            import_zod34.z.object({
              enterprise: import_zod34.z.string().nullable(),
              competenceMonth: import_zod34.z.string().nullable(),
              cnpj: import_zod34.z.string().nullable(),
              contestation: import_zod34.z.string().nullable(),
              returned: import_zod34.z.string().nullable(),
              product: import_zod34.z.string().nullable()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const DrizzleOrm = new DrizzleClientRepository();
      const client2 = await DrizzleOrm.select();
      return reply.status(200).send(client2);
    }
  );
};

// src/routes/delete-client.ts
var import_zod35 = require("zod");
var deleteClientRoute = async (app2) => {
  app2.delete(
    "/client/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deleteClient",
        tags: ["client"],
        description: "Delete a client",
        params: import_zod35.z.object({
          id: import_zod35.z.string()
        }),
        response: {
          200: import_zod35.z.object({
            message: import_zod35.z.string()
          }),
          404: import_zod35.z.object({
            message: import_zod35.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleClientRepository();
      const deleted = await drizzleOrm.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Cliente n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Cliente deletada com sucesso!" });
    }
  );
};

// src/routes/update-client.ts
var import_zod36 = require("zod");
var updateClientRoute = async (app2) => {
  app2.put(
    "/client/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateClient",
        tags: ["client"],
        description: "Update a client",
        params: import_zod36.z.object({
          id: import_zod36.z.string()
        }),
        body: import_zod36.z.object({
          enterprise: import_zod36.z.string().nullable(),
          competenceMonth: import_zod36.z.string().nullable(),
          cnpj: import_zod36.z.string().nullable(),
          contestation: import_zod36.z.string().nullable(),
          returned: import_zod36.z.string().nullable(),
          product: import_zod36.z.string().nullable()
        }).partial(),
        response: {
          200: import_zod36.z.object({
            message: import_zod36.z.string()
          }),
          404: import_zod36.z.object({
            message: import_zod36.z.string()
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

// src/routes/get-portal-controlls-by-partner.ts
var import_zod37 = require("zod");
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
var getPortalControllsBySelectParternRoute = async (app2) => {
  app2.get(
    "/portal/portalcontrolls",
    {
      schema: {
        operationId: "getPortalControllsBySelectParternRoute",
        tags: ["portalcontrolls"],
        description: "Retorna todos os registros de PortalControlls para o parceiro informado via querystring",
        querystring: import_zod37.z.object({
          partnerId: import_zod37.z.string().min(1, "partnerId \xE9 obrigat\xF3rio")
        }),
        response: {
          200: import_zod37.z.array(
            import_zod37.z.object({
              id: import_zod37.z.string().nullable(),
              monthOfCalculation: import_zod37.z.string().nullable(),
              competenceMonth: import_zod37.z.string().nullable(),
              contract: import_zod37.z.number().nullable(),
              enterprise: import_zod37.z.string().nullable(),
              product: import_zod37.z.string().nullable(),
              percentageHonorary: import_zod37.z.number().nullable(),
              compensation: import_zod37.z.number().nullable(),
              honorary: import_zod37.z.number().nullable(),
              tax: import_zod37.z.number().nullable(),
              tj: import_zod37.z.number().nullable(),
              value: import_zod37.z.number().nullable(),
              situation: import_zod37.z.string().nullable(),
              partnerId: import_zod37.z.string()
            })
          ),
          500: import_zod37.z.object({ error: import_zod37.z.string() })
        }
      }
    },
    async (request, reply) => {
      try {
        const { partnerId } = request.query;
        const repo = new DrizzlePortalControllRepository();
        const items = await repo.selectByPartner(partnerId);
        const safeItems = items.map(
          (item) => sanitizeItem(item, Array.from(NUMERIC_FIELDS))
        );
        return reply.status(200).send(safeItems);
      } catch (err) {
        request.log.error(err, "\u274C Erro em selectByPartner");
        return reply.status(500).send({ error: "Erro interno no servidor" });
      }
    }
  );
};

// src/routes/get-contract-by-id.ts
var import_zod38 = require("zod");
var getContractByIdRoute = async (app2) => {
  app2.get(
    "/contract/:id",
    {
      schema: {
        operationId: "getContractById",
        tags: ["contract"],
        description: "Get contract by id",
        params: import_zod38.z.object({
          id: import_zod38.z.string()
        }),
        response: {
          200: import_zod38.z.object({
            id: import_zod38.z.string(),
            city: import_zod38.z.string().nullable(),
            client: import_zod38.z.string().nullable(),
            state: import_zod38.z.string().nullable(),
            cnpj: import_zod38.z.string().nullable(),
            sindic: import_zod38.z.string().nullable(),
            year: import_zod38.z.string().nullable(),
            matter: import_zod38.z.string().nullable(),
            forecast: import_zod38.z.string().nullable(),
            contractTotal: import_zod38.z.string().nullable(),
            percentage: import_zod38.z.number().nullable(),
            signedContract: import_zod38.z.string().nullable(),
            status: import_zod38.z.string().nullable(),
            averageGuide: import_zod38.z.number().nullable(),
            partner: import_zod38.z.string().nullable(),
            partnerCommission: import_zod38.z.number().nullable(),
            counter: import_zod38.z.string().nullable(),
            email: import_zod38.z.string().nullable()
          }),
          404: import_zod38.z.object({ message: import_zod38.z.string() })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleContractRepository();
      const contract = await repo.selectById(id);
      if (!contract) {
        return reply.status(404).send({ message: "Contrato n\xE3o encontrado" });
      }
      return reply.status(200).send(contract);
    }
  );
};

// src/routes/create-client-receipt-route.ts
var import_zod39 = require("zod");

// src/infrastructure/db/cruds/drizzle-client-receipt-repository.ts
var import_drizzle_orm10 = require("drizzle-orm");

// src/domain/entities/Client-Receipt.ts
var import_cuid211 = require("@paralleldrive/cuid2");
var ClientReceipt = class {
  constructor(id = (0, import_cuid211.createId)(), receiptDate, competence, cnpj, clientName, percentage, compensationMonth, honorary, tax, status) {
    this.id = id;
    this.receiptDate = receiptDate;
    this.competence = competence;
    this.cnpj = cnpj;
    this.clientName = clientName;
    this.percentage = percentage;
    this.compensationMonth = compensationMonth;
    this.honorary = honorary;
    this.tax = tax;
    this.status = status;
  }
};

// src/infrastructure/db/cruds/drizzle-client-receipt-repository.ts
var DrizzleClientReceiptRepository = class {
  async create(data) {
    const newClientReceipt = new ClientReceipt(
      void 0,
      data.receiptDate,
      data.competence,
      data.cnpj,
      data.clientName,
      data.percentage,
      data.compensationMonth,
      data.honorary,
      data.tax,
      data.status
    );
    const response = await db.insert(clientReceipt).values(newClientReceipt).returning();
    const clientReceiptReponse = response[0];
    return clientReceiptReponse;
  }
  async select() {
    const response = await db.select().from(clientReceipt);
    return response;
  }
  async update(id, data) {
    const response = await db.update(clientReceipt).set(data).where((0, import_drizzle_orm10.eq)(clientReceipt.id, id)).returning();
    return response[0];
  }
  async delete(id) {
    const response = await db.delete(clientReceipt).where((0, import_drizzle_orm10.eq)(clientReceipt.id, id)).returning();
    return response.length > 0;
  }
};

// src/routes/create-client-receipt-route.ts
var createClientReceiptRoute = async (app2) => {
  app2.post(
    "/client-receipt",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "createClientReceipt",
        tags: ["clientReceipt"],
        description: "Create a new Client Receipt",
        body: import_zod39.z.object({
          receiptDate: import_zod39.z.string().nullable(),
          competence: import_zod39.z.string().nullable(),
          cnpj: import_zod39.z.string().nullable(),
          clientName: import_zod39.z.string().nullable(),
          percentage: import_zod39.z.number().nullable(),
          compensationMonth: import_zod39.z.string().nullable(),
          honorary: import_zod39.z.number().nullable(),
          tax: import_zod39.z.number().nullable(),
          status: import_zod39.z.string().nullable()
        }),
        response: {
          201: import_zod39.z.null(),
          400: import_zod39.z.object({
            message: import_zod39.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const drizzleOrm = new DrizzleClientReceiptRepository();
      const {
        receiptDate,
        competence,
        cnpj,
        clientName,
        percentage,
        compensationMonth,
        honorary,
        tax,
        status
      } = request.body;
      await drizzleOrm.create({
        receiptDate,
        competence,
        cnpj,
        clientName,
        percentage,
        compensationMonth,
        honorary,
        tax,
        status
      });
      return reply.status(201).send();
    }
  );
};

// src/routes/update-client-receipt-route.ts
var import_zod40 = require("zod");
var updateClientReceiptRoute = async (app2) => {
  app2.put(
    "/client-receipt/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "updateClientReceipt",
        tags: ["clientReceipt"],
        description: "Update a client Receipt",
        params: import_zod40.z.object({
          id: import_zod40.z.string()
        }),
        body: import_zod40.z.object({
          receiptDate: import_zod40.z.string().nullable(),
          competence: import_zod40.z.string().nullable(),
          cnpj: import_zod40.z.string().nullable(),
          clientName: import_zod40.z.string().nullable(),
          percentage: import_zod40.z.number().nullable(),
          compensationMonth: import_zod40.z.string().nullable(),
          honorary: import_zod40.z.number().nullable(),
          tax: import_zod40.z.number().nullable(),
          status: import_zod40.z.string().nullable()
        }).partial(),
        response: {
          200: import_zod40.z.object({
            message: import_zod40.z.string()
          }),
          404: import_zod40.z.object({
            message: import_zod40.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const repo = new DrizzleClientReceiptRepository();
      const updated = await repo.update(id, request.body);
      if (!updated) {
        return reply.status(404).send({ message: "Cliente n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Cliente atualizada com sucesso!" });
    }
  );
};

// src/routes/delete-client-receipt-route.ts
var import_zod41 = require("zod");
var deleteClientReceiptRoute = async (app2) => {
  app2.delete(
    "/client-receipt/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "deleteClientReceipt",
        tags: ["clientReceipt"],
        description: "Delete a client receipt",
        params: import_zod41.z.object({
          id: import_zod41.z.string()
        }),
        response: {
          200: import_zod41.z.object({
            message: import_zod41.z.string()
          }),
          404: import_zod41.z.object({
            message: import_zod41.z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleClientReceiptRepository();
      const deleted = await drizzleOrm.delete(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Cliente n\xE3o encontrado" });
      }
      return reply.status(200).send({ message: "Cliente deletada com sucesso!" });
    }
  );
};

// src/routes/get-client-receipt-route.ts
var import_zod42 = require("zod");
var getClientReceiptRoute = async (app2) => {
  app2.get(
    "/client-receipt",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getClient-receipt",
        tags: ["clientReceipt"],
        description: "Get a list of client Receipt",
        response: {
          200: import_zod42.z.array(
            import_zod42.z.object({
              id: import_zod42.z.string(),
              receiptDate: import_zod42.z.string().nullable(),
              competence: import_zod42.z.string().nullable(),
              cnpj: import_zod42.z.string().nullable(),
              clientName: import_zod42.z.string().nullable(),
              percentage: import_zod42.z.number().nullable(),
              compensationMonth: import_zod42.z.string().nullable(),
              honorary: import_zod42.z.number().nullable(),
              tax: import_zod42.z.number().nullable(),
              status: import_zod42.z.string().nullable()
            })
          )
        }
      }
    },
    async (_, reply) => {
      const DrizzleOrm = new DrizzleClientReceiptRepository();
      const clientReceipt2 = await DrizzleOrm.select();
      return reply.status(200).send(clientReceipt2);
    }
  );
};

// src/routes/get-negotiation-by-id.ts
var import_zod43 = require("zod");
var getNegotiationByIdRoute = async (app2) => {
  app2.get(
    "/negotiation/:id",
    {
      // onRequest: [authenticateUserHook],
      schema: {
        operationId: "getNegotiationById",
        tags: ["negotiation"],
        description: "Get a list of Negotiation by id",
        params: import_zod43.z.object({
          id: import_zod43.z.string()
        }),
        response: {
          200: import_zod43.z.array(
            import_zod43.z.object({
              id: import_zod43.z.string(),
              title: import_zod43.z.string().nullable(),
              client: import_zod43.z.string().nullable(),
              user: import_zod43.z.string().nullable(),
              tags: import_zod43.z.string().nullable(),
              step: import_zod43.z.string().nullable(),
              status: import_zod43.z.string(),
              value: import_zod43.z.number().nullable(),
              startsDate: import_zod43.z.string().nullable(),
              observation: import_zod43.z.string().nullable(),
              averageGuide: import_zod43.z.number().nullable(),
              partnerId: import_zod43.z.string().nullable()
            })
          )
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const drizzleOrm = new DrizzleExelDataNegotiationRepository();
      const negotiations2 = await drizzleOrm.selectById(id);
      const formattedNegotiations = negotiations2.map((item) => ({
        ...item,
        status: item.status ?? ""
      }));
      return reply.status(200).send(formattedNegotiations);
    }
  );
};

// src/infrastructure/server.ts
var import_cuid212 = require("@paralleldrive/cuid2");

// src/routes/get-portal-controll-by-id.ts
var import_zod44 = require("zod");
function sanitizeNumber2(value) {
  return typeof value === "number" && !Number.isNaN(value) ? value : null;
}
function sanitizeItem2(item, keys) {
  const result = { ...item };
  for (const key of keys) {
    result[key] = sanitizeNumber2(result[key]);
  }
  return result;
}
var NUMERIC_FIELDS2 = [
  "contract",
  "percentageHonorary",
  "compensation",
  "honorary",
  "tax",
  "value"
];
var getPortalControllsBySelectByIdRoute = async (app2) => {
  app2.get(
    "/portal/portalcontrolls/:id",
    {
      schema: {
        operationId: "getPortalControllsBySelectById",
        tags: ["portalcontrolls"],
        description: "Retorna todos os registros de PortalControlls para o parceiro informado via querystring",
        params: import_zod44.z.object({
          id: import_zod44.z.string()
        }),
        response: {
          200: import_zod44.z.array(
            import_zod44.z.object({
              id: import_zod44.z.string(),
              monthOfCalculation: import_zod44.z.string().nullable(),
              competenceMonth: import_zod44.z.string().nullable(),
              contract: import_zod44.z.number().nullable(),
              enterprise: import_zod44.z.string().nullable(),
              product: import_zod44.z.string().nullable(),
              percentageHonorary: import_zod44.z.number().nullable(),
              compensation: import_zod44.z.number().nullable(),
              honorary: import_zod44.z.number().nullable(),
              tax: import_zod44.z.number().nullable(),
              tj: import_zod44.z.number().nullable(),
              value: import_zod44.z.number().nullable(),
              situation: import_zod44.z.string().nullable(),
              partnerId: import_zod44.z.string()
            })
          ),
          500: import_zod44.z.object({ error: import_zod44.z.string() })
        }
      }
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const repo = new DrizzlePortalControllRepository();
        const rawResponse = await repo.getControllById(id);
        const sanitizedResponse = (rawResponse ?? []).map(
          (item) => sanitizeItem2(item, [...NUMERIC_FIELDS2])
        );
        return reply.status(200).send(sanitizedResponse);
      } catch (err) {
        request.log.error(err, "\u274C Erro em selectByPartner");
        return reply.status(500).send({ error: "Erro interno no servidor" });
      }
    }
  );
};

// src/infrastructure/server.ts
import_dotenv.default.config({ path: "/home/onec/onec-project/onec-backend/.env" });
console.log("> database url:", process.env.DATABASE_URL);
var app = (0, import_fastify.fastify)({ logger: true }).withTypeProvider();
app.register(import_cors.fastifyCors, {
  origin: "https://onecsis.com.br",
  credentials: true
});
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(import_jwt.fastifyJwt, {
  secret: env.JWT_SECRET
});
app.register(import_multipart.default);
app.register(import_swagger.fastifySwagger, {
  openapi: {
    info: {
      title: "onec",
      version: "1.0.0"
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
app.register(import_swagger_ui.fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.register(createPartnerRoute);
app.register(getPartnersRoute);
app.register(updatePartnerRoute);
app.register(deletePartnerRoute);
app.register(createDataNegotiationRoute);
app.register(getNegotiationRoute);
app.register(updateNegotiationRoute);
app.register(deleteNegotiationRoute);
app.register(createContractRoute);
app.register(getContractRoute);
app.register(updateContractRoute);
app.register(deleteContractRoute);
app.register(authenticateUserRoute);
app.register(getProfileUser);
app.register(updateUserRoute);
app.register(deleteUserRoute);
app.register(createPendingRoute);
app.register(getPendingsRoute);
app.register(deletePendingRoute);
app.register(updatePendingRoute);
app.register(createPortalControllRoute);
app.register(deletePortalControllRoute);
app.register(updatePortalControllRoute);
app.register(getContractStatusCountRoute);
app.register(getContractStatusCountByFilterRoute);
app.register(getOnePartnerRoute);
app.register(getOnePendingRoute);
app.register(createCredentialRoute);
app.register(createClientRoute);
app.register(getCredentialClientRoute);
app.register(updateCredentialRoute);
app.register(deleteCredentialRoute);
app.register(getClientRoute);
app.register(updateClientRoute);
app.register(deleteClientRoute);
app.register(getPortalControllsBySelectParternRoute);
app.register(getContractByIdRoute);
app.register(createClientReceiptRoute);
app.register(getClientReceiptRoute);
app.register(deleteClientReceiptRoute);
app.register(updateClientReceiptRoute);
app.register(getNegotiationByIdRoute);
app.register(getPortalControllsBySelectByIdRoute);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("Http server running \u{1F680}\u{1F680}");
});
if (env.NODE_ENV === "development") {
  const specFile = (0, import_node_path.resolve)(__dirname, "../../swagger.json");
  app.ready().then(() => {
    const spec = JSON.stringify(app.swagger(), null, 2);
    (0, import_promises.writeFile)(specFile, spec).then(() => {
      console.log("Swagger spec generated!");
      console.log((0, import_cuid212.createId)());
    });
  });
}
