"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const views_controller_1 = __importDefault(require("../controllers/views.controller"));
const viewsRouter = (0, express_1.Router)();
viewsRouter.get('/', views_controller_1.default.MAIN);
viewsRouter.get('/register', views_controller_1.default.REGISTER_PAGE);
viewsRouter.get('/login', views_controller_1.default.LOGIN_PAGE);
exports.default = viewsRouter;
