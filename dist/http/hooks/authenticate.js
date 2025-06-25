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

// src/http/hooks/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  authenticateUserHook: () => authenticateUserHook
});
module.exports = __toCommonJS(authenticate_exports);
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    if (!name) return;
    cookies[name.trim()] = rest.join("=").trim();
  });
  return cookies;
}
async function authenticateUserHook(request, reply) {
  try {
    const authHeader = request.headers.authorization;
    const cookies = parseCookies(request.headers.cookie);
    const token = authHeader?.split(" ")[1] || cookies["app-token"];
    if (!token) {
      throw new Error("Token n\xE3o fornecido");
    }
    request.headers.authorization = `Bearer ${token}`;
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateUserHook
});
