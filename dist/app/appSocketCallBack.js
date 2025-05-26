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
const checktoken_1 = require("../utils/checktoken");
const allUser = {};
const messages = [];
const appSocketCallBack = function (socket, io) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = socket.handshake.auth.token;
        const checking = yield (0, checktoken_1.checkToken)(token);
        if (!checking.status)
            return socket.emit('tokenError', { message: checking.message });
        socket.on('connected', ({ username }) => {
            allUser[username] = socket.id;
            io.emit('joined', { joinedUsername: username, allUser });
            io.emit('resive', messages);
        });
        socket.on('send', ({ from, to, message }) => {
            messages.push({ from, to, message });
            io.emit('resive', messages);
        });
        socket.on('changePartner', () => {
            io.emit('resive', messages);
        });
    });
};
exports.default = appSocketCallBack;
