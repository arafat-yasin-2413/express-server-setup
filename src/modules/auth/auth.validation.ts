import z from "zod";

const userRegisterSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
})

const userLoginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type userRegisterType = z.infer<typeof userRegisterSchema>
export type userLoginType = z.infer<typeof userLoginSchema>