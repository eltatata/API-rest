import { User } from "../models/User.js";
import { generateRefreshToken, generatorToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    // console.log(req.body);

    try {
        // verificar si el user ya esta registrado
        let user = await User.findOne({ email: req.body.email });

        // validar si ya el user existe
        if (user) throw { code: 11000 };

        // crear el usuario y guardarlo en la DB
        user = new User(req.body);
        await user.save();

        console.log(user);

        console.log("Se creo el user");

        res.status(201).json({ ok: "Registered" });
    } catch (error) {
        console.log(error);

        // alternativa por defecto de moongose
        if (error.code === 11000) return res.status(400).json({ error: "Ya existe el user" });
    }
}

export const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) throw new Error("No existe el usuario");

        if (!user.comparePassword(req.body.password)) throw new Error("Password incorrecta");

        // generar el token JWT de seguridad
        const { token, expiresIn } = generatorToken(user._id);

        // generar un refreshToken que se almacenara en las cookies
        generateRefreshToken(user._id, res);

        res.json({ token, expiresIn });
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}

export const infoUser = async (req, res) => {
    try {
        // buscar al user con el iud del req
        const user = await User.findById(req.uid).lean();

        // mostrar cierta info del user
        console.log({ email: user.email, uid: user._id });

        res.json({ email: user.email, uid: user._id });
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

export const refreshToken = (req, res) => {
    try {
        // generar token JWT
        const { token, expiresIn } = generatorToken(req.uid);

        res.json({ token, expiresIn });
    } catch (error) {
        console.log(error.message);
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: "Closed Session" });
    console.log("Closed Session");
}
