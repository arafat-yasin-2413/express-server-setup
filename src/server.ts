import dotenv from "dotenv";
import { app } from "./app.js";
import { env } from "./config/env.js";
import http, { type Server } from "http";
dotenv.config();

const port = env.port;

// in production, we use httpServer
let server: Server

const httpServer = http.createServer()
server = httpServer.listen(port, ()=>{
    console.log(`Http Server is Running on port : ${port}`)
})



// express server of node js.
// jodio , behind the scene eta httpServer kei call dicche.
// app.listen(port, () => {
//     console.log(`Server is running on port : ${port}`);
// });

