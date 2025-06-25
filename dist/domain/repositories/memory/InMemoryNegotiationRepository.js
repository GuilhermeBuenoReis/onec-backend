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

// src/domain/repositories/memory/InMemoryNegotiationRepository.ts
var InMemoryNegotiationRepository_exports = {};
__export(InMemoryNegotiationRepository_exports, {
  InMemoryExelDataNegotiationRepository: () => InMemoryExelDataNegotiationRepository
});
module.exports = __toCommonJS(InMemoryNegotiationRepository_exports);
var InMemoryExelDataNegotiationRepository = class {
  negotiations = [];
  async create(negotiation) {
    this.negotiations.push(negotiation);
    return negotiation;
  }
  async select() {
    return this.negotiations;
  }
  async update(id, data) {
    if (!id || id.trim() === "") {
      throw new Error("Negotiation not found for update!");
    }
    const index = this.negotiations.findIndex((n) => n.id === id);
    if (index === -1) {
      return null;
    }
    const updatedNegotiation = { ...this.negotiations[index], ...data };
    this.negotiations[index] = updatedNegotiation;
    return updatedNegotiation;
  }
  async delete(id) {
    if (!id || id.trim() === "") {
      throw new Error("Negotiation not found for deletion!");
    }
    const index = this.negotiations.findIndex((n) => n.id === id);
    if (index === -1) {
      return false;
    }
    this.negotiations.splice(index, 1);
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryExelDataNegotiationRepository
});
