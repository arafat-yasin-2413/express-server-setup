import z from "zod";

const userRegisterSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
})

export type userRegisterType = z.infer<typeof userRegisterSchema>