import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!"

    return ApiResponse.error(res,statusCode,message)
}