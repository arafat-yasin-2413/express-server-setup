import dotenv from "dotenv";
import { app } from "./app.js";
import { env } from "./config/env.js";
import http, { type Server } from "http";
import { prisma } from "./lib/prisma.js";
dotenv.config();

const port = env.port;

// in production, we use httpServer
let server: Server;

const bootstrap = async () => {
    try {

        await prisma.$connect();
        await prisma.$queryRaw`select 1`
        console.log("Database connected successfully.");
        
        const httpServer = http.createServer(app);

        server = httpServer.listen(port, () => {
            console.log(`Http Server is Running on port : ${port}`);
        });
        
        const handleShutdown = (eventName: string, exitCode = 0) => {
            let isShuttingDown = false;
            
            return (error?: unknown) => {
                if (isShuttingDown) return;
                isShuttingDown = true;
                
                console.log(`\n${eventName} received, shutting down...`);
                if (error) console.error("Error causing shutdown:", error);
                
                const timer = setTimeout(() => {
                    console.error("Forced shutdown due to timeout.");
                    process.exit(exitCode);
                }, 10_000);
                timer.unref();
                
                server.close((err) => {
                    if (err) {
                        console.error("Error during server close:", err);
                        process.exit(1);
                    }
                    console.log(
                        `${eventName}: Server gracefully shut down successfully!`,
                    );
                    process.exit(exitCode);
                });
                
                if (typeof server.closeIdleConnections === "function") {
                    server.closeIdleConnections();
                }
            };
        };
        
        process.on("SIGTERM", handleShutdown("SIGTERM", 0));
        process.on("SIGINT", handleShutdown("SIGINT", 0));
        process.on("uncaughtException", handleShutdown("uncaughtException", 1));
        process.on(
            "unhandledRejection",
            handleShutdown("unhandledRejection", 1),
        );
    } catch (error) {
        console.error("Server Stopped: ", error);
    }
};

bootstrap();
