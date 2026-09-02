import z from "zod";

const envSchema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    SALT_ROUND: z.string(),
    SMTP_USER: z.email(), 
    SMTP_PASS: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.string(),
    SMTP_FROM: z.email(),
});

export const envValidate = () => {
    const parsedEnv = envSchema.safeParse(process.env);

    if (!parsedEnv.success) {
        console.error("env variable issue : ",parsedEnv.error?.flatten().fieldErrors,);
        process.exit(1);
    }

    return parsedEnv.data;
};
