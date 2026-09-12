import { AppError } from "../../utils/AppError.js";

const userLogin = async (email: string, password: string) => {
    const user = {
        email: "newuser@gmail.com",
        password: "123456",
    };

    if (!user) throw new AppError(404, "user not found!");

    if (user.email !== email || user.password !== password)
        throw new AppError(403, "Invalid email or password");

    return user
};


export const authService = {
    userLogin,

}
