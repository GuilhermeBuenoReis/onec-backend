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

// src/domain/entities/Partner.ts
var Partner_exports = {};
__export(Partner_exports, {
  Partner: () => Partner
});
module.exports = __toCommonJS(Partner_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Partner
});
