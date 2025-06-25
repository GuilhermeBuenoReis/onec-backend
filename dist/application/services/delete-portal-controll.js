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

// src/application/services/delete-portal-controll.ts
var delete_portal_controll_exports = {};
__export(delete_portal_controll_exports, {
  Deleteportalcontroll: () => Deleteportalcontroll
});
module.exports = __toCommonJS(delete_portal_controll_exports);
var Deleteportalcontroll = class {
  constructor(portalcontrollRepository) {
    this.portalcontrollRepository = portalcontrollRepository;
  }
  async execute(id) {
    return await this.portalcontrollRepository.delete(id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Deleteportalcontroll
});
