import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type { userLoginType, userRegisterType } from "./auth.validation.js";
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



const userLogin = async(data: userLoginType) => {
    
    const existedUser = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (!existedUser) throw new AppError(httpStatus.NOT_FOUND,"user not found!");
    const isPasswordValid = await bcrypt.compare(data.password, existedUser.password);


    if (existedUser.email !== data.email || !isPasswordValid)
        throw new AppError(httpStatus.UNAUTHORIZED,"Invalid email or password");

    return existedUser
};


export const authService = {
    userLogin,
    userRegister,

}