import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const userLogin = async(req: Request, res:Response) =>{
    const {email, password } = req.body;

    const result = await authService.userLogin(email, password)

    res.send({
        success: true, 
        message: "Log in successfull",
        data: result,
    })
}

export const authController = {
    userLogin,
}