import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";
import type {
    userLoginType,
    userRegisterType,
    userUpdateType,
} from "./auth.validation.js";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import { env } from "../../config/env.js";
import { sendEmail } from "../../services/email.service.js";
import { demoTemplate } from "../../template/demoTemplate.js";

const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");

    const { password: _password, ...safeUser } = user;
    return safeUser;
};

const userRegister = async (data: userRegisterType) => {
    // is the user exists in the database?
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser)
        throw new AppError(httpStatus.CONFLICT, "User already registered!");

    const hashedPassword = await bcrypt.hash(
        data.password,
        Number(env.saltRound),
    );

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
        },
    });

    return user;
};

const userLogin = async (data: userLoginType) => {
    const existedUser = await prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });

    if (!existedUser)
        throw new AppError(httpStatus.NOT_FOUND, "user not found!");
    const isPasswordValid = await bcrypt.compare(
        data.password,
        existedUser.password,
    );

    if (existedUser.email !== data.email || !isPasswordValid)
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "Invalid email or password",
        );

    const { password: _password, ...safeUser } = existedUser;
    // return {_password, safeUser}
    return safeUser;
};

const updateUser = async (id: string, data: userUpdateType) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User Not Found!");
    const hashedPassword = await bcrypt.hash(
        data.password,
        Number(env.saltRound),
    );

    // upsert = UPDATE & INSERT
    const updatedUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: data.name,
            password: hashedPassword,
        },
    });

    return updatedUser;
};

const deleteUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found!");

    const deletedUser = await prisma.user.delete({
        where: {
            id: id,
        },
    });

    const { password: _password, ...safeDeletedUser } = deletedUser;
    return safeDeletedUser;
};

// hard delete o korte hoy

const sendMail = async()=>{

    const name = 'Yasin'
    const email = 'yasinarafat1396@gmail.com'

    return sendEmail({
        to: 'yasinarafatsheikh@gmail.com',
        subject: 'nothing',
        html: demoTemplate(name, email),
    })
}


export const authService = {
    userLogin,
    userRegister,
    deleteUser,
    updateUser,
    getUser,
    sendMail,

};
