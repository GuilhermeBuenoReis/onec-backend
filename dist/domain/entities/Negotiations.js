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

// src/domain/entities/Negotiations.ts
var Negotiations_exports = {};
__export(Negotiations_exports, {
  ExelDataNegotiation: () => ExelDataNegotiation
});
module.exports = __toCommonJS(Negotiations_exports);
var import_cuid2 = require("@paralleldrive/cuid2");
var ExelDataNegotiation = class {
  constructor(id = (0, import_cuid2.createId)(), title, client, user, tags, status, step, value, startsDate, observation, partnerId, averageGuide) {
    this.id = id;
    this.title = title;
    this.client = client;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExelDataNegotiation
});
