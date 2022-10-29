import { Link } from "../models/Link.js";
import { nanoid } from "nanoid";

// funcion para obtener todos los links del user logued
export const getLinks = async (req, res) => {
    try {
        // buscar los links de user que esta logueado
        const links = await Link.find({ uid: req.uid }).lean();

        res.json({ links });
    } catch (error) {
        res.json({ error: error.message });
    }
}

// EN CASO DE UN C.R.U.D TRADICIONAL
// // funcion para obtener un link es especifico
// export const getLink = async (req, res) => {
//     try {
//         // obtener el id del link de los params
//         const { id } = req.params;

//         // obtener el link
//         const link = await Link.findById(id).lean();

//         // si el link no existe retornar un error
//         if (!link) throw new Error("Link does not exist");

//         // saber si es propietario del link
//         if (!link.uid.equals(req.uid)) throw new Error("You are not owner");

//         res.json(link);
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// }


export const getLink = async (req, res) => {
    try {
        // obtener el id del link de los params
        const { nanoLink } = req.params;

        // obtener el link
        const link = await Link.findOne({ nanoLink });

        // si el link no existe retornar un error
        if (!link) throw new Error("Link does not exist");

        res.json({ longLink: link.longLink });
    } catch (error) {
        res.json({ error: error.message });
    }
}

// funcion para crear links
export const cratesLinks = async (req, res) => {
    try {
        let { longLink } = req.body;

        // si el link no tiene https:// agregarselo
        if (!longLink.startsWith("https://")) longLink = "https://" + longLink;

        const link = new Link({
            longLink,
            nanoLink: nanoid(6),
            uid: req.uid
        });

        await link.save();

        res.json(link);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const removeLink = async (req, res) => {
    try {
        // obtener el id del link de los params
        const { id } = req.params;

        // obtener el link
        const link = await Link.findById(id);

        // si el link no existe retornar un error
        if (!link) throw new Error("Link does not exist");

        // saber si es propietario del link
        if (!link.uid.equals(req.uid)) throw new Error("You are not owner");

        await link.remove();

        res.json(link);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const updateLink = async (req, res) => {
    try {
        // obtener el id del link de los params
        const { id } = req.params;

        // obetener el longlink modificado
        const { longLink } = req.body;

        // si el link no tiene https:// agregarselo
        if (!longLink.startsWith("https://")) longLink = "https://" + longLink;

        // obtener el link
        const link = await Link.findById(id);

        // si el link no existe retornar un error
        if (!link) throw new Error("Link does not exist");

        // saber si es propietario del link
        if (!link.uid.equals(req.uid)) throw new Error("You are not owner");

        // actualizar el link
        link.longLink = longLink;
        await link.save();

        res.json(link);
    } catch (error) {
        res.json({ error: error.message });
    }
}