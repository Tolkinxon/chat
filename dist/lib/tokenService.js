"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("config"));
exports.tokenService = {
    createToken: (payload) => (0, jsonwebtoken_1.sign)(payload, config_1.default.get('TOKEN_KEY')),
    verifyToken: (token) => (0, jsonwebtoken_1.verify)(token, config_1.default.get('TOKEN_KEY')),
};
