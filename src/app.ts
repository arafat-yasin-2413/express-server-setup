import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/routes.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import notFound from "./middleware/notFound.js";

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",router);


app.get("/", (request: Request, res: Response) => {
    console.log("App is running");

    res.send({
        success: true,
        message: "app is successfully running",
    });
});

app.use(notFound); 
app.use(globalErrorHandler);