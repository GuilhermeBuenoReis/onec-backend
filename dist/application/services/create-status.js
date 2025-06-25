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

// src/application/services/create-status.ts
var create_status_exports = {};
__export(create_status_exports, {
  CreateStatus: () => CreateStatus
});
module.exports = __toCommonJS(create_status_exports);

// src/domain/entities/Status.ts
var import_cuid2 = require("@paralleldrive/cuid2");
var Status = class {
  constructor(id = (0, import_cuid2.createId)(), type, count) {
    this.id = id;
    this.type = type;
    this.count = count;
  }
};

// src/application/services/create-status.ts
var CreateStatus = class {
  constructor(statusRepository) {
    this.statusRepository = statusRepository;
  }
  async create({ id, type, count }) {
    const status = new Status(id, type, count);
    return await this.statusRepository.create(status);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateStatus
});
