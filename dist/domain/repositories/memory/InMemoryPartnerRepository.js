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

// src/domain/repositories/memory/InMemoryPartnerRepository.ts
var InMemoryPartnerRepository_exports = {};
__export(InMemoryPartnerRepository_exports, {
  InMemoryPartnerRepository: () => InMemoryPartnerRepository
});
module.exports = __toCommonJS(InMemoryPartnerRepository_exports);
var InMemoryPartnerRepository = class {
  partners = [];
  async create(partner) {
    this.partners.push(partner);
    return partner;
  }
  async select() {
    return this.partners;
  }
  async update(id, partner) {
    if (!id || id.trim() === "") {
      throw new Error("Partner not found for update!");
    }
    const index = this.partners.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
    const updatedPartner = { ...this.partners[index], ...partner };
    this.partners[index] = updatedPartner;
    return updatedPartner;
  }
  async delete(id) {
    if (!id || id.trim() === "") {
      throw new Error("Partner not found for deletion!");
    }
    const index = this.partners.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    this.partners.splice(index, 1);
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryPartnerRepository
});
