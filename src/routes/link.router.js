import express from "express";
import { cratesLinks, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";
const router = express.Router();

// ruta para obtener los links
router.get("/", requireToken, getLinks);

// ruta para obtener un solo link
router.get("/:nanoLink", getLink);

// ruta para crear un link
router.post("/", requireToken, bodyLinkValidator, cratesLinks);

// ruta para eliminar un link
router.delete("/:id", requireToken, paramsLinkValidator, removeLink);

// ruta para actualizar un link
router.patch("/:id", requireToken, paramsLinkValidator, bodyLinkValidator, updateLink);

export default router;