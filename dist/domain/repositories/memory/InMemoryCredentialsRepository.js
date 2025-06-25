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

// src/domain/repositories/memory/InMemoryCredentialsRepository.ts
var InMemoryCredentialsRepository_exports = {};
__export(InMemoryCredentialsRepository_exports, {
  InMemoryCredentialRepository: () => InMemoryCredentialRepository
});
module.exports = __toCommonJS(InMemoryCredentialsRepository_exports);
var InMemoryCredentialRepository = class {
  credentials = [];
  async createCredential(data) {
    this.credentials.push(data);
    return data;
  }
  async select() {
    return this.credentials;
  }
  async update(id, data) {
    const index = this.credentials.findIndex(
      (credential) => credential.id === id
    );
    if (index === -1) return null;
    const updatedCredential = { ...this.credentials[index], ...data };
    this.credentials[index] = updatedCredential;
    return updatedCredential;
  }
  async delete(id) {
    const index = this.credentials.findIndex(
      (credential) => credential.id === id
    );
    if (index === -1) return false;
    this.credentials.splice(index, 1);
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryCredentialRepository
});
