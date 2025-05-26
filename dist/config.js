"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const node_path_1 = __importDefault(require("node:path"));
const serverConfig = {
    PORT: config_1.default.get('PORT') || 4000,
    TOKEN_KEY: config_1.default.get('TOKEN_KEY'),
    dbPath: (fileName) => node_path_1.default.join(process.cwd(), 'db', fileName + '.json')
};
exports.default = serverConfig;
