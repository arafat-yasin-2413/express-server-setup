import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route.js";

const router:Router = Router();

const moduleRouter = [
    {
        path: '/auth',
        router: authRoutes
    },
    // {
    //     path: 'product',
    //     router: productRoutes
    // }
]




moduleRouter.forEach(module=>{
    router.use(module.path, module.router)
})

export default router;