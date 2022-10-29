import "dotenv/config";
import "./database/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressMongoSanitize from "express-mongo-sanitize";
import routerAuth from "./routes/auth.router.js";
import routerLink from "./routes/link.router.js";
import routerRedirect from "./routes/redirect.router.js";

const app = express();

// implementar CORS
// lista de dominios con autorizacion para hacer peticiones
const whiteList = [process.env.ORIGIN1];

const corsOptions = {
    // Configuración de CORS con origen dinámico
    origin: function (origin, callback) {
        console.log(origin);

        if (!origin || whiteList.includes(origin)) return callback(null, true);

        return callback(`Error de CORS origin: ${origin}, no autorizado`);
    }

    // origin: whiteList
}

// configuraciones para impedir el acceso a los controladores
app.use(cors(corsOptions));

// configurar el puerto
const PORT = process.env.PORT || 5000;

// poder el leer el body formato json()
app.use(express.json());
// para poder utilizar las cookies
app.use(cookieParser());

app.use(expressMongoSanitize());

app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/links", routerLink);
// ejemplo back redirect
app.use("/", routerRedirect);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})