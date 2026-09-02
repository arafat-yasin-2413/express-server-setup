import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) =>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong!"

    return ApiResponse.error(res,statusCode,message, error);
}