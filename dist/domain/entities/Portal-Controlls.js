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

// src/domain/entities/Portal-Controlls.ts
var Portal_Controlls_exports = {};
__export(Portal_Controlls_exports, {
  PortalControll: () => PortalControll
});
module.exports = __toCommonJS(Portal_Controlls_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PortalControll
});
