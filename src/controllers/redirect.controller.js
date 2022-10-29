import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
    try {
        // obtener el id del link de los params
        const { nanoLink } = req.params;

        // obtener el link
        const link = await Link.findOne({ nanoLink });
        
        // si el link no existe retornar un error
        if (!link) throw new Error("Link does not exist");

        res.redirect(link.longLink);
    } catch (error) {
        res.json({ error: error.message });
    }
}