import { Request, Response, NextFunction } from "express";

export default {
    MAIN: async function(req:Request, res:Response, next:NextFunction){
        try{
            return res.render('index');
        }
        catch(error){
            next(error);
        }
    },
    REGISTER_PAGE: async function(req:Request, res:Response, next:NextFunction){
        try{
            return res.render('register');
        }
        catch(error){
            next(error);
        }
    },
    LOGIN_PAGE: async function(req:Request, res:Response, next:NextFunction){
        try{
            return res.render('login');
        }
        catch(error){
            next(error);
        }
    },
}