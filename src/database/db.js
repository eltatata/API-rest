import mongoose from "mongoose";

(async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("conectado a MongoDB");
    } catch (error) {
        console.log(`Error de conexion a DB: ${error}`);
    }
})();