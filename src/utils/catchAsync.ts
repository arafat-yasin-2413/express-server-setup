import type { NextFunction, Request, RequestHandler, Response } from "express";
import {error} from 'node:console'

const catchAsync = (fn: RequestHandler) => (req: Request, res:Response, next:NextFunction) => {
    Promise.resolve(fn(req,res,next)).catch(next)
    
}

export default catchAsync;