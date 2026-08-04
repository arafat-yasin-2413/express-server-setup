import { Router } from "express";
import { authController } from "./auth.controller.js";

const router: Router = Router()

router.post("/login", authController.userLogin)

export const authRoutes = router;