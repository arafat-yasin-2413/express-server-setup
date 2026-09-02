import type { Response } from "express";
import { env } from "../config/env.js";

const success = (
    res: Response,
    statusCode: number,
    message: string,
    data: any,
) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
    });
};

const error = (
    res: Response,
    statusCode: number,
    message: string,
    error: any,
) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        // stack: error.stack,
        ...(env.nodeEnv === "development" && { stack: error.stack }),
    });
};

export const ApiResponse = {
    success,
    error,
};
