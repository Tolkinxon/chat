"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = readFile;
exports.writeFile = writeFile;
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = __importDefault(require("../config"));
const { dbPath } = config_1.default;
function readFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield promises_1.default.readFile(dbPath(fileName), 'utf-8');
        return data ? JSON.parse(data) : [];
    });
}
function writeFile(fileName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile(dbPath(fileName), JSON.stringify(data, null, 4));
        return true;
    });
}
