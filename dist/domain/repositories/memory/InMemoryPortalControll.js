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

// src/domain/repositories/memory/InMemoryPortalControll.ts
var InMemoryPortalControll_exports = {};
__export(InMemoryPortalControll_exports, {
  InMemoryPortalControllRepository: () => InMemoryPortalControllRepository
});
module.exports = __toCommonJS(InMemoryPortalControll_exports);
var InMemoryPortalControllRepository = class {
  portalcontrolls = [];
  async create(portalcontroll) {
    this.portalcontrolls.push(portalcontroll);
    return portalcontroll;
  }
  async select() {
    return this.portalcontrolls;
  }
  async update(id, data) {
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o chamado para atualizar!");
    }
    const portalcontrollIndex = this.portalcontrolls.findIndex(
      (portalcontroll) => portalcontroll.id === id
    );
    if (portalcontrollIndex === -1) {
      return null;
    }
    const updatedPortalControll = {
      ...this.portalcontrolls[portalcontrollIndex],
      ...data
    };
    this.portalcontrolls[portalcontrollIndex] = updatedPortalControll;
    return updatedPortalControll;
  }
  async delete(id) {
    if (!id || id.trim() === "") {
      throw new Error("N\xE3o foi encontrado o chamado para ser deletado!");
    }
    const portalcontrollIndex = this.portalcontrolls.findIndex(
      (portalcontroll) => portalcontroll.id === id
    );
    if (portalcontrollIndex === -1) {
      return false;
    }
    this.portalcontrolls.splice(portalcontrollIndex, 1);
    return true;
  }
  selectByPartner(partnerId) {
    return new Promise((resolve) => {
      const portalcontrolls = this.portalcontrolls.filter(
        (portalcontroll) => portalcontroll.partnerId === partnerId
      );
      resolve(portalcontrolls);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryPortalControllRepository
});
