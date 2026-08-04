import type { Request, Response } from "express";
import { success } from "zod";

const notFound = (req: Request, res:Response) =>{
    res.status(400).json({
        success: false,
        message: 'API Not Found',
        error: {
            path: req.originalUrl,
            message: 'Your requested path is not found'
        },
    })
}


export default notFound;