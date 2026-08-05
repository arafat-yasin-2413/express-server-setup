import dotenv from "dotenv";
import { app } from "./app.js";
import { env } from "./config/env.js";
dotenv.config();

const port = env.port;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});