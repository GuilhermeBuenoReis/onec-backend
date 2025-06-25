"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/application/services/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticationService: () => AuthenticationService
});
module.exports = __toCommonJS(authenticate_exports);
var import_bcrypt = __toESM(require("bcrypt"));

// src/config/jose.ts
var import_jose = require("jose");

// src/env.ts
var import_zod = __toESM(require("zod"));
var envSchema = import_zod.default.object({
  NODE_ENV: import_zod.default.enum(["development", "test", "production"]).optional().default("production"),
  DATABASE_URL: import_zod.default.string().url(),
  JWT_SECRET: import_zod.default.string(),
  ADMIN1_EMAIL: import_zod.default.string(),
  ADMIN1_PASSWORD: import_zod.default.string(),
  ADMIN2_EMAIL: import_zod.default.string(),
  ADMIN2_PASSWORD: import_zod.default.string(),
  ADMIN3_EMAIL: import_zod.default.string(),
  ADMIN3_PASSWORD: import_zod.default.string()
});
var env = envSchema.parse(process.env);

// src/config/jose.ts
async function generateToken(payload) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const token = await new import_jose.SignJWT(payload).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setIssuedAt().setExpirationTime("60d").sign(secret);
  return token;
}

// src/application/services/authenticate.ts
var AuthenticationService = class {
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await import_bcrypt.default.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }
    const token = await generateToken({ id: user.id, role: user.role });
    return token;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticationService
});
