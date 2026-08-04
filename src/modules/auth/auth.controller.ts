import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

const userLogin = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await authService.userLogin(email, password);

    ApiResponse.success(res, 200, "Logged in Successfully", result);
});

export const authController = {
    userLogin,
};
