import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

const userRegister = catchAsync(async (req: Request, res: Response) => {
    
    const result = await authService.userRegister(req.body);

    ApiResponse.success(res, 201, "User Registered Successfully", result);
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const result = await authService.userLogin(data);

    ApiResponse.success(res, 200, "Logged in Successfully", result);
});

export const authController = {
    userLogin,
    userRegister,
};
