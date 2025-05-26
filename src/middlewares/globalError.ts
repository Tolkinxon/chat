import { ErrorRequestHandler, NextFunction, Response } from "express"
import { CustomErrorInterface } from "../types/error.dto"

export const globalError:ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'
    res.status(status).json({message, status})
}