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

// src/domain/repositories/memory/InMemoryUserRepository.ts
var InMemoryUserRepository_exports = {};
__export(InMemoryUserRepository_exports, {
  InMemoryUserRepository: () => InMemoryUserRepository
});
module.exports = __toCommonJS(InMemoryUserRepository_exports);

// src/domain/entities/User.ts
var import_cuid2 = require("@paralleldrive/cuid2");
var User = class {
  constructor(id = (0, import_cuid2.createId)(), email, passwordHash, role) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }
};

// src/domain/repositories/memory/InMemoryUserRepository.ts
var InMemoryUserRepository = class {
  users = [];
  async create(userData) {
    const user = new User(
      void 0,
      userData.email,
      userData.passwordHash,
      userData.role
    );
    this.users.push(user);
    return user;
  }
  async select() {
    return this.users;
  }
  async update(id, data) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const updatedUser = { ...this.users[index], ...data };
    this.users[index] = updatedUser;
    return updatedUser;
  }
  async delete(id) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
  async findByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  }
  async addUser(user) {
    this.users.push(user);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUserRepository
});
