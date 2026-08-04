import type { Response } from "express";

const success = (res: Response, statusCode: number, message: string, data: any) =>{
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
    })
}

const error = (res: Response, statusCode: number, message: string) =>{
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
}

export const ApiResponse = {
    success,error
}