import jwt from "jsonwebtoken";

// funcion para generar el token
export const generatorToken = (uid) => {
    const expiresIn = 60 * 15;

    try {
        const token = jwt.sign({ uid }, process.env.SECRET, { expiresIn });

        return { token, expiresIn };
    } catch (error) {
        console.log(error.message);
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({ uid }, process.env.REFRESH, { expiresIn });

        // crear una cookie y hacer que no sea accedida desde js
        return res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });
    } catch (error) {
        console.log(error.message);
    }
}