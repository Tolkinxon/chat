"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const globalError = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, status });
};
exports.globalError = globalError;
