const userLogin = async (email: string, password: string) => {
    const user = {
        email: "newuser@gmail.com",
        password: "123456",
    };

    if (!user) throw new Error("user not found!");

    if (user.email !== email || user.password !== password)
        throw new Error("Invalid email or password");

    return user
};


export const authService = {
    userLogin,

}