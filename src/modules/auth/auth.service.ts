import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { userRegisterType } from "./auth.validation.js";
import httpStatus from 'http-status-codes'
import bcrypt from 'bcrypt'
import { env } from "../../config/env.js";

const userRegister = async (data: userRegisterType) =>{
    // is the user exists in the database?
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(existingUser) throw new AppError(httpStatus.CONFLICT, 'User already registered!')
    
    const hashedPassword = await bcrypt.hash(data.password, Number(env.saltRound));   

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })    

    return user

}



const userLogin = async (email: string, password: string) => {
    const user = {
        email: "newuser@gmail.com",
        password: "123456",
    };

    if (!user) throw new AppError(404,"user not found!");

    if (user.email !== email || user.password !== password)
        throw new AppError(403,"Invalid email or password");

    return user
};


export const authService = {
    userLogin,
    userRegister,

}