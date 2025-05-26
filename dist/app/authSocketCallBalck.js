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
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = require("../lib/tokenService");
const model_1 = require("../model/model");
const { createToken } = tokenService_1.tokenService;
const authSocketCallBack = function (socket) {
    socket.on('registered', (data) => __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, model_1.readFile)('users');
        if (users.some((item) => item.email == data.email))
            return socket.emit('authError', { message: 'this user already excist' });
        const newUser = Object.assign(Object.assign({ id: users.length ? users.at(-1).id + 1 : 1 }, data), { createdAt: new Date().toLocaleDateString(), updatedAt: null });
        users.push(newUser);
        yield (0, model_1.writeFile)('users', users);
        return socket.emit('authSuccess', { messge: 'User successfully added!', username: newUser.username, accessToken: createToken({ id: newUser.id }) });
    }));
    socket.on('login', (data) => __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, model_1.readFile)('users');
        const foundUser = users.find((item) => item.email == data.email);
        if (foundUser == undefined)
            return socket.emit('authError', { message: 'this user is not available' });
        if ((foundUser === null || foundUser === void 0 ? void 0 : foundUser.password) != (data === null || data === void 0 ? void 0 : data.password))
            return socket.emit('authError', { message: 'this user is not available' });
        return socket.emit('authSuccess', { messge: 'User successfully logged!', username: foundUser.username, accessToken: createToken({ id: foundUser.id }) });
    }));
};
exports.default = authSocketCallBack;
