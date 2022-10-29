import axios from "axios";
import { validationResult, body, param } from "express-validator";

// funcion o middleware que retorna los mensajes de error de los campos
export const middlewareValidationResult = (req, res, next) => {
    // capturar los errores del req.body
    const errors = validationResult(req);

    // si errors no esta vacio: el usuario cometio un error
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
}

export const paramsLinkValidator = [
    // el que verifica que no halla ningun script es .escape()
    param("id", "Wrong id format (express-validator)").trim().notEmpty().escape(),
    middlewareValidationResult
]

// validaciones en los campos para crear el link 
export const bodyLinkValidator = [
    body("longLink", "Invalid link format").trim().notEmpty().custom(async value => {
        try {
            // si el link no tiene https:// agregarselo
            if (!value.startsWith("https://")) value = "https://" + value;

            // validar la URL con axios
            await axios(value);

            return value;
        } catch (error) {
            throw new Error("Not found link 404");
        }
    }),
    middlewareValidationResult
]

// validaciones en los campos para registrarse
export const bodyRegisterValidator = [
    body("email", "Email invalid").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({ min: 6 }),
    body("password", "Password invalid").custom((value, { req }) => {
        if (value != req.body.repassword) throw new Error("Passwords do not match");

        return value;
    }),
    middlewareValidationResult
];

// validaciones en los campos para iniciar sesion
export const bodyLoginValidator = [
    body("email", "Email invalid").trim().isEmail().normalizeEmail(),
    body("password", "Password invalid").trim().isLength({ min: 6 }),
    middlewareValidationResult
];