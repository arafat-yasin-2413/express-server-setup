import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString: env.databaseUrl });
const prisma = new PrismaClient({ adapter });

export const connectDatabase = async() => {
    try {
        await prisma.$connect();
        await prisma.$queryRaw`select 1`;
        console.log("Database connected successfully.");
    } catch (error) {
        throw new Error(`Database URL Issue: ${(error as Error).message}, Cause: ${(error as Error).cause}`);
    }
};

export { prisma };
