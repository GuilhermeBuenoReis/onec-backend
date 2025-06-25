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

// src/application/services/select-pending.ts
var select_pending_exports = {};
__export(select_pending_exports, {
  SelectPending: () => SelectPending
});
module.exports = __toCommonJS(select_pending_exports);
var SelectPending = class {
  constructor(pendingRepository) {
    this.pendingRepository = pendingRepository;
  }
  async execute() {
    return await this.pendingRepository.select();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SelectPending
});
