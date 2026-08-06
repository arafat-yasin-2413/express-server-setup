import dotenv from "dotenv";
import { app } from "./app.js";
import { env } from "./config/env.js";
import http, { type Server } from "http";
dotenv.config();

const port = env.port;

// in production, we use httpServer
let server: Server;

const bootstrap = async () => {
    try {
        const httpServer = http.createServer(app);

        server = httpServer.listen(port, () => {
            console.log(`Http Server is Running on port : ${port}`);
        });

        // gracefully shutdown - Reusable function
        const handleShutdown = (eventName: string, exitCode = 0) => {
            return (error?: unknown) => {
                console.log(`${eventName} received, shutting down...`);

                // stop accepting new connections
                server.close(() => {
                    console.log(`${eventName} gracefully shutdown!`, error || "");
                    process.exit(exitCode);
                });

                // let in-flight requests finish, but close idle keep-alive connections
                server.closeIdleConnections();
                // hard-close everything else
                server.closeAllConnections();

                // force exit if close() still hangs
                setTimeout(() => process.exit(exitCode), 10_000).unref();
            };
        }

        process.on('SIGTERM', handleShutdown('SIGTERM', 0));
        process.on('SIGINT', handleShutdown('SIGINT', 0));
        process.on('uncaughtException', handleShutdown('uncaughtException', 1));
        process.on('unhandledRejection', handleShutdown('unhandledRejection', 1));

    } catch (error) {
        console.error("Server Stopped: ", error);
    }
};

bootstrap();

// express server of node js.
// jodio , behind the scene eta httpServer kei call dicche.
// app.listen(port, () => {
//     console.log(`Server is running on port : ${port}`);
// });



// previous code : 
// import dotenv from "dotenv";
// import { app } from "./app.js";
// import { env } from "./config/env.js";
// import http, { type Server } from "http";
// dotenv.config();

// const port = env.port;

// // in production, we use httpServer
// let server: Server;

// const bootstrap = async () => {
//     try {
//         const httpServer = http.createServer();
//         server = httpServer.listen(port, () => {
//             console.log(`Http Server is Running on port : ${port}`);
//         });

//         // gracefully shutdown - Reusable function
//         const handleShutdown = (eventName:string, exitCode = 0) =>{
//             return (error:any) =>{
//                 server.close(()=>{
//                     console.log(`${eventName} gracefully shutdown! `, error || '');
//                     process.exit(exitCode);
//                 });
//             }
//         }

//         process.on('SIGTERM', handleShutdown('SIGTERM', 0));
//         process.on('SIGINT', handleShutdown('SIGINT', 0));
//         process.on('uncaughtException', handleShutdown('uncaughtException', 1));
//         process.on('unhandledRejection', handleShutdown('unhandledRejection', 1));

//     } catch (error) {
//         console.error("Server Stopped: ", error);
//     }
// };

// bootstrap();

// express server of node js.
// jodio , behind the scene eta httpServer kei call dicche.
// app.listen(port, () => {
//     console.log(`Server is running on port : ${port}`);
// });
