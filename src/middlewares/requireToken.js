import jwt from "jsonwebtoken";

// funcion o middleware para saber si el token de usuario logue es valido
export const requireToken = (req, res, next) => {
    try {
        // obtener la authorization de los headers
        let token = req.headers?.authorization;

        // si el token no existe para el proceso
        if (!token) throw new Error("No existe el token en el header usa Bearer");

        // quitar el formato Bearer
        token = token.split(" ")[1];

        // verrificar el token
        const payload = jwt.verify(token, process.env.SECRET);

        // mandar al req el id de user
        req.uid = payload.uid;

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: error.message });
    }
}