"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/application/services/create-new-pending.ts
var create_new_pending_exports = {};
__export(create_new_pending_exports, {
  PartnerService: () => PartnerService
});
module.exports = __toCommonJS(create_new_pending_exports);

// src/domain/entities/Pending.ts
var import_cuid2 = require("@paralleldrive/cuid2");
var Pending = class {
  constructor(id = (0, import_cuid2.createId)(), client, callReason, status, priority, responsible, category, description, createdAt, updatedAt) {
    this.id = id;
    this.client = client;
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

// src/application/services/create-new-pending.ts
var PartnerService = class {
  constructor(pendingRepository) {
    this.pendingRepository = pendingRepository;
  }
  async create({
    id,
    client,
    callReason,
    status,
    priority,
    responsible,
    category,
    description,
    createdAt,
    updatedAt
  }) {
    const partner = new Pending(
      id,
      client,
      callReason,
      status,
      priority,
      responsible,
      category,
      description,
      createdAt,
      updatedAt
    );
    return await this.pendingRepository.create(partner);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PartnerService
});
