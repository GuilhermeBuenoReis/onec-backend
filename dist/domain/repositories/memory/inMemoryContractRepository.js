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

// src/domain/repositories/memory/inMemoryContractRepository.ts
var inMemoryContractRepository_exports = {};
__export(inMemoryContractRepository_exports, {
  InMemoryContractRepository: () => InMemoryContractRepository
});
module.exports = __toCommonJS(inMemoryContractRepository_exports);
var InMemoryContractRepository = class {
  contracts = [];
  async create(contract) {
    this.contracts.push(contract);
    return contract;
  }
  async select() {
    return this.contracts;
  }
  async update(id, data) {
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o contrato para atualizar!");
    }
    const contractIndex = this.contracts.findIndex(
      (contract) => contract.id === id
    );
    if (contractIndex === -1) {
      return null;
    }
    const updatedContract = { ...this.contracts[contractIndex], ...data };
    this.contracts[contractIndex] = updatedContract;
    return updatedContract;
  }
  async delete(id) {
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o contrato para ser deletado!");
    }
    const contractIndex = this.contracts.findIndex(
      (contract) => contract.id === id
    );
    if (contractIndex === -1) {
      return false;
    }
    this.contracts.splice(contractIndex, 1);
    return true;
  }
  selectCountStatus() {
    return this.selectCountStatus();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryContractRepository
});
