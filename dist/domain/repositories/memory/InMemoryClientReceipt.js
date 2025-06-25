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

// src/domain/repositories/memory/InMemoryClientReceipt.ts
var InMemoryClientReceipt_exports = {};
__export(InMemoryClientReceipt_exports, {
  InMemoryClientReceiptRepository: () => InMemoryClientReceiptRepository
});
module.exports = __toCommonJS(InMemoryClientReceipt_exports);
var InMemoryClientReceiptRepository = class {
  clientReceipts = [];
  async create(data) {
    this.clientReceipts.push(data);
    return data;
  }
  async select() {
    return this.clientReceipts;
  }
  async update(id, data) {
    const index = this.clientReceipts.findIndex(
      (clientReceipt) => clientReceipt.id === id
    );
    if (index === -1) return null;
    const updatedClientReceipt = { ...this.clientReceipts[index], ...data };
    this.clientReceipts[index] = updatedClientReceipt;
    return updatedClientReceipt;
  }
  async delete(id) {
    const index = this.clientReceipts.findIndex(
      (clientReceipt) => clientReceipt.id === id
    );
    if (index === -1) return false;
    this.clientReceipts.splice(index, 1);
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryClientReceiptRepository
});
