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

// src/domain/entities/Contract.ts
var Contract_exports = {};
__export(Contract_exports, {
  Contract: () => Contract
});
module.exports = __toCommonJS(Contract_exports);
var import_cuid2 = require("@paralleldrive/cuid2");
var Contract = class {
  constructor(id = (0, import_cuid2.createId)(), city, client, state, cnpj, sindic, year, matter, forecast, contractTotal, percentage, signedContract, status, averageGuide, partner, partnerCommission, counter, email) {
    this.id = id;
    this.city = city;
    this.client = client;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Contract
});
