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

// src/domain/repositories/memory/InMemoryPendingRepository.ts
var InMemoryPendingRepository_exports = {};
__export(InMemoryPendingRepository_exports, {
  InMemoryPendingRepository: () => InMemoryPendingRepository
});
module.exports = __toCommonJS(InMemoryPendingRepository_exports);
var InMemoryPendingRepository = class {
  pendings = [];
  async create(pending) {
    this.pendings.push(pending);
    return pending;
  }
  async select() {
    return this.pendings;
  }
  async update(id, data) {
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o chamado para atualizar!");
    }
    const pendingIndex = this.pendings.findIndex((pending) => pending.id === id);
    if (pendingIndex === -1) {
      return null;
    }
    const updatedPending = { ...this.pendings[pendingIndex], ...data };
    this.pendings[pendingIndex] = updatedPending;
    return updatedPending;
  }
  async delete(id) {
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o chamado para ser deletado!");
    }
    const pendingIndex = this.pendings.findIndex((pending) => pending.id === id);
    if (pendingIndex === -1) {
      return false;
    }
    this.pendings.splice(pendingIndex, 1);
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryPendingRepository
});
