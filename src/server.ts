import dotenv from "dotenv";
import { app } from "./app.js";
import 'dotenv/config';
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
