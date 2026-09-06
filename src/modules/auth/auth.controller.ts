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

const deleteUser = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.body;

	const result = await authService.deleteUser(id);

	ApiResponse.success(res, 200, "User deleted Successfully", result);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.body;
	const data = req.body;

	const result = await authService.updateUser(id, data);

	ApiResponse.success(res, 200, "User updated Successfully", result);
});

const getUser = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.body;

	const result = await authService.getUser(id);

	ApiResponse.success(res, 200, "User get Successfull", result);
});

const sendMail = catchAsync(async (req: Request, res: Response) => {
	const result = await authService.sendMail();

	ApiResponse.success(res, 200, "Mail Sent Successfull", result);
});

export const authController = {
	userLogin,
	userRegister,
	deleteUser,
	updateUser,
	getUser,
	sendMail,
};
