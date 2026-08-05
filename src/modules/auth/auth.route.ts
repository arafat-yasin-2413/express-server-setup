import { Router } from "express";
import { authController } from "./auth.controller.js";
import { envValidate } from "../../config/env.validate.js";

const router: Router = Router()

router.post("/login",envValidate, authController.userLogin)

export const authRoutes = router;