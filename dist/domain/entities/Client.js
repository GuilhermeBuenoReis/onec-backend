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

// src/domain/entities/Client.ts
var Client_exports = {};
__export(Client_exports, {
  Client: () => Client
});
module.exports = __toCommonJS(Client_exports);
var import_cuid2 = require("@paralleldrive/cuid2");
var Client = class {
  constructor(id = (0, import_cuid2.createId)(), enterprise, cnpj, competenceMonth, product, contestation, returned) {
    this.id = id;
    this.enterprise = enterprise;
    this.cnpj = cnpj;
    this.competenceMonth = competenceMonth;
    this.product = product;
    this.contestation = contestation;
    this.returned = returned;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Client
});
