// import type { Application, Request, Response } from "express";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { success } from "zod";

// const app: Application = express();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// dotenv.config();

// app.get("/", (request: Request, res: Response) => {
//     console.log("App is running");

//     res.send({
//         success: true,
//         message: "app is successfully running",
//     });
// });

// app.post("/login", async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     const user = {
//         email: "newuser@gmail.com",
//         password: 123456,
//     };

//     if (!user) throw new Error("user not found!");

//     if (user.email !== email || user.password !== password)
//         throw new Error("Invalid email or password");

//     res.send({
//         success: true, 
//         message: "login successfull",
//         data:user
//     })
// });

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//     console.log(`Server is running on port : ${port}`);
// });
