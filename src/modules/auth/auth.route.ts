import { Router } from "express";
import { authController } from "./auth.controller.js";
import { envValidate } from "../../config/env.validate.js";

const router: Router = Router()

router.post("/register", authController.userRegister)
router.post("/login", authController.userLogin)

// router.post("/register",envValidate, authController.userRegister)
// router.post("/login",envValidate, authController.userLogin)

export const authRoutes = router;