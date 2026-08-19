import z from "zod";

const envSchema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    SALT_ROUND: z.string(),
});

export const envValidate = () => {
    const parsedEnv = envSchema.safeParse(process.env);

    if (!parsedEnv.success) {
        console.error("env variable issue : ",parsedEnv.error?.flatten().fieldErrors,);
        process.exit(1);
    }

    return parsedEnv.data;
};
